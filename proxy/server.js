const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware para redirigir solicitudes a /auth y /notes
app.use('/auth', createProxyMiddleware({
    target: 'http://auth:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/auth': ''
    }
}));

app.use('/notes', createProxyMiddleware({
    target: 'http://notes:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/notes': ''
    }
}));

// Servir las páginas de autenticación y notas desde el contenedor de proxy
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/auth.html');
});

app.get('/notes-page', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

app.listen(80, () => {
    console.log('Proxy server running on port 80 ==> http://localhost:80');
});
