const prompts = [
    "I'm sorry, Officer. I didn't realize we were standing in a \" No ______ \" zone.",
    "I'm making a lifestyle change in 2019. I'm giving up ______ .",
    "That’s cute. You actually believe in ______ ? Grow up.",
    "You can't spell _____ without U and I.",
    "An alien just landed! His first word was ______ .",
    "This is the way the world ends: not with a bang but a ______. ",
    "Sorry, we don't have coke, is ______ okay?",
    "Two birds one ______",
    "By 2020 we'll have more ______ .",
    "What doesn’t kill you makes you ______ .",
    "Money can buy anything except ______ .",
    "Earth has been renamed \" ______ \". ",
    "42 is the answer to life, the universe, and ______ .",
    "I think , therefore I ______ .",
    "Doctor, we’re losing him! Quick, get the ______ !"
];

const cursor = { x: 0, y: 0 };
const rows = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
};
const keySize = 64, keySpacing = 12, horSpacing = 196, verSpacing = 128;
let keys = [], bkspcKey, nextKey;

let prompt, wordH, word = '';
let clicked = {
    1: false,
    2: false
}
let results = '', resultsH;

let socket = io('/output');
socket.on('connect', function () {
  console.log("Connected");
});


function setup() {
    createCanvas(1280, 720);
    background(235);
    textSize(20);

    // intialize prompt and word
    prompt = select('#prompt');
    let promptIndex = Math.floor(Math.random() * prompts.length);
    prompt.html(prompts[promptIndex]);
    prompts.splice(promptIndex, 1);

    wordH = select('#word');
    resultH = select('#results')

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
    bkspcKey = {
        x: 30,
        y: 30
    };

    nextKey = {
        x: width - 240,
        y: height - 320
    }

    // s~ o~ c~ k~ e~ t~ s~
    socket.on('mouseX', function (message) {
        cursor.x = message.x * windowWidth;
    });

    socket.on('mouseY', function (message) {
        cursor.y = message.y * windowHeight;
    });

    socket.on('click', (data) => {
        console.log(data.u + ' clicked');
        clicked[data.u] = true;
        if (clicked[1] == true && clicked[2] == true) {
            bothClick();
        }
    })

}

function draw() {
    // cursor.x = mouseX;
    // cursor.y = mouseY;

    background(235);

    // draw keys
    keys.forEach((key) => {
        fill(255);
        rect(key.x, key.y, keySize, keySize);
        fill(0);
        text(key.char, key.x + 8, key.y + 24);
    });

    // draw backspace
    fill(255);
    rect(bkspcKey.x, bkspcKey.y, keySize * 2.5, keySize);
    fill(0);
    text('backspace', bkspcKey.x + 8, bkspcKey.y + 24);

    // draw next
    fill(255);
    rect(nextKey.x, nextKey.y, keySize * 2.5, keySize);
    fill(0);
    text('next', nextKey.x + 8, nextKey.y + 24);


    fill('blue');
    ellipse(cursor.x, cursor.y, 12, 12);
}

function bothClick() {
    keys.forEach((key) => {
        if (collidePointRect(cursor.x, cursor.y, key.x, key.y, keySize, keySize)) {
            word += key.char;
            wordH.html(word);
        }
    });

    if (collidePointRect(cursor.x, cursor.y, bkspcKey.x, bkspcKey.y, keySize * 2.5, keySize)) {
        console.log('backspace');
        word = word.slice(0, -1);
        wordH.html(word);
    }
    
    if (collidePointRect(cursor.x, cursor.y, nextKey.x, nextKey.y, keySize * 2.5, keySize)) {
        
        if (prompts.length != 0) {
            console.log(prompt.html() + ' --- ' + word);
            results = results + prompt.html() + ' --- ' + word + '<br>';
            resultsH.html(results);
            
            let promptIndex = Math.floor(Math.random() * prompts.length);
            prompt.html(prompts[promptIndex]);
            prompts.splice(promptIndex, 1);

            

            word = '';
            wordH.html(word);
            

    
        } else {
            prompts.html('no more prompts left :(');
        }
    }

    clicked[1] = false;
    clicked[2] = false;
}