const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

server.get('/technologies', (req, res) => {
    console.log('GET called!');
    res.send('GET called');
    res.end();
});

server.post('/technologies', (req, res) => {
    console.log('POST called!');
    res.send('POST called');
    res.end();
});

server.put('/technologies', (req, res) => {
    console.log('PUT called!');
    res.send('PUT called');
    res.end();
});

server.delete('/technologies', (req, res) => {
    console.log('DELETE called!');
    res.send('DELETE called');
    res.end();
});

server.listen(8000, () => {
    console.log('Server started!');
});