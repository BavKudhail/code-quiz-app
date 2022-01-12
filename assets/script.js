var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer-text");
var scoreEl = document.getElementById("score-text");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");

startBtn.addEventListener("click", startGame)

var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [ 
            { option: "<js>", correct: false },
            { option: "<javascript>", correct: false },
            { option: "<script>", correct: true },
            { option: "<scripted>", correct: false }
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            { option: "alertBox('Hello World');", correct: false},
            { option: "msgBox('Hello World');", correct: false},
            { option: "msg('Hello World');", correct: false},
            { option: "alert('Hello World');", correct: false}
        ]
    }
]






function startGame(){
    console.log("game has started");

    startBtn.classList.add("hide");
    questionContainerEl.classList.remove("hide");

    setNextQuestion()

}

function setNextQuestion(){
    questionEl.innerText = questions[0].question

}

// setNextQuestion



// selectAnswer