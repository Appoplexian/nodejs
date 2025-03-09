const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }
    const newTask = { id: nextId++, title, description, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.status(200).json(task);
});


app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted" });
});


