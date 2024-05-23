const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

let users = {}

app.post('/auth/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    if (users[username]) {
        return res.status(400).send('User already exists');
    }
    users[username] = password;
    res.send('User signed up successfully');
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    if (users[username] && users[username] === password) {
        res.send('User logged in successfully');
    } else {
        res.status(400).send('Invalid username or password');
    }
});

app.listen(3001, () => {
    console.log('Auth service running on port 3001');
});
