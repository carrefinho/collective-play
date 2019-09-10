const port = process.env.PORT || 8000;
const express = require('express');
let app = express();

let server = require('http').createServer(app).listen(port, () => {
    console.log('listening ' + port);
})

app.use(express.static('public'));

