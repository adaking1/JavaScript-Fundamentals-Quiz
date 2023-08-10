var highscores = document.querySelector("#highscores");
var time = document.querySelector("#timer");
var submit = document.querySelector(".submit-button");
var question = document.querySelector(".title-questions");
var answers = document.querySelector("#answers");
var text = document.querySelector("#starting-text");
var index = 0;

var secondsLeft = 60;

function setTimer() { 
    var timerSet = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(setTimer);
        }

    }, 1000);
}

var questions = ["Which data type is NOT normally used in JavaScript?", "What keyword is used to declare a variable?",
"Which of the following is a correct way to declare a function?", "Which character is used to separate array items?"];
var answerList = [["Boolean", "String", "Object", "Variable", "Number"]];


console.log();
console.log();

// need to finish this function
function pressSubmit(event) {
    if (submit.value === "Start Game") {
        submit.value = "Submit";
        question.textContent = questions[index];
        text.textContent = "";
        answers.textContent = answerList[index];
        setTimer();
    }
    else if (questions[index] !== questions.length -1) {
        index += 1;
        question.textContent = questions[index];
    }

}

submit.addEventListener("click", pressSubmit);