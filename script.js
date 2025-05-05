const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const timerElement = document.getElementById('time');
const finalScoreElement = document.getElementById('final-score');
const saveScoreButton = document.getElementById('save-score-btn');
const initialsInput = document.getElementById('initials');

let shuffledQuestions, currentQuestionIndex;
let timeLeft = 60;
let timerId;
let score = 0;

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hot Mail', correct: false },
            { text: 'How To Make Lasagna', correct: false },
            { text: 'Home Tool Markup Language', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Lisbon', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Style Sheets', correct: false },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<js>', correct: false },
            { text: '<script>', correct: true },
            { text: '<javascript>', correct: false },
            { text: '<code>', correct: false }
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "script.js"?',
        answers: [
            { text: '<script href="script.js">', correct: false },
            { text: '<script name="script.js">', correct: false },
            { text: '<script src="script.js">', correct: true },
            { text: '<script file="script.js">', correct: false }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'msg("Hello World");', correct: false },
            { text: 'alertBox("Hello World");', correct: false },
            { text: 'msgBox("Hello World");', correct: false },
            { text: 'alert("Hello World");', correct: true }
        ]
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        answers: [
            { text: 'class', correct: false },
            { text: 'font', correct: false },
            { text: 'styles', correct: false },
            { text: 'style', correct: true }
        ]
    },
    {
        question: 'Which property is used to change the background color?',
        answers: [
            { text: 'color', correct: false },
            { text: 'bgcolor', correct: false },
            { text: 'background-color', correct: true },
            { text: 'backgroundColor', correct: false }
        ]
    },
    {
        question: 'Which CSS property controls the text size?',
        answers: [
            { text: 'font-style', correct: false },
            { text: 'text-size', correct: false },
            { text: 'font-size', correct: true },
            { text: 'text-style', correct: false }
        ]
    },
    {
        question: 'How do you call a function named "myFunction" in JavaScript?',
        answers: [
            { text: 'call myFunction()', correct: false },
            { text: 'call function myFunction()', correct: false },
            { text: 'myFunction()', correct: true },
            { text: 'myFunction', correct: false }
        ]
    },
    {
        question: 'How do you write an IF statement in JavaScript?',
        answers: [
            { text: 'if i == 5 then', correct: false },
            { text: 'if i = 5 then', correct: false },
            { text: 'if (i == 5)', correct: true },
            { text: 'if i == 5', correct: false }
        ]
    },
    {
        question: 'How does a WHILE loop start?',
        answers: [
            { text: 'while (i <= 10; i++)', correct: false },
            { text: 'while i = 1 to 10', correct: false },
            { text: 'while (i <= 10)', correct: true },
            { text: 'while (i < 10; i++)', correct: false }
        ]
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: [
            { text: '// This is a comment', correct: true },
            { text: '\' This is a comment', correct: false },
            { text: '<!-- This is a comment -->', correct: false },
            { text: '* This is a comment *', correct: false }
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            { text: 'var colors = "red", "green", "blue"', correct: false },
            { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
            { text: 'var colors = ["red", "green", "blue"]', correct: true },
            { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false }
        ]
    },
    {
        question: 'How do you round the number 7.25 to the nearest integer?',
        answers: [
            { text: 'Math.round(7.25)', correct: true },
            { text: 'Math.rnd(7.25)', correct: false },
            { text: 'round(7.25)', correct: false },
            { text: 'rnd(7.25)', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
saveScoreButton.addEventListener('click', saveScore);

function updateTimer() {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}


function startGame() {
    console.log("Quiz started");
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions  = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    timeLeft = 60;  // Reset timeLeft
    score = 0;  // Reset score
    timerId = setInterval(updateTimer, 1000);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    Array.from(answerButtons.children).forEach(button => {
        const isCorrect = button.dataset.correct === 'true';
        button.classList.add(isCorrect ? 'correct' : 'wrong');
        button.disabled = true;
    });

    if (!correct) {
        timeLeft -= 10;
    } else {
        score++;
    }

    currentQuestionIndex++;

    setTimeout(() => {
        if (currentQuestionIndex < shuffledQuestions.length && timeLeft > 0) {
            setNextQuestion();
        } else {
            endGame();
        }
    }, 800);
}


function endGame() {
    clearInterval(timerId);
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    finalScoreElement.innerText = score;
    console.log("Game over");
}

function saveScore() {
    const initials = initialsInput.value;
    if (initials) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { score, initials };
        highScores.push(newScore);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        console.log("Score saved");
    }
}