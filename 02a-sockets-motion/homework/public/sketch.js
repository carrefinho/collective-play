const socket = io();
let users = {};

let pressure = 0;

socket.on('connect', () => {
    console.log('connected to server');
});

function setup() {
    createCanvas(windowWidth, windowHeight);

    Pressure.set('#defaultCanvas0', {
        change: function(force){
            // relative position
            let x = mouseX / width;
            let y = mouseY / height;

            pressure = force;
            socket.emit('data', {
                pressure: pressure,
                position: {
                    x: x,
                    y: y
                }
            })
        }
    });

    socket.on('message', (message) => {
        let id = message.id;
        let data = message.data;
        // console.log(data.pressure);
        // console.log(data.position.x, data.position.y);
        if (id in users) {
            let user = users[id];
            user.pressure = data.pressure;
            user.position = data.position;
        } else {
            // randomly generate a color for each user
            let hue = floor(random(256));
            console.log(hue);
            users[id] = {
                pressure: data.pressure,
                position: data.position,
                hue: hue
            }
        }
    })

    socket.on('left', (id) => {
        if (id in users) delete users[id];
    })
}

function draw() {
    background(0);

    for (let u in users) {
        let user = users[u];
        let position = user.position;

        // convert pressure into radius
        let radius = map(user.pressure, 0, 1, 3, Math.max(width, height) / 20)
        
        colorMode(HSL, 255);
        let c = color(user.hue, 200, 205);
        console.log(c);
        fill(c);
        ellipse(position.x * width, position.y * height, radius, radius);
    }
}