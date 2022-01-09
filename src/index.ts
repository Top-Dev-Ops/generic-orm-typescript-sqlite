import express from 'express';

import {StudentRepository} from './repositories/StudentRepository';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const student = new StudentRepository('db.db', 'students');

app.get('/students', async (req, res) => {
    const students = await student.select();
    return res.send(students);
});

app.post('/students', async (req, res) => {
    const result = await student.insert(req.body);
    return res.send(result);
});

app.post('/students/:id', async(req, res) => {
    const result = await student.update({ id: Number(req.params.id) }, req.body);
    return res.send(result);
});

app.get('/students/:id', async (req, res) => {
    const students = await student.select({ id: Number(req.params.id) });
    return res.send(students);
});

app.delete('/students/:id', async(req, res) => {
    const result = await student.delete({ id: Number(req.params.id) });
    return res.send(result);
});

app.get('/students/count', async (req, res) => {
    const result = await student.countStudents();
    return res.send(result);
});

app.listen(3333, () => console.log("Listening on port 3333..."));
