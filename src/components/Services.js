import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceBG from '../Images/ServiceBG.avif';
import '../styles/Services.css'; // Ensure this CSS file is created for your styles

// Importing images
import TestImage from '../Images/Test.jpg';  // Adjust path based on your directory structure
import HelpImage from '../Images/Help.jpg';  // Adjust path based on your directory structure
import ShareImage from '../Images/Share.jpg'; // Adjust path based on your directory structure

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="services-container">
      <div className="card" onClick={() => navigate('/test')}>
        <img src={TestImage} alt="Test" />
        <p className="card-text">TEST YOUR DISORDER LEVEL AND HELP YOURSELF TO RELIEVE IT.</p>
      </div>
      <div className="card" onClick={() => navigate('/help')}>
        <img src={HelpImage} alt="Help" />
        <p className="card-text">THINGS THAT CAN HELP YOU WITH YOUR DISORDER.</p>
      </div>
      <div className="card" onClick={() => navigate('/share')}>
        <img src={ShareImage} alt="Share" />
        <p className="card-text">SHARE YOUR PROBLEM HERE WITH OTHERS.</p>
      </div>
    </div>
  );
};

export default Services;