const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(port, () => {
    console.log('listening on', port);
})

app.use(express.static('public'));

const io = require('socket.io').listen(server);

const output = io.of('/output');

const input1 = io.of('/input1');
input1.on('connection', (socket) => {
    console.log('input client connected:' + socket.id);

    socket.on('move', (data) => {
        let message = {
            x: data.x
        }
        output.emit('mouseX', message);
    });

    socket.on('click', () => {
        let data = {
            u: 1
        };
        output.emit('click', data);
    })
});

const input2 = io.of('/input2');
input2.on('connection', (socket) => {
    console.log('input client connected:' + socket.id);

    socket.on('move', (data) => {
        let message = {
            y: data.y
        }
        output.emit('mouseY', message);
    });

    socket.on('click', () => {
        let data = {
            u: 2
        };
        output.emit('click', data);
    })
});