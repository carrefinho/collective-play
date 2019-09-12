const port = 8000;
const express = require('express');
let app = express();

let server = require('http').createServer(app).listen(port, () => {
    console.log('listening ' + port);
})

app.use(express.static('public'));

const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {

    console.log('new client: ' + socket.id);

    socket.on('data', (data) => {
        console.log('date received');
        io.sockets.emit('data', data);
    })

    socket.on('disconnect', () => {
        console.log('disconnected ' + socket.id);
    })
})

