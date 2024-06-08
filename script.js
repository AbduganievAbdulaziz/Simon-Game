var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userPattern = [];
var level = 1;

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(colour){
    $('#' + colour).addClass('pressed');
    setTimeout(function(){
        $('#' + colour).removeClass('pressed');
    }, 100);
}

function nextSequence(){
    $('h1').text('Level ' + level);
    let randomNumber = Math.floor(Math.random() * 10)%4;
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    userPattern = [];
}

function checkPattern(){
    let isCorrect = true;
    for(var i = 0; i < userPattern.length; i++)
        if(gamePattern[i] !== userPattern[i])
            isCorrect = false;
    if(isCorrect){
        if(userPattern.length == gamePattern.length)
            setTimeout(nextSequence, 1000);
    }
    else
        gameOver();
}

function gameOver(){
    $('h1').text('Game over, Press any key to restart');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
    }, 100);
}

$('.btn').click(function(){
    let userChosenColour = $(this).attr('id');
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userPattern.push(userChosenColour);
    checkPattern();
});

$(document).keydown(function(){
    level = 1;
    gamePattern = [];
    nextSequence();
});