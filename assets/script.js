// below are all of the id's stored in variables that I need to be selected to use in the logic of this code
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

// this gives each answer something to compare to when submit is pressed. If the answer's style is the same as this, then that answer was submitted.
var selectedStyle = "blue";

// this keeps track of the question the user is on
var index = 0;

// this holds the number the timer is counting down from
var secondsLeft = 59;

// this keeps track of the user's score
var score = 0;

// this is a list of objects. Each objest holds a question, a list of 4 answers, and the correct answer
var QandA = [
            {question: "How many sharps are there in the key of D major", answers: ["0", "1", "2", "3"], correct: "2"}, 
            {question: "Which of these pairs of keys have the same key signature?", answers: ["G major/e minor", "D major/e minor", "F major/f minor", "B major/c# minor"], correct: "G major/e minor"}, 
            {question: "How many flats are in the key of E flat?", answers: ["0", "1", "2", "3"], correct: "3"}, 
            {question: "How many sharps are in the key of C# minor", answers: ["0", "2", "4", "6"], correct: "4"},
            {question: "What is correct order of major keys starting with 0 sharps and ending with 7 sharps?", answers: ["C, F, B, E#, A#, D#, G#, C#", "C, G, D, A, E, B, F#, C#", "F, C, G, D, A, E, B, f#", "C, E, G, B, D, F, A, C#"], correct: "C, G, D, A, E, B, F#, C#"}
            ];


// this makes a list of the possible answers using querySelector to select by id
var listAnswers = [document.querySelector("#answer1"), document.querySelector("#answer2"), document.querySelector("#answer3"), document.querySelector("#answer4")];


// this function starts and stops the timer and triggers the endgame() function
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

// this function changes the text color of a clicked multiple choice answer
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

// this function displays the questions and answers. 
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

// this function provides the logic for the actual quiz. If the correct answer is selected and submit is pressed, the score adds 10 points.
// If the wrong answer is submitted, 10 seconds of time is removed from the timer.
// This also changes the index that keeps track of which question the user is on. It then triggers the gamePlay() function that displays the next question.
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

// This function displays the first question when the button is clicked on the opening page. It hides the content of the opening page
// It also triggers the setTimer() function to start the clock
function pressStart(event) {
    text.textContent = "";
    setTimer();
    gamePlay();
    start.style.display = "none";
    submit.style.display = "inline";
    answerList.style.display = "inline-block";
    }
    

// This function displays the end game screen. It also triggers the function that stores the high score.
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

// this function stores the highscore if the score is higher than the current highscore, or if no highscore has been submitted yet
// it then triggers the function that goes to restart page
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

// This function displays the final page of the quiz.
// I didn't preventDefault on this submit button because I want the page to refresh when pressed. That is its only purpose.
function askRestart() {
    wrongOrRight.textContent = "";
    restart.style.display = "inline";
    initials.style.display = "none";
    initialsText.style.display = "none";
    enter.style.display = "none";
    questionTitle.textContent = "Would you like to try again?";
    text.textContent = "Press button to start the quiz.";
    
}

// This function shows the popover when the "View Highscore" button is pressed. 
// It displays the current highscore and initials that go with it.
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

// The code below hides all of the content that is not on the opening page of the quiz.
// The display of each of these changes to be visible when needed inside of the functions above
answerList.style.display = "none";
initialsText.style.display = "none";
initials.style.display = "none";
submit.style.display = "none";
enter.style.display = "none";
restart.style.display = "none";
    
// The event listeners below are for the two buttons on the opening page. The highscore button at the top left, and the start button at the bottom of the form
start.addEventListener("click", pressStart);
highscores.addEventListener("click", showHighScore);