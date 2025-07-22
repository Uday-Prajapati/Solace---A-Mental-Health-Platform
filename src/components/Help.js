import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Help.css'; // Ensure this CSS file is created for your styles

// Importing images
import BooksImage from '../Images/Books.jpg';  // Adjust path based on your directory structure
import VideoImage from '../Images/Video.jpg';    // Adjust path based on your directory structure
import MusicImage from '../Images/Music.jpg';    // Adjust path based on your directory structure

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="help-container">
      <div className="card" onClick={() => navigate('/books')}>
        <img src={BooksImage} alt="Books" />
        <p>EXPLORE BOOKS THAT CAN HELP YOU.</p>
      </div>
      <div className="card" onClick={() => navigate('/video')}>
        <img src={VideoImage} alt="Video" />
        <p>WATCH VIDEOS THAT CAN HELP YOU UNDERSTAND.</p>
      </div>
      <div className="card" onClick={() => navigate('/music')}>
        <img src={MusicImage} alt="Music" />
        <p>LISTEN TO MUSIC THAT CAN CALM YOU.</p>
      </div>
    </div>
  );
};

export default Help;
