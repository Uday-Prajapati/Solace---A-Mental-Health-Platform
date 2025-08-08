import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Add event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setError('');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setError('You are currently offline. Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection on mount
    if (!navigator.onLine) {
      setError('You are currently offline. Please check your internet connection.');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isOnline) {
      setError('You are currently offline. Please check your internet connection.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    // Validate email before sending request
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'}/api/forgot-password`,
        { email },
        {
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setMessage('Password reset instructions have been sent to your email.');
        setEmail('');
      } else {
        setError(response.data.message || 'Failed to process request. Please try again.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      
      let errorMessage = 'An error occurred. Please try again later.';
      
      if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network and try again.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (err.response) {
        switch (err.response.status) {
          case 404:
            errorMessage = 'Email address not found in our records.';
            break;
          case 429:
            errorMessage = 'Too many attempts. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = err.response.data.message || 'Failed to process request. Please try again.';
        }
      } else if (err.request) {
        errorMessage = 'Unable to reach the server. Please check your connection.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`forgot-password-container ${!isOnline ? 'offline' : ''}`}>
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error when user starts typing
              }}
              placeholder="Enter your email"
              required
              disabled={isLoading || !isOnline}
              className={error ? 'error' : ''}
            />
          </div>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={isLoading || !isOnline || !email}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Sending...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 