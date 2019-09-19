let mic;
let level, plevel;
let changes = [];


function setup() {
    createCanvas(400,400);
    mic = new p5.AudioIn();
    mic.start();
  
}

function draw() {
    background(255);
    level = mic.getLevel();
    let change = abs(level-plevel);

    changes.push(change);
    if (changes.length > 120) {
        changes.shift();
    }
  
    let avgChange = 0;
    for (let change in changes) {
        avgChange += change;
    }
    avgChange /= changes.length;

    let d = map(avgChange, 0, 1, 0, width)*10;
    ellipse(width/2, height/2, d, d);
    plevel = level;
}
