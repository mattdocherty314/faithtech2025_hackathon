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
    app.locals.listSessions[req.body.session].chat.push(req.body.chat);
    res.send({
        'type': "success",
        'message': app.locals.listSessions[req.body.session].chat.at(-1)
    });
});

app.get('/chat', (req, res) => {
    res.sendFile(`${__dirname}/frontend/chat.html`);
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.locals.listSessions = {
    "f083aea0": {
        persona: {
            name: "Matthew",
            age: "25",
            experience: "1",
            interests: "programming and cybersecurity"
        },
        chat: []
    }
}