# Solace - A Mental Health Platform

A comprehensive mental health platform providing resources, support, and tools for mental wellness.

## 🌟 Features

- **User Authentication**: Secure signup, login, and password reset functionality
- **Mental Health Resources**: Dedicated sections for different mental health conditions
- **Interactive Tools**: Tests, exercises, and assessments
- **Media Resources**: Music, videos, and books for mental wellness
- **Responsive Design**: Works seamlessly across all devices
- **Modern UI/UX**: Beautiful animations and user-friendly interface

## 🚀 Tech Stack

- **Frontend**: React.js, React Router, Material-UI
- **Backend**: Node.js, Express.js (Vercel Serverless Functions)
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3, Tailwind CSS, Framer Motion
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solace-mental-health-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `env.example` to `.env`
   - Fill in your MongoDB connection string and email credentials

4. **Run the development server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Environment
NODE_ENV=production

# Optional: Custom domain for password reset links
FRONTEND_URL=https://your-domain.vercel.app
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**

## 📁 Project Structure

```
solace-mental-health-platform/
├── api/                    # Vercel serverless functions
│   └── index.js           # Main API handler
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── styles/           # CSS files
│   ├── Images/           # Image assets
│   ├── Music/            # Audio files
│   ├── App.js            # Main App component
│   └── index.js          # Entry point
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration
└── README.md             # Project documentation
```

## 🔐 API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/forgot-password` - Password reset request
- `POST /api/reset-password` - Password reset

## 🎨 Features Overview

### Mental Health Sections
- **Depression**: Resources and tools for managing depression
- **Anxiety**: Techniques and exercises for anxiety relief
- **Stress**: Stress management strategies
- **PTSD**: Support for post-traumatic stress disorder

### Interactive Features
- **Tests**: Mental health assessments
- **Music**: Therapeutic music player
- **Videos**: Educational and calming videos
- **Books**: Recommended reading materials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Uday Prajapati**
- Email: 26uday09@gmail.com

## 🙏 Acknowledgments

- Mental health professionals for guidance
- Open source community for libraries and tools
- Users for feedback and support

---

**Note**: This platform is designed to provide mental health resources and support. It is not a substitute for professional medical advice. If you're experiencing a mental health crisis, please contact a mental health professional or emergency services immediately.
