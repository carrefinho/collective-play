const port = 8000;
const express = require('express');
let app = express();

let server = require('http').createServer(app).listen(port, () => {
    console.log('listening ' + port);
})

app.use(express.static('public'));

const io = require('socket.io').listen(server);
const outputs = io.of('/output');
const inputs = io.of('/input');

// input sockets
inputs.sockets.on('connection', (socket) => {
    console.log('hey input' + socket.id);

    socket.on('data', (data) => {
        let message = {
            id : socket.id,
            data : data
        }
        outputs.sockets.emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('bye input' + socket.id)
    })
})

// output sockets
outputs.sockets.on('connection', (socket) => {
    console.log('hey output' + socket.id);

    socket.on('disconnect', () => {
        console.log('bye output' + socket.id);
    })
})

