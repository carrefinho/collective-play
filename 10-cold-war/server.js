const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(port, _ => {
    console.log('listening at port: ' + port);
})

app.use(express.static('public'));
const io = require('socket.io').listen(server);

let turnA = true;
let teamAPlayerCount = 6, teamBPlayerCount = 6;
const actions = [
    {
        value: 'hold',
        text: 'hold hands with',
        mod: [5, 10, 15],
        unit: 's'
    },
    {
        value: 'tap',
        text: 'forehead slowly tapped by',
        mod: [10, 15, 20],
        unit: ' times'
    },
    {
        value: 'shake',
        text: 'shake hands with',
        mod: [5, 7, 10],
        unit: 's'
    }
];

const teamA = io.of('/team-a');
teamA.on('connection', socket => {
    console.log('Team A client connected: ' + socket.id);

    socket.emit('init', {
        opCount: teamBPlayerCount,
        actions: actions
    });

    if (turnA) {
        socket.emit('your-turn')
    } else {
        socket.emit('wait');
    };

    socket.on('go', data => {
        teamA.emit('wait');
        teamB.emit('do', data);
        teamB.emit('their-turn');
        turnA = false;
    })

    socket.on('done', _ => {
        teamA.emit('your-turn');
    })
})

const teamB = io.of('/team-b');
teamB.on('connection', socket => {
    console.log('Team B client connected: ' + socket.id);

    socket.emit('init', {
        opCount: teamBPlayerCount,
        actions: actions
    });

    if (!turnA) {
        socket.emit('your-turn')
    } else {
        socket.emit('wait');
    };

    socket.on('go', data => {
        teamB.emit('wait');
        teamA.emit('do', data);
        teamA.emit('their-turn');
        turnA = true;
    })

    socket.on('done', _ => {
        teamB.emit('your-turn');
    })
})
