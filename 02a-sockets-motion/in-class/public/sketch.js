// Open and connect socket
let socket = io();
let users;

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Receive message from server
  socket.on('message', (message) => {
    fill(0);
    ellipse(pos.x, pos.y, 10, 10);
  });
}

function draw() {
  let x = map(rotationY, -90, 90, 0, width);
  let y = map(rotationX, -90, 90, 0, height);
  x = constrain(0, width);
  y = constrain(0, height);
  // Send mouse position
  socket.emit('data', {x: x, y: y});
}

