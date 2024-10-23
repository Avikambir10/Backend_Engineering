// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let tasks = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/welcome', (req, res) => {
    const user = 'John'; 

    res.render('welcome', { user });
});
app.get('/todo', (req, res) => {
    res.render('todo', { tasks: tasks });
});


app.post('/add-task', (req, res) => {
    const task = req.body.task; 
    if (task) {
        tasks.push(task); 
    }
    res.redirect('/todo');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});