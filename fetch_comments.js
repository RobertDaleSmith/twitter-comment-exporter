const Twit = require('twit');
const fs = require('fs');
const Papa = require('papaparse');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweetId = 'YOUR_TWEET_ID';

const getComments = async (tweetId, maxId = null) => {
  try {
    // Fetch the original tweet to get the username
    const tweetResponse = await T.get('statuses/show', { id: tweetId, tweet_mode: 'extended' });
    const username = tweetResponse.data.user.screen_name;

    const params = {
      q: `to:${username}`,
      result_type: 'recent',
      count: 100,
      tweet_mode: 'extended',
      max_id: maxId,
    };

    const response = await T.get('search/tweets', params);
    // Filter replies to the specific tweet
    const replies = response.data.statuses.filter((tweet) => tweet.in_reply_to_status_id_str === tweetId);
    return replies;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const getAllComments = async (tweetId) => {
  let allComments = [];
  let maxId = null;
  let lastCommentId = null;
  let shouldContinue = true;

  while (shouldContinue) {
    const comments = await getComments(tweetId, maxId);

    if (comments.length === 0 || (comments.length === 1 && comments[0].id_str === lastCommentId)) {
      shouldContinue = false;
    } else {
      lastCommentId = comments[comments.length - 1].id_str;
      maxId = lastCommentId;
      allComments = allComments.concat(comments);
    }
  }

  return allComments;
};

const writeCsvFile = (comments) => {
  // Sort comments by creation date from oldest to newest
  const sortedComments = comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // Map sorted comments to CSV data format, add a unique row number, and format the username as a URL
  const csvData = sortedComments.map((comment, index) => ({
    row: index + 1,
    id: comment.id_str,
    user: `https://twitter.com/${comment.user.screen_name}`,
    text: comment.full_text.replace(/[\n\r]+/g, ' '),
    created_at: comment.created_at,
  }));

  const csv = Papa.unparse(csvData);
  fs.writeFile('comments.csv', csv, (err) => {
    if (err) {
      console.error('Error writing CSV file:', err);
    } else {
      console.log('CSV file written.');
    }
  });
};

(async () => {
  const comments = await getAllComments(tweetId);
  writeCsvFile(comments);
})();
