var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer-text");
var scoreEl = document.getElementById("score-text");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var optionEl = document.getElementById("option-buttons")

var currentQuestionIndex 

startBtn.addEventListener("click", startGame)

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
    }
]

function startGame(){

    startBtn.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");

    setNextQuestion()

}

function setNextQuestion(){

    showQuestion(questions[currentQuestionIndex])

}

function showQuestion(question){
    questionEl.innerText = question.question
    question.options.forEach(Element => {

        var button = document.createElement('button')
        button.innerText = Element.options

        if (Element.correct) {
            button.dataset.correct = Element.correct
        }

        button.addEventListener('click', selectAnswer)
        questionEl.appendChild(button)
    })
    
}
function selectAnswer(e){

}
