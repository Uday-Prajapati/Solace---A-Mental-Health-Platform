const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for Jamendo API
  app.use(
    '/v3.0',
    createProxyMiddleware({
      target: 'https://api.jamendo.com',
      changeOrigin: true,
      secure: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      onProxyRes: function(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
      onError: function(err, req, res) {
        console.error('Jamendo API Proxy Error:', err);
        res.status(500).send('Proxy Error');
      }
    })
  );

  // Proxy for Jamendo Storage/CDN
  app.use(
    '/audio',
    createProxyMiddleware({
      target: 'https://mp3d.jamendo.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/audio': ''
      },
      onProxyRes: function(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Accept-Ranges'] = 'bytes';
      },
      onError: function(err, req, res) {
        console.error('Storage Proxy Error:', err);
        res.status(500).send('Storage Proxy Error');
      }
    })
  );
}; 