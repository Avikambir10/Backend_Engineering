import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/contact', (req, res) => {
    res.render('contact', { error: null });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.render('contact', { error: 'All fields are required!' });
    }

    res.render('thankyou', { name, email, message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
