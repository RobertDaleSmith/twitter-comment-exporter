# Twitter Comment Exporter

Twitter Comment Exporter is a simple Node.js tool that fetches all comments (replies) for a specific tweet and exports them to a CSV file. The exported CSV file contains rows sorted from oldest to newest, with each row having a unique number starting from 1.

## Features

- Fetch all comments from a specific tweet
- Export comments to a CSV file
- Sort comments by date (oldest to newest)
- Add a unique row number for each comment

## Installation

1. Clone this repository:

```
git clone https://github.com/yourusername/twitter-comment-exporter.git
cd twitter-comment-exporter
```

2. Install the required dependencies:

```
npm install
```

3. Set up your Twitter API credentials as environment variables or directly in the `fetch_comments.js` file:

```
TWITTER_CONSUMER_KEY=<your_consumer_key>
TWITTER_CONSUMER_SECRET=<your_consumer_secret>
TWITTER_ACCESS_TOKEN=<your_access_token>
TWITTER_ACCESS_TOKEN_SECRET=<your_access_token_secret>
```

4. Replace `YOUR_TWEET_ID` in the `fetch_comments.js` file with the ID of the tweet you want to fetch comments from.

## Usage

Run the script to fetch comments and export them to a `comments.csv` file:

```
node fetch_comments.js
```

The `comments.csv` file will be created in the project directory with the fetched comments.

## Dependencies

- [Twit](https://www.npmjs.com/package/twit): Twitter API Client for Node.js
- [PapaParse](https://www.npmjs.com/package/papaparse): Fast and powerful CSV parser for JavaScript
