let initPos = {
  x: 100,
  y: 200
}, initRadius = 10, directionMultiplier = 0;

class drawActor {
  constructor() {
    this.x = initPos.x;
    this.y = initPos.y;
    this.radius = initRadius;
    this.direction = 75;
    this.speed = 5;
  }

  update() {
    if (this.x < this.radius || this.x > width - this.radius) {
      // console.log('hit wall');
      this.direction = 360 - this.direction;
    } else if (this.y < this.radius || this.y > height - this.radius) {
      this.direction = 180 - this.direction;
    }

    let directionInRadian = this.direction * (Math.PI / 180);
    let xSpeed = this.speed * Math.sin(directionInRadian);
    let ySpeed = this.speed * Math.cos(directionInRadian);
    this.x += xSpeed;
    this.y += ySpeed;
    // console.log(this.x, this.y)
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.radius);
  }
}

let player1;
let mic, fft;
let leftButton, rightButton;

function setup() {
  createCanvas(400, 400);
  player1 = new drawActor();

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.8, 1024);
  mic.connect(fft);

  leftButton = createButton('left');
  rightButton = createButton('right');
  leftButton.mousePressed(() => {
    directionMultiplier = 3;
  });
  leftButton.mouseReleased(() => {
    directionMultiplier = 0;
  });
  rightButton.mousePressed(() => {
    directionMultiplier = -3;
  });
  rightButton.mouseReleased(() => {
    directionMultiplier = 0;
  })
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  spectrum = spectrum.slice(5, 410);
  let spectrumL = [];

  let centroid = fft.getCentroid();
  console.log(centroid);
  
  for (let i = 0; i < spectrum.length; i++) {
    let numDupe = spectrum[i];
    for (let j = 0; j < numDupe; j++) {
      spectrumL.push(i);
    }
  }

  // let spectrumMedian = spectrumL[floor(spectrumL.length / 2)]
  // console.log(spectrumMedian * 19.51 + 100);

  player1.update();
  player1.display();
}



