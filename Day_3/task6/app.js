const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//add middleware to check input for post request
app.use((req, res, next) => {
    if (req.method === 'POST') {
        if (!req.body.title || !req.body.body) {
            return res.send('Title and body are required');
        }
    }
    next();
});

// Read posts from posts.json

app.get('/posts', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/posts.json')));
    res.render('index', { posts });
});

app.post('/posts', (req, res) => {
    const { title, body } = req.body;
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/posts.json')));
    const newPost = { id: uuidv4(), title, body };
    posts.push(newPost);
    // Write updated posts to posts.json
    fs.writeFileSync(path.join(__dirname,"/db/posts.json"), JSON.stringify(posts));
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/posts.json')));
    const post = posts.find(post => post.id === id);
    res.render('post', { post });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
