import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../styles/Music.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, faPause, faVolumeHigh, faVolumeXmark,
  faBackwardStep, faForwardStep, faHeart, 
  faShuffle, faRepeat, faMagnifyingGlass,
  faFire, faXmark, faHouse,
  faHeadphones,
  faMusic, faList, faGear
} from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';
import axios from 'axios';
import { IconButton, Slider, Typography, CircularProgress } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp, Settings } from '@mui/icons-material';

// Jamendo API configuration
const JAMENDO_CLIENT_ID = '89de29f8';

const Music = () => {
  // Player state
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTrack, setActiveTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [visualizerData, setVisualizerData] = useState(new Array(32).fill(0));
  const [musicTracks, setMusicTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [currentVisual, setCurrentVisual] = useState('waves');
  const [activeTab, setActiveTab] = useState('discover');
  const [showSettings, setShowSettings] = useState(false);
  const [audioQuality, setAudioQuality] = useState('high');
  
  // Visual effects refs
  const vantaRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Create a ref to store the playTrack function
  const playTrackRef = useRef(null);

  // Add animationFrameId ref
  const animationFrameId = useRef(null);

  // Update fetchJamendoTracks function with better error handling
  const fetchJamendoTracks = useCallback(async (query = '', genre = 'all') => {
    setIsLoading(true);
    try {
      let url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=jsonpretty&limit=50&include=musicinfo&audioformat=mp32`;
      
      if (query) url += `&search=${encodeURIComponent(query)}`;
      if (genre !== 'all') url += `&tags=${genre}`;
      
      console.log('Fetching tracks from:', url);
      const response = await axios.get(url);
      
      if (!response.data || !response.data.results) {
        throw new Error('Invalid API response');
      }

      const tracks = response.data.results.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        image: track.image || 'https://source.unsplash.com/random/300x300/?music,album',
        audio: `https://api.jamendo.com/v3.0/tracks/file/?client_id=${JAMENDO_CLIENT_ID}&id=${track.id}&audioformat=mp32`,
        duration: formatDuration(track.duration),
        color: getRandomColor(),
        genre: track.tags?.split(' ')[0] || 'Various',
        bpm: Math.floor(Math.random() * 60) + 80
      }));
      
      console.log('Tracks loaded:', tracks.length);
      setMusicTracks(tracks);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Jamendo tracks:', error.response || error);
      setIsLoading(false);
      setMusicTracks([]);
      alert('Error loading tracks. Please check your internet connection and try again.');
    }
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getRandomColor = () => {
    const colors = [
      '#6a11cb', '#11998e', '#f12711', 
      '#8E2DE2', '#1D976C', '#FF416C',
      '#1FA2FF', '#F56217', '#12D8FA',
      '#A6FFCB', '#FF512F', '#DD2476'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Initialize with popular tracks
  useEffect(() => {
    fetchJamendoTracks();
  }, [fetchJamendoTracks]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJamendoTracks(searchQuery, selectedGenre);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Initialize audio context
  const initializeAudioContext = async () => {
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing audio context:', error);
      return false;
    }
  };

  // Add updateVisualizer function
  const updateVisualizer = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    setVisualizerData(Array.from(dataArray));
    
    // Request next frame
    animationFrameId.current = requestAnimationFrame(updateVisualizer);
  };

  // Update playTrack function with better error handling and loading state
  const playTrack = useCallback(async (track) => {
    try {
      if (!track || !track.audio) {
        throw new Error('Invalid track data');
      }

      // Check internet connection first
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      console.log('Attempting to play track:', track.title, 'from URL:', track.audio);

      // Create new audio element for each track
      audioRef.current = new Audio();
      
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Audio loading timed out'));
        }, 20000);

        audioRef.current.oncanplaythrough = () => {
          clearTimeout(timeoutId);
          console.log('Audio loaded successfully');
          resolve();
        };

        audioRef.current.onerror = (e) => {
          clearTimeout(timeoutId);
          const errorDetails = {
            error: e.target.error,
            currentSrc: audioRef.current.currentSrc,
            readyState: audioRef.current.readyState,
            networkState: audioRef.current.networkState
          };
          console.error('Audio error details:', errorDetails);
          reject(new Error(`Audio loading failed: ${e.target.error?.message || 'Unknown error'}`));
        };

        // Set audio properties
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.preload = "auto";
        
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const audioUrl = `${track.audio}&t=${timestamp}`;
        audioRef.current.src = audioUrl;

        // Set up event listeners for playback
        audioRef.current.onended = () => {
          setIsPlaying(false);
          if (isRepeatOn) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
          } else if (isShuffleOn) {
            playNextTrack();
          }
        };

        // Set initial properties
        audioRef.current.volume = volume;
        audioRef.current.muted = isMuted;

        // Start loading
        audioRef.current.load();
      })
      .then(async () => {
        // Start playback
        await audioRef.current.play();
        setIsPlaying(true);
        setActiveTrack(track);
        setIsFavorite(Math.random() > 0.7);
      })
      .catch(error => {
        console.error('Error playing track:', error);
        alert(`Error playing track: ${error.message}`);
        setIsPlaying(false);
      });
    } catch (error) {
      console.error('Error in playTrack:', error);
      alert(`Error playing track: ${error.message}`);
      setIsPlaying(false);
    }
  }, [isRepeatOn, isShuffleOn, volume, isMuted]);

  // Store the playTrack function in ref
  useEffect(() => {
    playTrackRef.current = playTrack;
  }, [playTrack]);

  const togglePlayPause = useCallback(() => {
    if (!activeTrack) {
      if (musicTracks.length > 0) {
        playTrackRef.current(musicTracks[0]);
      }
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Error resuming playback:', error));
    }
  }, [isPlaying, activeTrack, musicTracks]);

  const playNextTrack = useCallback(() => {
    if (!activeTrack || musicTracks.length === 0) return;
    
    const currentIndex = musicTracks.findIndex(track => track.id === activeTrack.id);
    const nextIndex = isShuffleOn
      ? Math.floor(Math.random() * musicTracks.length)
      : (currentIndex === musicTracks.length - 1 ? 0 : currentIndex + 1);
    
    playTrackRef.current(musicTracks[nextIndex]);
  }, [activeTrack, musicTracks, isShuffleOn]);

  const playPreviousTrack = useCallback(() => {
    if (!activeTrack || musicTracks.length === 0) return;
    
    const currentIndex = musicTracks.findIndex(track => track.id === activeTrack.id);
    const prevIndex = currentIndex <= 0 ? musicTracks.length - 1 : currentIndex - 1;
    playTrackRef.current(musicTracks[prevIndex]);
  }, [activeTrack, musicTracks]);

  const handleTrackClick = useCallback((track) => {
    if (activeTrack?.id === track.id) {
      togglePlayPause();
    } else {
      playTrackRef.current(track);
    }
  }, [activeTrack, togglePlayPause]);

  // Vanta.js background effect
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
      colorMode: "variance",
      birdSize: 1.50,
      wingSpan: 20.00,
      separation: 50.00,
      alignment: 50.00,
      cohesion: 50.00,
      quantity: 3.00
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
  };

  const handleProgressChangeEnd = (e) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    setIsDraggingProgress(false);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const changeVisualization = (visual) => {
    setCurrentVisual(visual);
    setShowSettings(false);
  };

  // Add online/offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      console.log('Internet connection restored');
      // Optionally retry playing the current track
      if (activeTrack && !isPlaying) {
        playTrack(activeTrack);
      }
    };

    const handleOffline = () => {
      console.log('Internet connection lost');
      if (isPlaying) {
        alert('Internet connection lost. Playback may be interrupted.');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [activeTrack, isPlaying]);

  return (
    <div className="music-app-container">
      {/* Vanta.js background */}
      <div ref={vantaRef} className="vanta-background" />
      
      {/* Main layout */}
      <div className="music-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Melodify</h1>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`}
              onClick={() => setActiveTab('discover')}
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Discover</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              <FontAwesomeIcon icon={faList} />
              <span>Your Library</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'genres' ? 'active' : ''}`}
              onClick={() => setActiveTab('genres')}
            >
              <FontAwesomeIcon icon={faMusic} />
              <span>Genres</span>
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <button className="settings-btn" onClick={toggleSettings}>
              <FontAwesomeIcon icon={faGear} />
              <span>Settings</span>
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="main-content">
          {/* Top bar */}
          <div className="top-bar">
            <form onSubmit={handleSearch} className="search-form">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
              <input
                type="text"
                placeholder="Search tracks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
            
            <div className="user-section">
              <div className="streak-display">
                <FontAwesomeIcon icon={faFire} /> 
                <span>3-day streak</span>
              </div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="content-area">
            <div className="section-header">
              <h2>{activeTab === 'discover' ? 'Discover New Music' : activeTab === 'library' ? 'Your Library' : 'Browse Genres'}</h2>
              
              <div className="genre-filter">
                <select
                  value={selectedGenre}
                  onChange={(e) => {
                    setSelectedGenre(e.target.value);
                    fetchJamendoTracks(searchQuery, e.target.value);
                  }}
                  className="genre-select"
                >
                  <option value="all">All Genres</option>
                  <option value="rock">Rock</option>
                  <option value="electronic">Electronic</option>
                  <option value="pop">Pop</option>
                  <option value="classical">Classical</option>
                  <option value="jazz">Jazz</option>
                  <option value="ambient">Ambient</option>
                  <option value="instrumental">Instrumental</option>
                </select>
              </div>
            </div>
            
            {/* Track list */}
            <div className="track-grid">
              {isLoading ? (
                <div className="loading-tracks">
                  <FontAwesomeIcon icon={faHeadphones} spin size="2x" />
                  <p>Loading tracks...</p>
                </div>
              ) : musicTracks.length === 0 ? (
                <div className="no-tracks">
                  <p>No tracks found. Try a different search.</p>
                </div>
              ) : (
                musicTracks.map((track) => (
                  <div 
                    className={`track-card ${activeTrack?.id === track.id ? 'active' : ''}`}
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    style={{
                      '--track-color': track.color
                    }}
                  >
                    <div className="track-image-container">
                      <img 
                        src={track.image} 
                        alt={track.title} 
                        className="track-image"
                        onError={(e) => {
                          e.target.src = 'https://source.unsplash.com/random/300x300/?music,album';
                        }}
                      />
                      
                      <button 
                        className={`track-play-btn ${activeTrack?.id === track.id && isPlaying ? 'playing' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackClick(track);
                        }}
                      >
                        <FontAwesomeIcon icon={activeTrack?.id === track.id && isPlaying ? faPause : faPlay} />
                      </button>
                    </div>
                    
                    <div className="track-info">
                      <h3 className="track-title">{track.title}</h3>
                      <p className="track-artist">{track.artist}</p>
                      
                      <div className="track-meta">
                        <span className="track-genre">{track.genre}</span>
                        <span className="track-duration">{track.duration}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Now playing bar */}
      <div className="now-playing-bar">
        <div className="track-info-section">
          {activeTrack ? (
            <>
              <div className="track-image-wrapper">
                <img src={activeTrack.image} alt={activeTrack.title} />
              </div>
              
              <div className="track-details">
                <h4 className="track-title">{activeTrack.title}</h4>
                <p className="track-artist">{activeTrack.artist}</p>
              </div>
              
              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </>
          ) : (
            <div className="no-track-selected">
              <p>Select a track to play</p>
            </div>
          )}
        </div>
        
        <div className="player-controls-section">
          <div className="player-controls">
            <button 
              className={`control-btn shuffle ${isShuffleOn ? 'active' : ''}`}
              onClick={toggleShuffle}
            >
              <FontAwesomeIcon icon={faShuffle} />
            </button>
            
            <button 
              className="control-btn prev"
              onClick={playPreviousTrack}
              disabled={!activeTrack || musicTracks.length === 0}
            >
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            
            <button 
              className={`main-play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlayPause}
              disabled={!activeTrack && musicTracks.length === 0}
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            
            <button 
              className="control-btn next"
              onClick={playNextTrack}
              disabled={!activeTrack || musicTracks.length === 0}
            >
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
            
            <button 
              className={`control-btn repeat ${isRepeatOn ? 'active' : ''}`}
              onClick={toggleRepeat}
            >
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </div>
          
          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              onMouseDown={() => setIsDraggingProgress(true)}
              onMouseUp={handleProgressChangeEnd}
              onTouchStart={() => setIsDraggingProgress(true)}
              onTouchEnd={handleProgressChangeEnd}
              className="progress-bar"
              ref={progressBarRef}
              style={{
                background: activeTrack 
                  ? `linear-gradient(to right, ${activeTrack.color} ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
                  : 'rgba(255,255,255,0.1)'
              }}
            />
            
            <span className="time-display">{activeTrack ? activeTrack.duration : '0:00'}</span>
          </div>
        </div>
        
        <div className="additional-controls-section">
          <div className="volume-control">
            <button 
              className="control-btn volume"
              onClick={toggleMute}
            >
              <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
          
          {activeTrack && (
            <div className={`visualizer ${currentVisual}`}>
              {currentVisual === 'bars' && (
                visualizerData.map((value, i) => (
                  <div 
                    key={i} 
                    className="visualizer-bar"
                    style={{
                      height: `${value / 2}px`,
                      backgroundColor: activeTrack.color,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))
              )}
              
              {currentVisual === 'waves' && (
                <div className="wave-container">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="wave-bar"
                      style={{
                        height: `${visualizerData[i % visualizerData.length] / 3}px`,
                        backgroundColor: activeTrack.color,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Settings panel */}
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Settings</h3>
            <button className="close-btn" onClick={toggleSettings}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          
          <div className="settings-section">
            <h4>Visualization</h4>
            <div className="visualization-options">
              <button 
                className={`visual-option ${currentVisual === 'bars' ? 'active' : ''}`}
                onClick={() => changeVisualization('bars')}
              >
                Bars
              </button>
              
              <button 
                className={`visual-option ${currentVisual === 'waves' ? 'active' : ''}`}
                onClick={() => changeVisualization('waves')}
              >
                Waves
              </button>
            </div>
          </div>
          
          <div className="settings-section">
            <h4>Audio Quality</h4>
            <div className="quality-options">
              <button className="quality-option active">Normal</button>
              <button className="quality-option">High</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;