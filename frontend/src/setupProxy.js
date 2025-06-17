const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://backend:8000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api', // facultatif ici, utile si ton backend n’a pas de prefix
            },
        })
    );
};
