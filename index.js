const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/friend', (req, res) => {
    res.sendFile(`${__dirname}/frontend/persona.html`);
});

let sessionRoute = require('./backend/generate-session.js');
app.use('/session', sessionRoute);

app.post('/api/chat', (req, res) => {
    res.send('test');
});

app.get('/chat', (req, res) => {
    res.sendFile(`${__dirname}/frontend/chat.html`);
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.locals.listSessions = new Map();