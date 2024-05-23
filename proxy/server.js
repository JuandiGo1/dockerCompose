const express = require('express');
const httpProxy = require('http-proxy');


const app = express();

const proxy = httpProxy.createProxyServer();

app.all('/auth/*', (req, res) => {
  proxy.web(req, res, { target: 'http://auth:3000' });
});

app.all('/notas/*', (req, res) => {
  proxy.web(req, res, { target: 'http://notas:3000' });
});

// Manejo de errores en el proxy
proxy.on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Proxy Error');
});

// Inicia el servidor en el puerto 80 para que esté disponible externamente
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
