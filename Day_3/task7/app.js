const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let loggedIn = false;
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/users.json'), 'utf8'));
let user = null

app.get('/', (req, res) => {
    res.render('index', { loggedIn,user });
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    user = users.find(user => user.username === username && user.password === password);
    if (user) {
        loggedIn = true;
    } else {
        loggedIn = false;
    }
    res.redirect('/');
});

app.get('/signup', (req, res) => {
    res.render('signup');
})
app.post('/signup', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    user = { username, password };
    users.push(user);
    fs.writeFileSync(path.join(__dirname, '/db/users.json'), JSON.stringify(users));
    loggedIn = true;
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    loggedIn = false;
    user = null;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
