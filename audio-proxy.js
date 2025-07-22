const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Enable CORS for your React app
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Range', 'Accept']
}));

// Proxy endpoint for audio files
app.get('/proxy/audio', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Make request to Jamendo's storage server
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      headers: {
        'Range': req.headers.range || 'bytes=0-',
        'Accept': 'audio/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Get content type from response or default to audio/mpeg
    const contentType = response.headers['content-type'] || 'audio/mpeg';

    // Set appropriate headers for audio streaming
    res.set({
      'Content-Type': contentType,
      'Content-Length': response.headers['content-length'],
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range, Accept',
      'Access-Control-Allow-Credentials': 'true'
    });

    // Pipe the audio stream directly to response
    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch audio',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Audio proxy server running on port ${PORT}`);
}); 