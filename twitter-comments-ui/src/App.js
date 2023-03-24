import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollingDial from './ScrollingDial';
import './App.css';

function App() {
  const [tweetId, setTweetId] = useState('');
  const [comments, setComments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [winner, setWinner] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/${tweetId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const spin = () => {
    if (!spinning && comments.length > 0) {
      setSpinning(true);

      const randomRow = Math.floor(Math.random() * comments.length);
      setSelectedRow(randomRow + 1);
      setWinner(comments[randomRow]);
      setSpinning(false);
    }
  };

  useEffect(() => {
    if (tweetId) {
      fetchComments();
    }
  }, [tweetId]);

  const segments = comments.map((comment) => ({
    text: comment.row,
    color: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
  }));

  return (
    <div className="App">
      <h1>Twitter Comments</h1>
      <input
        type="text"
        value={tweetId}
        onChange={(e) => setTweetId(e.target.value)}
        placeholder="Enter tweet ID"
      />
      <button onClick={fetchComments}>Fetch Comments</button>
      <div className="wheel">
        <ScrollingDial
          segments={comments.map((comment, index) => ({ text: index + 1 }))}
          selectedSegment={selectedRow - 1}
          spinning={spinning}
        />
      </div>
      <button onClick={spin} disabled={spinning}>
        Spin
      </button>
      {winner && (
        <div className="winner">
          <h2>Winning Number: {winner.row}</h2>
          <p>
            <strong>User:</strong> {winner.user}
          </p>
          <p>
            <strong>Text:</strong> {winner.text}
          </p>
          <p>
            <strong>Created At:</strong> {winner.created_at}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
