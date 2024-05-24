const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let students = {};

app.post('/notes', (req, res) => {
    const { id, name, grade } = req.body;
    if (!id || !name || !grade) {
        return res.status(400).send('ID, name, and grade are required');
    }
    if (students[id]) {
        return res.status(400).send('Student with this ID already exists');
    }
    students[id] = {id, name, grade };
    res.status(201).send(students[id]);
});

app.get('/notes', (req, res) => {
    res.send(Object.values(students)); // Convertimos el objeto a un arreglo de estudiantes
});

app.get('/notes/:id', (req, res) => {
    const student = students[req.params.id];
    if (!student) return res.status(404).send('Student not found 1');
    res.send(student);
});

app.put('/notes/:id', (req, res) => {
    const student = students[req.params.id];
    if (!student) return res.status(404).send('Student not found 2');

    const { grade } = req.body;
    if (!grade) {
        return res.status(400).send('Grade is required');
    }

    student.grade = grade;
    res.send(student);
});

app.delete('/notes/:id', (req, res) => {
    const student = students[req.params.id];
    if (!student) return res.status(404).send('Student not found 3');

    delete students[req.params.id];
    res.send({ message: 'Student deleted successfully' });
});

app.listen(3002, () => {
    console.log('Notes service running on port 3002');
});
