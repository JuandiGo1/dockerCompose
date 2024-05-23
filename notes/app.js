const express = require('express');
const app = express();
app.use(express.json());

let students = [];

// Crear un nuevo estudiante con nota
app.post('/notes', (req, res) => {
    const { id, name, grade } = req.body;
    if (!id || !name || !grade) {
        return res.status(400).send('ID, name, and grade are required');
    }
    const student = { id, name, grade };
    students.push(student);
    res.status(201).send(student);
});

// Obtener todos los estudiantes y sus notas
app.get('/notes', (req, res) => {
    res.send(students);
});

// Obtener un estudiante específico por ID
app.get('/notes/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');
    res.send(student);
});

// Actualizar la nota de un estudiante por ID
app.put('/notes/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');
    
    const { grade } = req.body;
    if (!grade) {
        return res.status(400).send('Grade is required');
    }
    
    student.grade = grade;
    res.send(student);
});

// Eliminar un estudiante por ID
app.delete('/notes/:id', (req, res) => {
    students = students.filter(s => s.id !== parseInt(req.params.id));
    res.send('Student deleted');
});

app.listen(3002, () => {
    console.log('Notes service running on port 3002');
});
