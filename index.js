const express = require('express');
const app = express();
const port = 3000;

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/create-friend', (req, res) => {
    res.sendFile(__dirname+'/frontend/persona.html');
});

app.post('/api/chat', (req, res) => {
    res.send('test');
});

app.get('/chat', (req, res) => {
    res.send('chat');
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});