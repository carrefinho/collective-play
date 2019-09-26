// this sketch catches the user's distance to the screen
// which I think somewhat represents the level of focus and in a sense mood
// the distance is measured with the distance between their two eyes with clmtracker's face detection
// it is calibrated with my own seating position etc. that when I put my back completely on the chair it's all green
// while when I get reasonably close say to inspect a line of code it gets red

let cnv, capture;
let ctracker;

function setup() {
  cnv = createCanvas(1280, 960);

  capture = createCapture(VIDEO);
  capture.size(1280, 960);
  capture.hide(); 

  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(capture.elt);

  noStroke();
}

function draw() {
    // background(255);
    // image(capture, 0, 0, 1280, 960);

    let positions = ctracker.getCurrentPosition();

    for (var i=0; i<positions.length; i++) {
        // set the color of the ellipse based on position on screen
        // fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
        // draw ellipse at each position point
        // ellipse(positions[i][0], positions[i][1], 8, 8);
        // console.log(positions[i][0], positions[i][1])
        // text(i, positions[i][0], positions[i][1])
    }

    if (positions != false) {
        let dx = positions[23][0] - positions[28][0];
        let dy = positions[23][1] - positions[28][1];
        eyeDistance = Math.sqrt( dx * dx + dy * dy );
        // console.log(eyeDistance);

        let hue = map(eyeDistance, 120, 250, 100, 0);
        hue = constrain(hue, 0, 100);

        colorMode(HSB);
        let c = color(hue, 100, 50);
        console.log(c)
        background(c);

        console.log(hue);
    }
}
