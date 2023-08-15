var highscores = document.querySelector("#highscores");
var time = document.querySelector("#timer");
var start = document.querySelector("#start-button");
var submit = document.querySelector("#submit-button");
var enter = document.querySelector("#enter");
var initials = document.querySelector("#initials");
var initialsText = document.querySelector("#enter-initials")
var questionTitle = document.querySelector(".title-questions");
var answerList = document.querySelector("#answers");
var text = document.querySelector("#starting-text");
var index = 0;
var secondsLeft = 59;
var score = 0;

var QandA = [{question: "Which data type is NOT normally used in JavaScript?", answers: ["boolean", "string", "object", "dictionary"], correct: "dictionary"}, 
            {question: "What keyword is used to declare a variable?", answers: ["function", "var", "int", "for"], correct: "var"}, 
            {question: "Which of the following is a correct way to declare a function named 'function1'?", answers: ["function function1()", "var(function1)", "function = function1()", "var = function1()"], correct: "function function1()"}, 
            {question: "Which character is used to separate array items?", answers: [":", ",", "-", "."], correct: ","}]

var listAnswers = [document.querySelector("#answer1"), document.querySelector("#answer2"), document.querySelector("#answer3"), document.querySelector("#answer4")];



function setTimer() { 
    var timerSet = setInterval(function() {
        time.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft === 0) {
            clearInterval(timerSet);
            endGame();
            // need to end game when timer ends
        }

    }, 1000);
}

function answerClick(click) {
    for (var i=0; i<listAnswers.length; i++) {
        if (listAnswers[i] === click) {
            listAnswers[i].style.border = "2px solid purple";
        }
        else {
            listAnswers[i].style.border = "0px";
        }

    }  
}

function gamePlay() {
    if (index<QandA.length){
    questionTitle.textContent = QandA[index].question;

        for (var i=0; i<listAnswers.length; i++) {
            listAnswers[i].textContent = QandA[index].answers[i];
        }
    }
    else {
        endGame();
    }
    
    submit.addEventListener("click", pressSubmit);
    answerClick();
}

function pressSubmit(event) {
    if (index<QandA.length){    

        for (var i=0; i<listAnswers.length; i++) {
            if ((listAnswers[i].textContent === QandA[index].correct) && (listAnswers[i].style.border === "2px solid purple")) {
                score += 10
                
            }
            else if ((listAnswers[i].textContent === QandA[index].correct) && (listAnswers[i].style.border !== "2px solid purple")) {
                secondsLeft -= 10;
            }
                
        }
        index++;
        gamePlay();
    }
}   

function pressStart(event) {
    text.textContent = "";
    setTimer();
    gamePlay();
    start.style.display = "none";
    submit.style.display = "inline";
    answerList.style.display = "inline-block";
    }
    

function endGame() {
    submit.style.display = "none";
    answerList.textContent = "";
    questionTitle.textContent = "Game Over!";
    text.textContent = "Your final score is " + score;
    initialsText.style.display = "inline";
    initials.style.display = "inline";
    enter.style.display = "inline";
    setHighScore();
}



function setHighScore() {
    var high = {initials:"", finalScore: 0 };
    var parsed = JSON.parse(localStorage.getItem("high-score"));
    enter.addEventListener("click", function(){
        if (initials.value === ""){
            window.alert("Please enter your initials");
        }
        else {
            if (!(localStorage.getItem("high-score")) || (score > parsed.finalScore)){
                high.initials = initials.value;
                high.finalScore = score
                localStorage.setItem("high-score", JSON.stringify(high));
            }
        }
        
    })
}


answerList.style.display = "none";
initialsText.style.display = "none";
initials.style.display = "none";
submit.style.display = "none";
enter.style.display = "none";
    
start.addEventListener("click", pressStart);




// need to store selected answer and add it to score when submit is pressed VVVVV
// need to make buttons numbered and clickable VVVVV
// keep track of score VVVVV
// keep track of high scores VVVV
// better styling
// make the mouse a different selector when hovering over answers
// need to make "View Highscores" a button to show the highscore
// after entering the initials and highscore, ask the user if they want to play again. If yes, refresh page.
// need to make event listeners for the enter key. This is for all buttons