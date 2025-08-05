# Solace - A Mental Health Platform 🌟

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.17.0-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## 📖 Overview

**Solace** is a comprehensive mental health platform designed to provide support, resources, and therapeutic tools for individuals dealing with various mental health challenges. The platform offers a safe, accessible, and user-friendly environment for mental wellness through multiple therapeutic modalities.

## 🎯 Mission

To provide accessible, evidence-based mental health support through technology, offering a comprehensive suite of tools and resources to help individuals navigate their mental health journey with dignity and hope.

## ✨ Key Features

### 🏠 **Home & Navigation**
- **Welcoming Homepage**: Beautiful, calming interface designed to reduce anxiety
- **Responsive Navigation**: Easy-to-use navigation with smooth transitions
- **User Authentication**: Secure login and registration system
- **Password Recovery**: Forgot password and reset functionality

### 🧠 **Mental Health Assessment Tools**
- **Interactive Tests**: Comprehensive mental health assessments
- **Condition-Specific Pages**: Dedicated sections for different mental health conditions
- **Progress Tracking**: Monitor your mental health journey over time

### 🎵 **Music Therapy**
- **Curated Playlists**: Therapeutic music selections for different moods
- **Audio Player**: High-quality audio playback with controls
- **Spotify Integration**: Access to extensive music library
- **Lyrics Display**: Song lyrics for enhanced therapeutic experience
- **Custom Playlists**: Create and save personal therapeutic playlists

### 📚 **Bibliotherapy (Book Therapy)**
- **Curated Book Collection**: Carefully selected books for mental health support
- **Reading Recommendations**: Personalized book suggestions
- **Digital Library**: Access to mental health literature
- **Reading Progress**: Track your reading journey

### 🎬 **Video Therapy**
- **Therapeutic Videos**: Guided meditation, relaxation, and educational content
- **YouTube Integration**: Access to mental health channels and content
- **Video Categories**: Organized by condition and therapy type
- **Playlist Management**: Save and organize therapeutic videos

### 🆘 **Crisis Support**
- **Help Section**: Emergency resources and crisis hotlines
- **Share Feature**: Connect with support networks
- **Safety Tools**: Resources for immediate mental health support

### 🎨 **Interactive Features**
- **Smooth Animations**: Framer Motion and GSAP animations for better UX
- **Parallax Effects**: Engaging visual experiences
- **Particle Effects**: Calming background animations
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing
- **CSS3**: Custom styling with animations
- **Framer Motion**: Smooth animations and transitions
- **GSAP**: Advanced animations and effects
- **React Icons**: Comprehensive icon library
- **FontAwesome**: Professional icons

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing and security
- **Nodemailer**: Email functionality for password recovery

### Audio & Media
- **Howler.js**: Advanced audio library
- **React Audio Player**: Audio playback components
- **WaveSurfer.js**: Audio visualization
- **React Player**: Video playback support
- **Spotify Web API**: Music streaming integration

### Development Tools
- **Concurrently**: Run multiple commands simultaneously
- **HTTP Proxy Middleware**: API proxy for development
- **ESLint**: Code linting and quality
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/solace-mental-health-platform.git
   cd solace-mental-health-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start both the React frontend and Node.js backend concurrently.

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
solace-mental-health-platform/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Anxiety.js     # Anxiety-specific resources
│   │   ├── Books.js       # Bibliotherapy section
│   │   ├── Depression.js  # Depression resources
│   │   ├── Home.js        # Landing page
│   │   ├── Login.js       # Authentication
│   │   ├── Music.js       # Music therapy
│   │   ├── Navbar.js      # Navigation component
│   │   ├── PTSD.js        # PTSD resources
│   │   ├── Services.js    # Services overview
│   │   ├── Share.js       # Social sharing
│   │   ├── Stress.js      # Stress management
│   │   ├── Test.js        # Assessment tools
│   │   └── Video.js       # Video therapy
│   ├── styles/            # CSS files for each component
│   ├── Images/            # Image assets
│   ├── Music/             # Audio files
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
├── server.js              # Express server
├── audio-proxy.js         # Audio proxy middleware
└── package.json           # Dependencies and scripts
```

## 🎮 Available Scripts

- **`npm start`**: Runs the React app in development mode
- **`npm run server`**: Starts the Express backend server
- **`npm run dev`**: Runs both frontend and backend concurrently
- **`npm run build`**: Builds the app for production
- **`npm test`**: Launches the test runner
- **`npm run eject`**: Ejects from Create React App (one-way operation)

## 🔧 Configuration

### Database Setup
The application uses MongoDB for data storage. Ensure you have:
- MongoDB instance running (local or cloud)
- Proper connection string in environment variables
- Database collections for users, assessments, and user data

### Email Configuration
For password recovery functionality:
- Configure SMTP settings in environment variables
- Use a Gmail account or other SMTP provider
- Enable "Less secure app access" for Gmail or use app passwords

### Spotify Integration
For music therapy features:
- Create a Spotify Developer account
- Register your application
- Add client ID and secret to environment variables

## 🎨 Design Philosophy

### User Experience
- **Accessibility First**: Designed for users with various abilities
- **Calming Interface**: Soft colors and smooth animations
- **Intuitive Navigation**: Easy-to-find resources and tools
- **Mobile Responsive**: Works perfectly on all device sizes

### Mental Health Considerations
- **Trigger Warnings**: Appropriate content warnings where needed
- **Crisis Resources**: Easy access to emergency help
- **Privacy Focused**: Secure user data handling
- **Non-Judgmental**: Supportive and inclusive language

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure session management
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Variables**: Secure configuration management

## 🌟 Contributing

We welcome contributions to make Solace better! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add appropriate tests for new features
- Update documentation for any changes
- Ensure accessibility standards are met
- Consider mental health implications of changes

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you need help or have questions:

- **Crisis Support**: If you're in crisis, please contact emergency services or a crisis hotline
- **Technical Issues**: Open an issue on GitHub
- **Feature Requests**: Submit through GitHub issues
- **General Questions**: Reach out through the platform's contact form

## 🙏 Acknowledgments

- Mental health professionals who provided guidance
- Open source community for amazing tools and libraries
- Users who provided feedback and suggestions
- Mental health organizations for resources and support

## 📊 Roadmap

### Upcoming Features
- [ ] AI-powered mood tracking
- [ ] Peer support groups
- [ ] Professional therapist directory
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with wearable devices
- [ ] Multilingual support
- [ ] Offline functionality

### Version History
- **v0.1.0**: Initial release with core features
- **Future**: Continuous improvements based on user feedback

---

**Remember**: Solace is designed to complement professional mental health care, not replace it. Always consult with qualified mental health professionals for serious concerns.

**You are not alone. Help is available. 💙**
