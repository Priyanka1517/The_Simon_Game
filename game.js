var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level=0;

/////////////////keypress////////////
$(document).keypress(function(){
    if (!started){
        $('#level-title').text("Level "+ level);
        nextSequence();
        started= true;
    }
});
///////////// USer Chosen Colour/////////
$('.btn').click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//////////////////checking ans///////////////////
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){  
        console.log("success") ;
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("GameOVer");
    }
}


/////////////////Random Color Execution///////////////
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

        /////////////////////////flash////////////////////////////////
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        /*or
        setInterval(()=>{
            $("#"+randomChosenColour).fadeIn();
            $("#"+randomChosenColour).fadeOut();
        },500);  */

        ///////////////////////sound/////////////////////////////////
        playSound(randomChosenColour);

}

/////////////Sound ////////
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}  

