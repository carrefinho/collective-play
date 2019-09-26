let mic, fft;

function setup() {
    // initialize microphone
    mic = new p5.AudioIn();
    mic.start();

    // initialize fft
    fft = new p5.FFT(0.98, 64);
    mic.connect(fft);

    // initialize visualization
    createCanvas(windowWidth, windowHeight);
    background(0);
    
}

function draw() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }

    background(0, 15);

    let spectrum = fft.analyze();
    console.log(spectrum);

    noStroke();
    translate(width / 2, height / 2);

    push();
    colorMode(HSB);
    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, 360);
      let amp = spectrum[i];

      let r = map(amp, 0, 256, 20, 300);
      let x = r * cos(angle);
      let y = r * sin(angle);

      let hue = map(i, 0, spectrum.length, 165, 230);
      stroke(hue, 255, 255);
      strokeWeight(1.5);
      line(0, 0, x, y);
    }
    pop();

  
}