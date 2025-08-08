require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://app_user:user123@cluster0.ooublyb.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      tlsAllowInvalidCertificates: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// User Model
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// Pre-save hook for password hashing
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

module.exports = async (req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.set(corsHeaders);
    res.status(200).end();
    return;
  }

  // Set CORS headers for all responses
  res.set(corsHeaders);

  try {
    // Connect to database
    await connectDB();

    const { path } = req;
    const method = req.method;

    // Route handling
    if (path === '/api/signup' && method === 'POST') {
      const { username, email, password } = req.body;
      
      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already in use' });
      }

      // Create new user
      const user = await User.create({ username, email, password });
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });

    } else if (path === '/api/login' && method === 'POST') {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user and include password
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });

    } else if (path === '/api/forgot-password' && method === 'POST') {
      const { email } = req.body;
      
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'No user found with this email' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetPasswordExpire = Date.now() + 3600000; // 1 hour

      // Save token to user
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = resetPasswordExpire;
      await user.save();

      // Create reset URL (update this with your Vercel domain)
      const resetUrl = `${req.headers.origin || process.env.FRONTEND_URL || 'https://your-domain.vercel.app'}/reset-password/${resetToken}`;

      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - Solace',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your Solace account. Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <br>
          <p>Best regards,<br>The Solace Team</p>
        `
      };

      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        message: 'Password reset email sent'
      });

    } else if (path === '/api/reset-password' && method === 'POST') {
      const { token, newPassword } = req.body;

      // Find user with valid token
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      // Update password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'Password reset successful'
      });

    } else {
      res.status(404).json({ error: 'Route not found' });
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 