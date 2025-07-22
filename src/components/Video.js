import React, { useState, useEffect, useRef } from 'react';
import { Tilt } from 'react-tilt';
import YouTube from 'react-youtube';
import '../styles/Video.css';
import BIRDS from 'vanta/dist/vanta.birds.min';
import * as THREE from 'three';

// Import images
import Video1 from '../Images/Video1.jpg';
import Video2 from '../Images/Video2.jpg';
import Video3 from '../Images/Video3.jpg';
import Video4 from '../Images/Video4.jpg';
import Video5 from '../Images/Video5.jpg';
import Video6 from '../Images/Video6.jpg';
import Video7 from '../Images/Video7.png';
import Video8 from '../Images/Video8.png';

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const videos = [
  {
    id: 1,
    image: Video1,
    link: 'https://youtu.be/O9qRyFOLdQk?si=tBOnHUnrtZ2C0n-N',
    title: 'Amazing Nature Documentary'
  },
  {
    id: 2,
    image: Video2,
    link: 'https://youtu.be/ga-MniJxQz8?si=tNeWLgX2OTaDucHH',
    title: 'City Life Timelapse'
  },
  {
    id: 3,
    image: Video3,
    link: 'https://youtu.be/tBGvOmUhhq4?si=JVjFyuaXuQUmmO6p',
    title: 'Space Exploration'
  },
  {
    id: 4,
    image: Video4,
    link: 'https://www.youtube.com/watch?v=d1sVO6x9p5U',
    title: 'Underwater Wonders'
  },
  {
    id: 5,
    image: Video5,
    link: 'https://www.youtube.com/watch?v=VlDgowUAyx4',
    title: 'Mountain Adventures'
  },
  {
    id: 6,
    image: Video6,
    link: 'https://www.youtube.com/watch?v=pkTGPnr8VO4',
    title: 'Wildlife Safari'
  },
  {
    id: 7,
    image: Video7,
    link: 'https://youtu.be/yzm4gpAKrBk?feature=shared',
    title: 'Ted Talks'
  },
  {
    id: 8,
    image: Video8,
    link: 'https://youtu.be/vV2-GeW8ZFE?feature=shared',
    title: 'Ted Talks'
  }
];

const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [videoRatings, setVideoRatings] = useState({});
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [videoToRate, setVideoToRate] = useState(null);
  const playerRef = useRef(null);
  const vantaRef = useRef(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('videoProgress')) || {};
    const savedRatings = JSON.parse(localStorage.getItem('videoRatings')) || {};
    setVideoProgress(savedProgress);
    setVideoRatings(savedRatings);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('videoProgress', JSON.stringify(videoProgress));
    localStorage.setItem('videoRatings', JSON.stringify(videoRatings));
  }, [videoProgress, videoRatings]);

  useEffect(() => {
    if (!vantaRef.current) return;

    const effect = BIRDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0x0a0a1a,
      color1: 0x6a11cb,
      color2: 0x11998e,
      birdSize: 0.80,
      wingSpan: 15.00,
      speedLimit: 4.00,
      separation: 40.00,
      alignment: 40.00,
      cohesion: 40.00,
      quantity: 2.00
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0
    }
  };

  const handleStateChange = (event, videoId) => {
    const player = event.target;
    let interval;
    
    if (event.data === YouTube.PlayerState.PLAYING) {
      interval = setInterval(() => {
        const progress = (player.getCurrentTime() / player.getDuration()) * 100;
        setVideoProgress(prev => ({
          ...prev,
          [videoId]: Math.min(progress, 100)
        }));
      }, 1000);
    }

    if (event.data === YouTube.PlayerState.PAUSED || 
        event.data === YouTube.PlayerState.ENDED) {
      clearInterval(interval);
    }

    if (event.data === YouTube.PlayerState.ENDED) {
      setVideoProgress(prev => ({ ...prev, [videoId]: 100 }));
      if (!videoRatings[videoId]) {
        setVideoToRate(videoId);
        setShowRatingDialog(true);
      }
    }
  };

  const handleRateVideo = () => {
    if (currentRating > 0) {
      setVideoRatings(prev => ({ ...prev, [videoToRate]: currentRating }));
      setShowRatingDialog(false);
      setCurrentRating(0);
      setVideoToRate(null);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(getYoutubeId(video.link));
  };

  return (
    <div className="video-container" ref={vantaRef}>
      <div className="video-gallery">
        <div className="content-ribbon">
          <h2 className="gallery-title">Videos That Help's You Heal</h2>
          <div className="video-grid">
            {videos.map((video) => {
              const videoId = getYoutubeId(video.link);
              const progress = videoProgress[videoId] || 0;
              const rating = videoRatings[videoId] || 0;
              
              return (
                <Tilt 
                  key={video.id}
                  className="Tilt"
                  options={{ 
                    max: 15, 
                    scale: 1.05,
                    glare: true,
                    "max-glare": 0.2,
                    perspective: 1000
                  }}
                  onMouseEnter={() => setHoveredCard(video.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    className={`video-item ${hoveredCard === video.id ? 'hovered' : ''}`}
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="video-thumbnail">
                      <img 
                        src={video.image} 
                        alt={video.title}
                        className="thumbnail-image"
                      />
                      
                      <div className="video-overlay">
                        <div className="play-icon">
                          <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" fill="white"/>
                          </svg>
                        </div>

                        <div className="video-details">
                          <h4 className="video-title">{video.title}</h4>
                          
                          {rating > 0 && (
                            <div className="rating-container">
                              <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span 
                                    key={star}
                                    className={`star ${star <= Math.round(rating) ? 'filled' : ''}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="rating-text">{rating.toFixed(1)}/5</span>
                            </div>
                          )}

                          <div className="progress-container">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="progress-text">{Math.round(progress)}% watched</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              );
            })}
          </div>
        </div>

        {selectedVideo && (
          <div className="video-modal">
            <div className="modal-backdrop" onClick={() => setSelectedVideo(null)} />
            <div className="modal-content">
              <button 
                className="close-button" 
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video"
              >
                ×
              </button>
              <YouTube
                videoId={selectedVideo}
                opts={opts}
                onStateChange={(e) => handleStateChange(e, selectedVideo)}
                ref={playerRef}
              />
            </div>
          </div>
        )}

        {showRatingDialog && (
          <div className="rating-dialog-overlay">
            <div className="rating-dialog">
              <h3>How would you rate this video?</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= currentRating ? 'filled' : ''}`}
                    onClick={() => setCurrentRating(star)}
                    onMouseEnter={() => setCurrentRating(star)}
                    aria-label={`Rate ${star} star`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="dialog-buttons">
                <button 
                  className="submit-rating"
                  onClick={handleRateVideo}
                  disabled={currentRating === 0}
                >
                  Submit Rating
                </button>
                <button 
                  className="skip-rating"
                  onClick={() => setShowRatingDialog(false)}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;