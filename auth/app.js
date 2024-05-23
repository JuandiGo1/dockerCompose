const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

app.post('/auth/signup', (req, res) => {
    res.send('User signed up');
});

app.post('/auth/login', (req, res) => {
    res.send('User logged in');
});

app.listen(3001, () => {
    console.log('Auth service running on port 3001');
});
