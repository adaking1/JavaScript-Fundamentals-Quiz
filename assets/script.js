var highscores = document.querySelector("#highscores");
var time = document.querySelector("#timer");
var start = document.querySelector("#start-button");
var submit = document.querySelector("#submit-button");
var enter = document.querySelector("#enter");
var restart = document.querySelector("#restart-button");
var initials = document.querySelector("#initials");
var initialsText = document.querySelector("#enter-initials")
var questionTitle = document.querySelector(".title-questions");
var answerList = document.querySelector("#answers");
var text = document.querySelector("#starting-text");
var wrongOrRight = document.querySelector("#correct-wrong");
var selectedStyle = "blue";
var index = 0;
var secondsLeft = 59;
var score = 0;

var QandA = [{question: "How many sharps are there in the key of D major", answers: ["0", "1", "2", "3"], correct: "2"}, 
            {question: "Which of these pairs of keys have the same key signature?", answers: ["G major/e minor", "D major/e minor", "F major/f minor", "B major/c# minor"], correct: "G major/e minor"}, 
            {question: "How many flats are in the key of E flat?", answers: ["0", "1", "2", "3"], correct: "3"}, 
            {question: "How many sharps are in the key of C# minor", answers: ["0", "2", "4", "6"], correct: "4"},
            {question: "What is correct order of major keys starting with 0 sharps and ending with 7 sharps?", answers: ["C, F, B flat, E flat, A flat, D flat, G flat, C flat", "C, G, D, A, E, B, F#, C#", "F, C, G, D, A, E, B, f#", "C, E, G, B, D, F, A, C#"], correct: "C, G, D, A, E, B, F#, C#"}];

var listAnswers = [document.querySelector("#answer1"), document.querySelector("#answer2"), document.querySelector("#answer3"), document.querySelector("#answer4")];



function setTimer() { 
    var timerSet = setInterval(function() {
        time.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft < 0) {
            time.textContent = 0;
            clearInterval(timerSet);
            endGame();
        }

    }, 1000);
}

function answerClick(click) {
    for (var i=0; i<listAnswers.length; i++) {
        if (listAnswers[i] === click) {
            listAnswers[i].style.color = selectedStyle;
        }
        else {
            listAnswers[i].style.color = "black";
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
        var answerChosen = false;
        listAnswers.forEach((option) => {
            if (option.style.color === selectedStyle) {
            answerChosen = true;
            }
        });

        if (!answerChosen) {
            return;
        }

        for (var i=0; i<listAnswers.length; i++) {
            
            if ((listAnswers[i].textContent === QandA[index].correct) && (listAnswers[i].style.color === selectedStyle)) {
                score += 10
                document.querySelector("#userScore").textContent = "Score: " + score;
                wrongOrRight.textContent = "Correct!"
                
            }
            else if ((listAnswers[i].textContent === QandA[index].correct) && (listAnswers[i].style.color !== selectedStyle)) {
                secondsLeft -= 10;
                wrongOrRight.textContent = "Wrong!"
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
    secondsLeft = 0;
    submit.style.display = "none";
    answerList.style.display = "none";
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
            if (!(localStorage.getItem("high-score"))) {
                high.initials = initials.value;
                high.finalScore = score
                localStorage.setItem("high-score", JSON.stringify(high));
            }
            else if ((parsed) && (score > parsed.finalScore)) {
                high.initials = initials.value;
                high.finalScore = score
                localStorage.setItem("high-score", JSON.stringify(high));
            }
            askRestart();
            
        }
        
        
    });
}

function showHighScore(event) {
    var pop = document.querySelector("#highscore-pop");
    var parsed = JSON.parse(localStorage.getItem("high-score"));
    if (!parsed) {
        pop.textContent = "No Highscore"
    }
    else {
        pop.textContent = "The highest score is: " + parsed.initials + " with " + parsed.finalScore + " points";
    }
    
}

function askRestart() {
    wrongOrRight.textContent = "";
    restart.style.display = "inline";
    initials.style.display = "none";
    initialsText.style.display = "none";
    enter.style.display = "none";
    questionTitle.textContent = "Would you like to play again?";
    text.textContent = "Press enter to start a new game.";
    
}


answerList.style.display = "none";
initialsText.style.display = "none";
initials.style.display = "none";
submit.style.display = "none";
enter.style.display = "none";
restart.style.display = "none";
    
start.addEventListener("click", pressStart);
highscores.addEventListener("click", showHighScore);

// need to fix where you lose time below 10 seconds. it goes negative, just need to end game