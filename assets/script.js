var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer-text");
var scoreEl = document.getElementById("score-text");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var optionEl = document.getElementById("option-buttons")
var headerEl = document.getElementById("header")

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
     {
        question: "How to write an IF statement in JavaScript?",
        options: [ 
            { option: "if i = 5 then", correct: false },
            { option: "if (i == 5)", correct: false },
            { option: "if i = 5", correct: true },
            { option: "if i == 5 then", correct: false },
        ]
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        options: [
            { option: "if i <> 5", correct: false},
            { option: "if (i !-5)", correct: false},
            { option: "if i =! 5 then", correct: false},
            { option: "if (i <> 5)", correct: true}
        ]
    },
    {
        question: "How does a FOR loop start?",
        options: [
            { option: "for i = 1 to 5", correct: true},
            { option: "for (i = 0; i < = 5)", correct: false},
            { option: "for (i <= 5; i++)", correct: false},
            { option: "for (i = 0; i <= 5; i++)", correct: true},
        ]
    },
     {
        question: "How can you add a comment in a JavaScript?",
        options: [
            { option: "'This is a comment'", correct: false},
            { option: "<!-- This is a comment -->", correct: true},
            { option: "<!== This is a comment ==>", correct: false},
            { option: "//This is a comment", correct: true},
        ]
    },
]

var maximumQuestions = questions.length
var currentQuestionIndex 

startBtn.addEventListener("click", startGame)


function startGame(){

    startBtn.classList.add("hide");
    currentQuestionIndex = 0;

    questionContainerEl.classList.remove("hide");
    headerEl.classList.remove("hide")

    getNextQuestion()

}

// Get the next question
function getNextQuestion(){
    resetDisplay()
    showQuestion(questions[currentQuestionIndex])

}

// Show questions on display
function showQuestion(x){
    questionEl.innerText = x.question
    x.options.forEach(Element => {
        
        var button = document.createElement('button')
        button.innerText = Element.option

        if (Element.correct) {
            button.dataset.correct = Element.correct
        }

        questionEl.appendChild(button)
        button.addEventListener('click', selectAnswer)
    })
}


// Remove previous buttons from display
function resetDisplay(){
    while (optionEl.firstChild) {
        optionEl.removeChild(optionEl.firstChild)
    }
}


// When user selects a button
function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct

    setClass(selectedButton, correct)

    Array.from(optionEl.children).forEach(button => {
        setClass(button, button.dataset.correct)
    })

    // If there are more questions remaining, getNextQuestion
    if (maximumQuestions > currentQuestionIndex + 1) {
        currentQuestionIndex++
        setInterval (getNextQuestion, 1000)
    // Else display options for restart
    } else {
        startBtn.innerText = "Restart"
        startBtn.classList.remove('hide')
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

