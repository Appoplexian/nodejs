
const express = require('express');
const bodyParser = require('body-parser');
const { appendFile } = require('fs');

const app = express();

app.use(bodyParser.json());

let tasks = [
    { id: 1, title: 'task 1',desription: 'task1' },
    { id: 2, title: 'task 2',description: 'task2' }
];

// Create (POST): Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read (GET): Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Read (GET): Get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(i => i.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// Update (PUT): Update an task by ID
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(i => i.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    task.title = req.body.title; 
    res.json(task);
});

// Delete (DELETE): Delete an task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskapp = tasks.findapp(i => i.id === parseInt(req.params.id));
    if (taskapp === -1) return res.status(404).send('Task not found');

    const deletedTask = tasks.splice(itemapp, 1);
    res.json(deletedTask);
});
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});
