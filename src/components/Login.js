import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Login.css';
import LoginBackground from '../Images/LoginBackground.png';
import LoginIllust from '../Images/LoginIllust.png';
import fallbackImage from '../assets/fallback.png';

// Set base URL for all axios requests
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Add error handling to image elements
const handleImageError = (e) => {
  e.target.src = fallbackImage;
  console.log('Image failed to load, using fallback');
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '', show: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState({
    illust: false,
    background: false
  });
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const illustrationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const endpoint = isSignUp ? '/api/signup' : '/api/login';
      const payload = isSignUp 
        ? { username: formData.username, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      if (isSignUp && formData.password !== formData.confirmPassword) {
        setMessage({ text: 'Passwords do not match', type: 'error', show: true });
        return;
      }

      const { data } = await api.post(endpoint, payload);
      
      if (data.success) {
        setMessage({ 
          text: isSignUp ? 'Account created successfully!' : 'Login successful!', 
          type: 'success', 
          show: true 
        });
        
        if (!isSignUp) {
          localStorage.setItem('user', JSON.stringify(data.data));
          setTimeout(() => navigate('/'), 1500);
        } else {
          setTimeout(() => setIsSignUp(false), 1500);
        }
      }
    } catch (error) {
      console.error('Auth Error:', error);
      setError(error.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (imageType) => {
    setImageError(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="login-container"
      style={{
        backgroundImage: `url(${imageError.background ? fallbackImage : LoginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width: '100%',
        minHeight: '100vh'
      }}
    >
      <motion.div className="auth-wrapper">
        <motion.div 
          className="auth-card"
          variants={formVariants}
        >
          <div className="card-header">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {isSignUp ? 'Join us today' : 'Sign in to continue to your account'}
            </motion.p>
          </div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="auth-form"
            variants={formVariants}
          >
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div 
                  className="input-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label>Username</label>
                  <div className="highlight" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Email</label>
              <div className="highlight" />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Password</label>
              <div className="highlight" />
            </div>
            
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div 
                  className="input-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label>Confirm Password</label>
                  <div className="highlight" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {!isSignUp && (
              <motion.button
                type="button"
                className="forgot-password"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </motion.button>
            )}
            
            <motion.button
              type="submit"
              className="btn"
              disabled={isLoading}
              whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(67, 97, 238, 0.3)" }}
              whileTap={{ y: 0, boxShadow: "0 5px 10px rgba(67, 97, 238, 0.2)" }}
            >
              {isLoading ? <div className="spinner" /> : (isSignUp ? 'Sign Up' : 'Login')}
            </motion.button>
          </motion.form>
          
          <motion.div 
            className="switch-auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
            <motion.button 
              type="button"
              className="switch-btn"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFormData({
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
                setMessage({ text: '', type: '', show: false });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="illustration-section"
          variants={illustrationVariants}
        >
          <motion.img 
            src={imageError.illust ? fallbackImage : LoginIllust} 
            alt="Login Illustration"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            onError={() => handleImageError('illust')}
          />
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            We are here to help you !
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.
          </motion.p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {message.show && (
          <motion.div 
            className={`message ${message.type}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;