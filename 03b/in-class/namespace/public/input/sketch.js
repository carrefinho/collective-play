let socket = io('/input');

socket.on('connect', function() {
  console.log("Connected");
});

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw() {

    ellipse(mouseX, mouseY, 10);

}

// Send mouse info
function mouseMoved(){
  // Send mouse position
  socket.emit('data', {x: mouseX, y: mouseY});
}
