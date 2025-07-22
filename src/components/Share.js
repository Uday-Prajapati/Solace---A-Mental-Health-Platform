import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faHeart, 
  faComment, 
  faShare,
  faEllipsisV,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Share.css';

const Share = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "John_Doe",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=1",
      content: "I've been feeling overwhelmed with work lately. The pressure is getting to me and I'm not sure how to handle it.",
      likes: 5,
      comments: [
        { user: "Sarah_Smith", content: "Try breaking down your tasks into smaller, manageable chunks. It helps reduce the overwhelming feeling.", avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=2" },
        { user: "Mike_Johnson", content: "Remember to take regular breaks. The Pomodoro technique works great for me!", avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=3" }
      ],
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: "Emma_Wilson",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=4",
      content: "Does anyone else struggle with social anxiety? I find it hard to interact in group settings.",
      likes: 8,
      comments: [
        { user: "David_Brown", content: "I used to struggle with this too. Start small - maybe try one-on-one interactions first.", avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=5" }
      ],
      timestamp: "5 hours ago"
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [posts]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (tempUsername.trim().length >= 3) {
      setUsername(tempUsername);
      setIsLoggedIn(true);
      localStorage.setItem('userAvatar', `https://api.dicebear.com/6.x/avataaars/svg?seed=${tempUsername}`);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim() || !isLoggedIn) return;

    const post = {
      id: posts.length + 1,
      user: username,
      avatar: localStorage.getItem('userAvatar'),
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: "Just now"
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleCommentSubmit = (postId) => {
    if (!newComment.trim() || !isLoggedIn) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            user: username,
            content: newComment,
            avatar: localStorage.getItem('userAvatar')
          }]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment("");
  };

  const handleLike = (postId) => {
    if (!isLoggedIn) return;
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="app-logo">
            <span className="logo-icon">💬</span>
            <h1>Share & Support</h1>
          </div>
          <h2>Welcome to our community</h2>
          <p>Connect with others, share your thoughts, and find support</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Choose a username"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                minLength={3}
                required
              />
              <span className="input-highlight"></span>
            </div>
            <button type="submit" className="login-button">
              <FontAwesomeIcon icon={faSignInAlt} /> Continue
            </button>
          </form>
          <div className="login-footer">
            <p>By joining, you agree to our <a href="#">Community Guidelines</a></p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="share-container">
      <motion.div 
        className="main-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="app-header">
          <div className="header-content">
            <div className="app-logo">
              <span className="logo-icon">💬</span>
              <h1>Share & Support</h1>
            </div>
            <div className="user-profile">
              <img src={localStorage.getItem('userAvatar')} alt="User" className="profile-avatar" />
              <span className="username">{username}</span>
            </div>
          </div>
        </header>

        <div className="welcome-banner">
          <h2>Welcome back, {username}!</h2>
          <p>Share what's on your mind or support others in the community</p>
        </div>

        <form className="new-post-form" onSubmit={handlePostSubmit}>
          <div className="form-content">
            <img src={localStorage.getItem('userAvatar')} alt="user" className="user-avatar" />
            <input
              type="text"
              placeholder="What would you like to share today?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button type="submit" className="send-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>

        <div className="posts-container" ref={chatContainerRef}>
          {posts.map(post => (
            <motion.div 
              key={post.id}
              className="post-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="post-header">
                <div className="user-info">
                  <img src={post.avatar} alt="user avatar" className="avatar" />
                  <div>
                    <h3>{post.user}</h3>
                    <span className="timestamp">{post.timestamp}</span>
                  </div>
                </div>
                {post.user === username && (
                  <button className="more-options">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                )}
              </div>

              <div className="post-content">
                <p>{post.content}</p>
              </div>

              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>

              <div className="post-actions">
                <button 
                  onClick={() => handleLike(post.id)} 
                  className={`action-button like-button ${post.liked ? 'liked' : ''}`}
                >
                  <FontAwesomeIcon icon={faHeart} /> Like
                </button>
                <button 
                  onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)} 
                  className="action-button"
                >
                  <FontAwesomeIcon icon={faComment} /> Comment
                </button>
                <button className="action-button">
                  <FontAwesomeIcon icon={faShare} /> Share
                </button>
              </div>

              {selectedPost === post.id && (
                <div className="comments-section">
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <img src={comment.avatar} alt="commenter avatar" className="comment-avatar" />
                        <div className="comment-content">
                          <div className="comment-header">
                            <h4>{comment.user}</h4>
                            <span className="comment-time">2h ago</span>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-comments">
                      No comments yet. Be the first to respond!
                    </div>
                  )}
                  <form 
                    className="comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommentSubmit(post.id);
                    }}
                  >
                    <img src={localStorage.getItem('userAvatar')} alt="user" className="user-avatar" />
                    <input
                      type="text"
                      placeholder="Write a supportive comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="send-button">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Share;