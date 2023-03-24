# Twitter Comment Exporter

This tool exports comments from a specified tweet and displays them in a table on a frontend React app. It also includes a scrolling dial to randomly select a comment. The selected comment is then highlighted in the table.

## Features

- Fetches comments for a given tweet ID
- Exports comments into a JSON format
- Displays comments in a table in a React frontend
- Scrolling dial to randomly select a comment
- Highlights the selected comment in the table

## Backend Setup

1. Navigate to the `twitter-comment-exporter` folder
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root folder with the following content:

```
TWITTER_CONSUMER_KEY=<your_consumer_key>
TWITTER_CONSUMER_SECRET=<your_consumer_secret>
TWITTER_ACCESS_TOKEN=<your_access_token>
TWITTER_ACCESS_TOKEN_SECRET=<your_access_token_secret>
```

Replace the placeholder values with your actual Twitter API keys and tokens.

4. Run `node server.js` to start the Express server. The server will listen on port 3001 by default.

## Frontend Setup

1. Navigate to the `twitter-comment-exporter/twitter-comments-ui` folder
2. Run `npm install` to install dependencies
3. Run `npm start` to start the React app
4. Open your browser and go to `http://localhost:3000` to view the frontend
5. Enter a tweet ID and click "SPIN" to fetch comments and select a random comment

## License

MIT License

