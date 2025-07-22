import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import '../styles/Books.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faWhatsapp, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import BIRDS from 'vanta/dist/vanta.birds.min';
import * as THREE from 'three';

// Import images
import Book1 from '../Images/Book1.jpg';
import Book2 from '../Images/Book2.jpg';
import Book3 from '../Images/Book3.jpg';
import Book4 from '../Images/Book4.jpg';
import Book5 from '../Images/Book5.jpg';
import Book6 from '../Images/Book6.jpg';

const defaultTiltOptions = {
  max: 8,
  scale: 1.01,
  glare: true,
  'max-glare': 0.1,
};

const Books = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [shareMenu, setShareMenu] = useState(null);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    if (!vantaEffect) {
      const effect = BIRDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
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
      setVantaEffect(effect);
    }

    const handleResize = () => {
      if (vantaEffect) {
        vantaEffect.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [vantaEffect]);

  const books = [
    {
      id: 1,
      title: 'Depression - An Information Booklet',
      author: 'By - SMCR NHS',
      image: Book1,
      pdf: 'https://drive.google.com/uc?export=view&id=1x7UsWblYjmtrajiqXZ5zHC2kdvmomEqe',
      themeColor: '#4a89dc'
    },
    {
      id: 2,
      title: 'The Mind Gut Connection',
      author: 'By - Emeran Mayer',
      image: Book2,
      pdf: 'https://drive.google.com/uc?export=view&id=1zt2vPXg6KQf7olGUezfZ5t2LvkuNZ60U',
      themeColor: '#e9573f'
    },
    {
      id: 3,
      title: 'Overcoming Depression',
      author: 'By - Lawrence E. Shapiro',
      image: Book3,
      pdf: 'https://drive.google.com/uc?export=view&id=10DMJCtVYHoTfnMLMJYxKVwYSSzejErO9',
      themeColor: '#3baeda'
    },
    {
      id: 4,
      title: 'How Your Mind Can Heal Your Body',
      author: 'By - David R. Hamilton',
      image: Book4,
      pdf: 'https://drive.google.com/uc?export=view&id=1DX1BL_UAl_VeQOM29ZmJ9lT-hH_LEECC',
      themeColor: '#8cc152'
    },
    {
      id: 5,
      title: 'NIH - Depression',
      author: 'By - National Institute of Mental Health',
      image: Book5,
      pdf: 'https://drive.google.com/uc?export=view&id=1Kj5bn4OkFcbP7kgM-zxAojqD8UsJRgSS',
      themeColor: '#f6bb42'
    },
    {
      id: 6,
      title: 'A Guide To What Works For Depression',
      author: 'By - Beyond Blue',
      image: Book6,
      pdf: 'https://drive.google.com/uc?export=view&id=1cpt6mHkHuj9XN46g97nqQoL1TZGSe14Y',
      themeColor: '#d770ad'
    },
  ];

  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId) 
        : [...prev, bookId]
    );
  };

  const shareOptions = [
    { name: 'Facebook', icon: faFacebook, action: (url) => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`) },
    { name: 'Twitter', icon: faTwitter, action: (url) => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`) },
    { name: 'Instagram', icon: faInstagram, action: (url) => window.open(`https://instagram.com/?url=${encodeURIComponent(url)}`) },
    { name: 'WhatsApp', icon: faWhatsapp, action: (url) => window.open(`https://wa.me/?text=${encodeURIComponent(url)}`) },
    { name: 'Copy Link', icon: faLink, action: (url) => navigator.clipboard.writeText(url).then(() => alert('Link copied!')) }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <div className="books-container" ref={vantaRef} />
      <div className="books-page">
        <motion.div 
          className="books-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {books.map((book) => (
            <Tilt
              key={book.id}
              options={defaultTiltOptions}
              className="tilt-wrapper"
            >
              <motion.div 
                className="book-card"
                variants={item}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ 
                  background: `linear-gradient(to bottom, ${book.themeColor}15, white)`,
                  borderLeft: `5px solid ${book.themeColor}`
                }}
              >
                <div className="action-buttons">
                  <motion.div 
                    className="favorite-icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(book.id);
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={favorites.includes(book.id) ? faHeart : faEmptyHeart} 
                      color={favorites.includes(book.id) ? '#ff4081' : '#ccc'}
                    />
                  </motion.div>

                  <button 
                    className="share-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShareMenu(shareMenu === book.id ? null : book.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                  {shareMenu === book.id && (
                    <div className="share-menu">
                      {shareOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            option.action(book.pdf);
                            setShareMenu(null);
                          }}
                        >
                          <FontAwesomeIcon icon={option.icon} /> {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <motion.div 
                  className="image-container"
                  whileHover={{ 
                    rotateY: 5,
                    transition: { duration: 0.5 }
                  }}
                >
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="book-image"
                  />
                </motion.div>

                <p className="book-title">{book.title}</p>
                
                <div className="star-rating">
                  {[1,2,3,4,5].map((star) => (
                    <span 
                      key={star}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRatings(prev => ({
                          ...prev,
                          [book.id]: star
                        }));
                      }}
                      style={{ 
                        color: star <= (ratings[book.id] || 0) ? '#FFD700' : '#000000',
                        cursor: 'pointer'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <motion.button 
                  className="open-pdf" 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(book.pdf);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ background: book.themeColor }}
                >
                  Download PDF
                </motion.button>

                <p className="author-name">{book.author}</p>

                <div className="quick-info">
                  <p>Click for details</p>
                  <button onClick={() => setSelectedBook(book)}>
                    Quick View
                  </button>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>

      {selectedBook && (
        <motion.div 
          className="preview-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedBook(null)}
        >
          <motion.div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{ borderTop: `5px solid ${selectedBook.themeColor}` }}
          >
            <motion.div
              animate={{
                rotateY: [0, 5, 0],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <img src={selectedBook.image} alt={selectedBook.title} />
            </motion.div>
            <h3>{selectedBook.title}</h3>
            <p className="modal-author">{selectedBook.author}</p>
            
            <div className="modal-actions">
              <motion.button 
                onClick={() => window.open(selectedBook.pdf)}
                whileHover={{ scale: 1.05 }}
                style={{ background: selectedBook.themeColor }}
              >
                Download PDF
              </motion.button>
              <motion.button 
                onClick={() => setSelectedBook(null)}
                whileHover={{ scale: 1.05 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Books;