 window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }
// script.js
const questionArea = document.getElementById('question-area');
const answersArea = document.getElementById('answers');
const scoreArea = document.getElementById('score-area');
const scoreSpan = document.getElementById('score');
const helpArea = document.getElementById('help-area');
const timerSpan = document.getElementById('timer'); 
const moneyArea = document.getElementById('money-area'); 
const moneySpan = document.getElementById('money'); 

// База вопросов 
const questions = [
    {
        question: "Какая из этих функций используется для проверки типа переменной в JavaScript?",
        answers: ["typeof()", "isType()", "checkType()", "getDatatype()"],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Что такое “closure” (замыкание) в JavaScript?",
        answers: ["Функция, которая возвращает другую функцию.", "Функция, которая может получить доступ к переменным из внешней области видимости.", "Функция, которая создает новый объект.", "Функция, которая вызывается только один раз."],
        correctAnswer: 1,
        money: 300
    },
    {
        question: "Как вы создаете объект в JavaScript?",
        answers: ["var myObject = {}", "new Object()", "create_object()", "Все вышеперечисленные варианты верны"],
        correctAnswer: 3,
        money: 300
    },
    {
        question: "Что такое “prototype” (прототип) в JavaScript?",
        answers: ["Шаблон для создания объектов.", "Функция, которая определяет методы объекта.", "Свойство объекта, которое хранит его значение.", "Способ создания новых объектов."],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Какая команда в JavaScript используется для добавления элемента в конец массива?",
        answers: ["push()", "add()", "append()", "insert()"],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Что такое “superglobal” массивы в PHP?",
        answers: ["Массивы, которые содержат информацию о сервере.", "Массивы, доступные во всех областях видимости скрипта.", "Массивы, которые используются для хранения сессий.", "Массивы, которые используются для хранения данных форм."],
        correctAnswer: 1,
        money: 300
    },
    {
        question: "Какая функция в PHP используется для проверки, является ли переменная массивом?",
        answers: ["checkArray()", "isArray()", "is_array()", "getType()"],
        correctAnswer: 2,
        money: 300
    },
    {
        question: "Как вы используете оператор “ternary” (условный оператор) в PHP?",
        answers: ["condition ? value_if_true : value_if_false", "if (condition) { value_if_true } else { value_if_false }", "switch (condition) { ... }", "case (condition) { ... }"],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Какая функция в PHP используется для подключения к базе данных MySQL?",
        answers: ["db_connect()", "mysql_connect()", "mysqli_connect()", "connectToDatabase()"],
        correctAnswer: 2,
        money: 300
    },
    {
        question: "Как вы можете включить файл PHP в другой файл?",
        answers: ["include()", "require()", "load()", "import()"],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Какая функция в PHP используется для вывода HTML-кода с помощью PHP?",
        answers: ["echo", "print", "html()", "writeHTML()"],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Что такое “session” (сессия) в PHP?",
        answers: ["Способ хранения информации о пользователе на сервере.", "Способ хранения данных в файловой системе.", "Способ отправки данных на сервер.", "Способ получения данных с сервера."],
        correctAnswer: 0,
        money: 300
    },
    {
        question: "Какая функция в PHP используется для очистки строки от пробелов?",
        answers: ["removeSpaces()", "clean()", "trim()", "stripSpaces()"],
        correctAnswer: 2,
        money: 300
    },
    {
        question: "Как вы можете получить доступ к параметрам URL в PHP?",
        answers: ["$_GET", "$_POST", "$_REQUEST", "Все вышеперечисленные варианты верны"],
        correctAnswer: 3,
        money: 300
    },
    {
        question: "Что такое “namespace” (пространство имен) в PHP?",
        answers: ["Способ группировки классов и функций.", "Способ создания нового класса.", "Способ определения области видимости переменных.", "Способ создания нового файла."],
        correctAnswer: 0,
        money: 300
    },
];

let currentQuestion = 0;
let score = 0;
let currentMoney = 0; 
let fiftyFiftyUsed = false; 
let callFriendUsed = false; 
let audiencePollUsed = false; 
let timerInterval; 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayQuestion() {
    shuffleArray(questions);
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    question.answers.forEach((answer, index) => {
        document.getElementById(`answer${index + 1}`).textContent = answer;
    });

    // Сбрасываем стили кнопок (если использовали 50/50)
    for (let i = 0; i < 4; i++) {
        document.getElementById(`answer${i + 1}`).style.display = 'block'; 
    }

    // Включаем кнопки помощи
    document.getElementById('fifty-fifty').disabled = false; 
    document.getElementById('call-friend').disabled = false;
    document.getElementById('audience-poll').disabled = false;

    // Запускаем таймер
    startTimer(60); 
}

// Функция для запуска таймера
function startTimer(seconds) {
    let timeLeft = seconds;
    timerSpan.textContent = timeLeft; 

    timerInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Время вышло!  Переходим к следующему вопросу.");
            checkAnswer(-1); 
        }
    }, 1000); 
}

// Функция для проверки ответа
function checkAnswer(selectedAnswer) {
    clearInterval(timerInterval); // Останавливаем таймер при ответе
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        alert("Правильно!  Продолжаем...");
        // ОБНОВИТЬ currentQuestion  ЗДЕСЬ
        currentQuestion++;  
        if (currentQuestion < questions.length) {
            displayQuestion(); // Отображаем следующий вопрос
        } else {
            // Конец игры
            alert(`Поздравляем! Вы выиграли ${currentMoney} рублей!`);
        }
    } else {
        //  Неправильный ответ
        alert(`Неправильно!  Вы заработали ${currentMoney} рублей.`);
        //  Логика для перезапуска игры (например, начать заново)
        currentQuestion = 0; // Возвращаемся к первому вопросу
        score = 0;          // Сбрасываем счет
        currentMoney = 0; // Сбрасываем деньги
        displayQuestion();  // Отображаем первый вопрос
    }
}

// Функция для 50/50
function fiftyFifty() {
    if (!fiftyFiftyUsed && questions[currentQuestion].answers.length > 2) { 
        const correctAnswerIndex = questions[currentQuestion].correctAnswer;
        let wrongAnswerIndex;
        // Выбираем случайный неправильный ответ
        do {
            wrongAnswerIndex = Math.floor(Math.random() * 4); 
        } while (wrongAnswerIndex === correctAnswerIndex);

        // Скрываем два неправильных ответа
        for (let i = 0; i < 4; i++) {
            if (i !== correctAnswerIndex && i !== wrongAnswerIndex) {
                document.getElementById(`answer${i + 1}`).style.display = 'none';
            }
        }

        // Отключаем кнопку 50/50
        document.getElementById('fifty-fifty').disabled = true;
        fiftyFiftyUsed = true; 
    } else {
        alert("50/50 уже использовано!");
    }
}

// Функция для "звонка другу"
function callFriend() {
    if (!callFriendUsed) {
        // Логика для "звонка другу" (например, вывести случайный ответ)
        const randomAnswerIndex = Math.floor(Math.random() * 4);
        alert("Друг говорит: " + questions[currentQuestion].answers[randomAnswerIndex]);

        // Отключаем кнопку
        document.getElementById('call-friend').disabled = true;
        callFriendUsed = true;
    } else {
        alert("Звонок другу уже использован!");
    }
}

// Функция для "помощи зала"
function audiencePoll() {
    if (!audiencePollUsed) {
        // Логика для "помощи зала" (например, вывести результаты опроса)
        const pollResults = [
            { answer: questions[currentQuestion].answers[0], percentage: 20 },
            { answer: questions[currentQuestion].answers[1], percentage: 50 },
            { answer: questions[currentQuestion].answers[2], percentage: 15 },
            { answer: questions[currentQuestion].answers[3], percentage: 15 }
        ];
        alert("Результаты опроса зала:\n" + pollResults.map(result => `${result.answer}: ${result.percentage}%`).join("\n"));

        // Отключаем кнопку
        document.getElementById('audience-poll').disabled = true;
        audiencePollUsed = true;
    } else {
        alert("Помощь зала уже использована!");
    }
}

// Обработка кликов на кнопки ответов
answersArea.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const answerIndex = parseInt(event.target.id.replace('answer', '')) - 1;
        checkAnswer(answerIndex);
    }
});

// Обработка кликов на кнопки помощи
const fiftyFiftyButton = document.getElementById('fifty-fifty');
fiftyFiftyButton.addEventListener('click', fiftyFifty);

const callFriendButton = document.getElementById('call-friend');
callFriendButton.addEventListener('click', callFriend);

const audiencePollButton = document.getElementById('audience-poll');
audiencePollButton.addEventListener('click', audiencePoll);

// Инициализация игры
displayQuestion();