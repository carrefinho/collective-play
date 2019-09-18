const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

const server = require('http').createServer(app).listen(port, () => {
    console.log('listening to ' + port);
});

app.use(express.static('public'));

const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
    console.log('hi yall ' + socket.id);

    socket.on('data', (data) => {
        console.log('incoming data: ' + data);

        let message = {
            id: socket.id,
            data: data
        }

        io.sockets.emit('message', message);
    })

    socket.on('disconnect', (socket) => {
        console.log('bye ' + socket.id);
        io.sockets.emit('left', socket.id);
    });
})