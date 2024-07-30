require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const brevo = require('./brevo');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  req.session.user = { username };
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.send('Welcome to your dashboard, ' + req.session.user.username);
});

app.get('/contacts', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const response = await brevo.get('/contacts');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
