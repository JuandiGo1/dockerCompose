const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); 

let notes = [];

app.post('/notes', (req, res) => {
    const note = req.body;
    notes.push(note);
    res.status(201).send(note);
});

app.get('/notes', (req, res) => {
    res.send(notes);
});

app.get('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');
    res.send(note);
});

app.put('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');

    note.content = req.body.content;
    res.send(note);
});

app.delete('/notes/:id', (req, res) => {
    notes = notes.filter(n => n.id !== parseInt(req.params.id));
    res.send('Note deleted');
});

app.listen(3002, () => {
    console.log('Notes service running on port 3002');
});
