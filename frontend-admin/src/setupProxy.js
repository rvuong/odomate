const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('Setting up proxy middleware for API requests');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://backend:8000/',
            changeOrigin: true,
        })
    );

    app.use(
        '/uploads',
        createProxyMiddleware({
            target: 'http://backend:8000/',
            changeOrigin: true,
        })
    );
};
