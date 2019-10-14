let cursor = { x: 0, y: 0 };
let rows = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
};
let keys = [];
const keySize = 48, keySpacing = 12, horSpacing = 128, verSpacing = 128;

function setup() {
    createCanvas(1280, 720);
    background(235);

    // initalize alphabet keys
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            let key = {
                char: rows[i][j],
                x: horSpacing + j * (keySize + keySpacing) + 10 * i,
                y: verSpacing + i * (keySize + keySpacing)
            }
            keys.push(key);
        }
    }

    // initialize next and backspace

}

function draw() {
    // cursor.x = mouseX;
    // cursor.y = mouseY;

    background(235);

    keys.forEach((key) => {
        fill(255);
        rect(key.x, key.y, keySize, keySize);
        fill(0);
        text(key.char, key.x + 4, key.y + 12);
    });

    fill('blue');
    ellipse(cursor.x, cursor.y, 12, 12);
}

function mousePressed() {
    let res = {
        hit: false,
        char: ''
    }
    keys.forEach((key) => {
        if (collidePointRect(cursor.x, cursor.y, key.x, key.y, keySize, keySize)) {
            res.hit = true;
            res.char = key.char;
        }
    });
    console.log(res);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        cursor.x -= 10;
    } else if (keyCode === RIGHT_ARROW) {
        cursor.x += 10;
    } else if (keyCode === UP_ARROW) {
        cursor.y -= 10;
    } else if (keyCode === DOWN_ARROW) {
        cursor.y += 10;
    }

}