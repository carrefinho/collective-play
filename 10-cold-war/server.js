const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(port, _ => {
    console.log('listening at port: ' + port);
})

app.use(express.static('public'));
const io = require('socket.io').listen(server);

let turnA = true;
let teamAPlayers = [], teamBPlayers = [];

const teamA = io.of('/team-a');
teamA.on('connection', socket => {
    console.log('Team A client connected: ' + socket.id);

    if (turnA) {
        socket.emit('your-turn')
    } else {
        socket.emit('their-turn');
    };

    socket.on('go', data => {
        console.log(data);
    })

})

const teamB = io.of('/team-b');
teamB.on('connection', socket => {
    console.log('Team B client connected: ' + socket.id);

    if (!turnA) {
        socket.emit('your-turn')
    } else {
        socket.emit('their-turn');
    };
})
