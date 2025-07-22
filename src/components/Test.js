import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Test.css'; // Ensure this CSS file is created for your styles

// Import images
import DepressionImage from '../Images/Depression.jpg';
import StressImage from '../Images/Stress.jpg';
import PTSDImage from '../Images/PTSD.jpg';
import AnxietyImage from '../Images/Anxiety.jpg';

function Test() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const cards = [
    { title: 'Depression Test', image: DepressionImage, route: '/depression' },
    { title: 'Stress Test', image: StressImage, route: '/stress' },
    { title: 'PTSD Test', image: PTSDImage, route: '/ptsd' },
    { title: 'Anxiety Test', image: AnxietyImage, route: '/anxiety' },
  ];

  return (
    <div className="test-container">
      <div className="test-content">
        <h2>Do I Have!</h2>
        <div className="card-container">
          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(card.route)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(card.route);
                }
              }}
            >
              <img src={card.image} alt={card.title} className="card-image" />
              <h3>{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Test;