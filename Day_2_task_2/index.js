const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const userData = {
    john: { age: 25, hobby: 'Photography' },
    jane: { age: 30, hobby: 'Reading' },
    daksh: { age: 20, hobby: 'Dancing' },
    bob: { age: 22, hobby: 'Cycling' }
};

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    const user = userData[username];

    if (user) {
        res.render('profile', { username, age: user.age, hobby: user.hobby });
    } else {
        res.send('User not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
