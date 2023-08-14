var highscores = document.querySelector("#highscores");
var time = document.querySelector("#timer");
var submit = document.querySelector(".submit-button");
var initials = document.querySelector("#initials");
var initialsText = document.querySelector("#enter-initials")
var questionTitle = document.querySelector(".title-questions");
var answerList = document.querySelector("#answers");
var text = document.querySelector("#starting-text");
var index = 0;

var secondsLeft = 59;

initialsText.style.display = "none";
initials.style.display = "none";

// need to hide in css so the space is still reserved for timer
function setTimer() { 
    var timerSet = setInterval(function() {
        time.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft === 0) {
            clearInterval(timerSet);
            // need to end game when timer ends
        }

    }, 1000);
}


var QandA = [{question: "Which data type is NOT normally used in JavaScript?", answers: ["boolean", "string", "object", "dictionary"], correct: "dictionary"}, 
            {question: "What keyword is used to declare a variable?", answers: ["function", "var", "int", "for"], correct: "var"}, 
            {question: "Which of the following is a correct way to declare a function named 'function1'?", answers: ["function function1()", "var(function1)", "function = function1()", "var = function1()"], correct: "function function1()"}, 
            {question: "Which character is used to separate array items?", answers: [":", ",", "-", "."], correct: ","}]



var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

// function answerClick(click) {
//     click.stlye.border = "2px solid blue";
// } This is supposed to turn the border on of the chosen answer

// need to finish this function
function pressSubmit(event) {
    if (submit.value === "Start Game") {
        submit.value = "Submit";
        text.textContent = "";
        setTimer();
    }

    if (index < QandA.length) {
        questionTitle.textContent = QandA[index].question;
        answer1.textContent = QandA[index].answers[0];
        answer2.textContent = QandA[index].answers[1];
        answer3.textContent = QandA[index].answers[2];
        answer4.textContent = QandA[index].answers[3];
        index += 1;

      
        


    }
    else {
        endGame();
        // end of game screen here
    }
}

function endGame() {
    answerList.textContent = "";
    questionTitle.textContent = "Game Over!";
    text.textContent = "Your final score is _______";
    initialsText.style.display = "inline";
    initials.style.display = "inline";
}

    

submit.addEventListener("click", pressSubmit);





// need to make buttons numbered and clickable
// keep track of score
// keep track of high scores
// better styling
