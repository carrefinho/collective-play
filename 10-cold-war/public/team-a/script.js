const socket = io('/team-a');

let actions;
let turn = false;
let op = [];
let opPer = [];
let opRecords = [];

socket.on('connect', _ => {
    console.log('connected to server');
})

socket.on('init', data => {
    for (let i = 0; i < data.opCount; i++) {
        op.push('B' + (i + 1));
    }
    opPer = op;

    actions = data.actions;
    actions.forEach(action => {
        $('#us > div > div.action.a2 > select').append(new Option(action.text, action.value));
    })
})

socket.on('your-turn', _ => {
    console.log("it's your turn!");
    turn = true;
    $('#us').removeClass('disabled');
    $('#go').prop('disabled', false);
    $('#done').prop('disabled', true);
    if (!$('#them').hasClass('disabled')) $('#them').addClass('disabled');

    let recIndex = Math.floor(Math.random() * op.length);
    $('#us > div > div.action.a1').html(op[recIndex]);
    op.splice(recIndex, 1);
    $('#us > div > div.action.a3').html(opPer[Math.floor(Math.random() * op.length)]);

    let action = actions.find(obj => obj.value === $('#us > div > div.action.a2 > select').val());
    let mod = action.mod;
    let unit = action.unit;
    
    $('#us > div > div.action.a4').html("for " + mod[Math.floor(Math.random() * mod.length)] + unit);
})

socket.on('wait', _ => {
    console.log("wait for them");
    turn = false;
    if (!$('#us').hasClass('disabled')) $('#us').addClass('disabled');
    if (!$('#them').hasClass('disabled')) $('#them').addClass('disabled');
    $('#go').prop('disabled', true);
    $('#done').prop('disabled', true);
})

socket.on('their-turn', _ => {
    console.log("their turn!");
    turn = false;
    $('#them').removeClass('disabled');
    $('#done').prop('disabled', false);
    if (!$('#us').hasClass('disabled')) $('#us').addClass('disabled');
})

socket.on('do', data => {
    console.log('actions given!');
    $('#them > div > div.action.a1').html(data.recipient);
    console.log(actions.find(obj => obj.value === data.action));
    $('#them > div > div.action.a2').html(actions.find(obj => obj.value === data.action).text);
    $('#them > div > div.action.a3').html(data.perpetrator);
    $('#them > div > div.action.a4').html(data.modifier);
})

$(document).ready(_ => {
    $('#go').click(_ => {
        console.log('go');
        if (turn) {
            socket.emit('go', {
                recipient: $('#us > div > div.action.a1').html(),
                action: $('#us > div > div.action.a2 > select').val(),
                perpetrator: $('#us > div > div.action.a3').html(),
                modifier: $('#us > div > div.action.a4').html()
            })
        }
    })

    $('#done').click(_ => {
        console.log('go');
        if (!turn) {
            socket.emit('done');
        }
    })

    $('#us > div > div.action.a2 > select').change(_ => {
        let action = actions.find(obj => obj.value === $('#us > div > div.action.a2 > select').val());
        let mod = action.mod;
        let unit = action.unit;
    
        $('#us > div > div.action.a4').html("for " + mod[Math.floor(Math.random() * mod.length)] + unit);
    })
});


