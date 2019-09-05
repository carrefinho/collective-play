const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // res.writeHead(200);
    res.send('hello world');
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});