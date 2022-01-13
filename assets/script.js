// DOM variables
var startBtn = document.getElementById("start-btn");
var saveScoreBtnEl = document.getElementById("save-score-btn");
var restartBtn = document.getElementById("restart-btn");
var timerEl = document.getElementById("timer-text");
var scoreEl = document.getElementById("score-text");
var highScoreBtnEl = document.querySelector(".high-score-btn");
var homeContainerEl = document.getElementById("home-container");
var viewScoresBtn = document.getElementById("view-scores-btn");

var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var optionEl = document.getElementById("option-buttons")
var headerEl = document.getElementById("header")
var saveScoreEl = document.getElementById("save-score-container");
var messageEl = document.getElementById("answer-message");
var finalScoreEl = document.querySelector(".final-score-text");

var secondsLeft;

var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [ 
            { option: "<js>", correct: false },
            { option: "<javascript>", correct: false },
            { option: "<script>", correct: true },
            { option: "<scripted>", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            { option: "alertBox('Hello World');", correct: false},
            { option: "msgBox('Hello World');", correct: false},
            { option: "msg('Hello World');", correct: false},
            { option: "alert('Hello World');", correct: true}
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            { option: "function myFunction()", correct: true},
            { option: "function = myFunction()", correct: false},
            { option: "function => (myFunction)", correct: false},
            { option: "function :: myFunction()", correct: false},
        ]
    },
     {
        question: "How do you call a function named 'myFunction'?",
        options: [
            { option: "call myFunction()", correct: false},
            { option: "myFunction()", correct: true},
            { option: "call function myFunction()", correct: false},
            { option: "function => function()", correct: false},
        ]
    },
    //  {
    //     question: "How to write an IF statement in JavaScript?",
    //     options: [ 
    //         { option: "if i = 5 then", correct: false },
    //         { option: "if (i == 5)", correct: true },
    //         { option: "if i = 5", correct: false },
    //         { option: "if i == 5 then", correct: false },
    //     ]
    // },
    // {
    //     question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    //     options: [
    //         { option: "if i <> 5", correct: false},
    //         { option: "if (i !-5)", correct: false},
    //         { option: "if i (!==) 5 then", correct: true},
    //         { option: "if (i <> 5)", correct: false}
    //     ]
    // },
    // {
    //     question: "How does a FOR loop start?",
    //     options: [
    //         { option: "for i = 1 to 5", correct: false},
    //         { option: "for (i = 0; i < = 5)", correct: false},
    //         { option: "for (i <= 5; i++)", correct: false},
    //         { option: "for (i = 0; i <= 5; i++)", correct: true},
    //     ]
    // },
    //  {
    //     question: "How can you add a comment in a JavaScript?",
    //     options: [
    //         { option: "'This is a comment'", correct: false},
    //         { option: "<!-- This is a comment -->", correct: false},
    //         { option: "<!== This is a comment ==>", correct: false},
    //         { option: "//This is a comment", correct: true},
    //     ]
    // },
]
var points = 0

var maximumQuestions = questions.length
var currentQuestionIndex 


startBtn.addEventListener("click", startGame)

viewScoresBtn.addEventListener('click', viewScores)

// functions

function viewScores(){
    console.log("view high scores")
}

// starts the game
function startGame(){
    points = 0;
    secondsLeft = 60;
    currentQuestionIndex = 0;

    startBtn.classList.add("hide");
    viewScoresBtn.classList.add("hide");
    

    questionContainerEl.classList.remove("hide");
    headerEl.classList.remove("hide")
    saveScoreEl.classList.add("hide");

    getNextQuestion()
    setCountDown()
}

// Updates the display of the game
function updateDisplay(){
    scoreEl.innerText = points;
    timerEl.innerText = secondsLeft;

}

// Sets countdown timer
function setCountDown(){

    var countDown = setInterval(() => {

        if (secondsLeft > 0) {
            secondsLeft--;
        }
        else if (secondsLeft <= 0) {
            timerEl.style.color = "red"
            gameFinished()
        }

        updateDisplay()
        
    }, 1000);

}


// Gets the next question
function getNextQuestion(){
    resetDisplay()
    showQuestion(questions[currentQuestionIndex])

}


// Show the next question on screen
function showQuestion(x){

    questionEl.innerText = x.question
    x.options.forEach(Element => {
        
        var button = document.createElement('button')
        button.innerText = Element.option
        button.classList.add("opt-btn")

        if (Element.correct) {
            button.dataset.correct = Element.correct
        }

        questionEl.appendChild(button)
        button.addEventListener('click', selectAnswer)
    })

}



// Removes previous question from screen
function resetDisplay(){
    while (optionEl.firstChild) {
        optionEl.removeChild(optionEl.firstChild)
    }
    messageEl.textContent = " "
}


// When the user selects a button...
function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct

    var correctMessage = "correct"
    var incorrectMessage = "incorrect"

    setClass(selectedButton, correct)

    Array.from(optionEl.children).forEach(button => {
        setClass(button, button.dataset.correct)
    })

    // If there are more questions remaining, getNextQuestion
    if (maximumQuestions > currentQuestionIndex + 1) {
        currentQuestionIndex++
        setTimeout(getNextQuestion, 500)
    }   

    else if (currentQuestionIndex < maximumQuestions){
        gameFinished()
    }

    // changing points
    if (selectedButton.dataset.correct) {
        points = points + 100
        messageEl.textContent = correctMessage
        updateDisplay()
    } 
    
    else {
        points = points - 100
        secondsLeft = secondsLeft - 10
        messageEl.textContent = incorrectMessage
        updateDisplay()
    }
}


// If correct, add correct class. Else, add incorrect class.
function setClass(element, correct){
    clearClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}


// Remove classes
function clearClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

// If game is finished...
function gameFinished(){
    questionContainerEl.classList.add("hide");
    headerEl.classList.add("hide")

    restartBtn.classList.remove("hide")

    saveScoreEl.classList.remove("hide")

    finalScoreEl.textContent = "Your Final Score is " + points;
    saveScoreBtnEl.addEventListener('click', saveScore)
}

// Reloads the game when restart button is clicked
restartBtn.addEventListener('click', function(){
    location.reload()
})

function saveScore(event){
    event.preventDefault()

    var name = document.getElementById("name-input").value;
    var score = scoreEl.innerText

    localStorage.setItem("name", name);
    localStorage.setItem("score", score);

    location.reload()

}

