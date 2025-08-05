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
<img width="1895" height="857" alt="image" src="https://github.com/user-attachments/assets/0e19dae3-2b33-4c31-b42c-1f8819d95507" />
- **User Authentication**: Secure login and registration system
<img width="1886" height="865" alt="image" src="https://github.com/user-attachments/assets/65448d07-0d6f-4b4e-99d7-00c282e2be7e" />
<img width="1892" height="833" alt="image" src="https://github.com/user-attachments/assets/f0eb04cc-b92f-446d-8aa4-4f24087e9df0" />
- **Password Recovery**: Forgot password and reset functionality
<img width="1890" height="822" alt="image" src="https://github.com/user-attachments/assets/c52080dc-6012-4eb1-8cf8-030260e17b38" />

### 🧠 **Mental Health Assessment Tools**
<img width="1892" height="868" alt="image" src="https://github.com/user-attachments/assets/6e525ec0-e45a-4087-84df-c12285f78e6b" />
- **Interactive Tests**: Comprehensive mental health assessments
<img width="1893" height="865" alt="image" src="https://github.com/user-attachments/assets/08406249-335b-4697-b9a0-99930bbbf6d7" />
<img width="1896" height="868" alt="image" src="https://github.com/user-attachments/assets/3991975d-138e-44c2-8834-e3cb2e1efc87" />
<img width="1892" height="862" alt="image" src="https://github.com/user-attachments/assets/dc5d6fe8-ffba-447b-b7cf-123922603d89" />
<img width="1892" height="861" alt="image" src="https://github.com/user-attachments/assets/455a19ee-05f0-473e-bf36-df4334daf501" />

### 🎵 **Music Therapy**
<img width="1891" height="867" alt="image" src="https://github.com/user-attachments/assets/d3d114de-3ae4-480a-bb89-54d934f74149" />

- **Curated Playlists**: Therapeutic music selections for different moods
- **Audio Player**: High-quality audio playback with controls
- **jamendo music Integration**: Access to extensive music library
- **Custom Playlists**: Create and save personal therapeutic playlists

### 📚 **Bibliotherapy (Book Therapy)**
<img width="1901" height="711" alt="image" src="https://github.com/user-attachments/assets/683c0dc8-3395-43fb-ab90-8a25e5b19a27" />

- **Curated Book Collection**: Carefully selected books for mental health support
- **Reading Recommendations**: Personalized book suggestions
- **Digital Library**: Access to mental health literature
- **Reading Progress**: Track your reading journey

### 🎬 **Video Therapy**
<img width="1895" height="847" alt="image" src="https://github.com/user-attachments/assets/cd5caba3-40a5-4321-8f8c-d1892451342e" />
<img width="1897" height="871" alt="image" src="https://github.com/user-attachments/assets/8fdb985f-a622-4de2-bc88-a6b0fe273c47" />
- **Therapeutic Videos**: Guided meditation, relaxation, and educational content
- **YouTube Integration**: Access to mental health channels and content
- **Video Categories**: Organized by condition and therapy type
- **Playlist Management**: Save and organize therapeutic videos

### 🆘 **Anonymous Chat**
<img width="1888" height="825" alt="image" src="https://github.com/user-attachments/assets/3695d734-ae50-47ec-bf5a-41bee9317551" />
<img width="1883" height="858" alt="image" src="https://github.com/user-attachments/assets/2a07d27c-da75-4f9a-b43c-2d78c21145ec" />

- **Connect Anonymously:** Chat with real people who have overcome mental health struggles, without revealing your identity.
- **Peer-to-Peer Support:** Share your thoughts and feelings freely, and receive guidance from those with lived experiences.
- **Safe & Confidential Space:** Conversations are private, respectful, and designed to offer emotional comfort in a judgment-free environment.

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
