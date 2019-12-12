const socket = io('/team-a');

let turn = false;

socket.on('connect', _ => {
    console.log('connected to server');
})

socket.on('your-turn', _ => {
    console.log("it's your turn!");
    turn = true;
    $('#us').removeClass('disabled');
    $('#go').prop('disabled', false);
    if (!$('#them').hasClass('disabled')) $('#them').addClass('disabled');
})

socket.on('their-turn', _ => {
    console.log("their turn!");
    turn = false;
    $('#them').removeClass('disabled');
    $('#go').prop('disabled', true);
    if (!$('#us').hasClass('disabled')) $('#us').addClass('disabled');
})

socket.on('do', data => {
    console.log('actions given!');
})

$(document).ready(_ => {

    $('#go').click(_ => {
        console.log('go');
        if (turn) {
            socket.emit('go', {
                recipient: $('#us > div > div.action.a1').html(),
                action: $('#us > div > div.action.a2 option:selected').text(),
                perpetrator: $('#us > div > div.action.a3').html(),
                modifier: $('#us > div > div.action.a4').html()
            })
        }
    })


});


