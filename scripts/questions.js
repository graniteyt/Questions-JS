// тут лежат вопросы / questions
let questions = [{
    id: 1,
    question: 'Какой самый популярный JavaScript фреймворк?',
    answers: ['Angular', 'Vue', 'React', 'NextJS'],
    current: 2
}, {
    id: 2,
    question: 'Кто такой Линус  Торвальдс?',
    answers: ['Создатель Windows', 'Создатель FreeBSD', 'Создатель Linux'],
    current: 2
}, {
    id: 3,
    question: 'Как называется надстройка над JavaScript со строгой типизацией?',
    answers: ['TypeScript', 'NodeJS', 'Java'],
    current: 0
},
{
    id: 4,
    question: "На чём основан JavaScript?",
    answers: ['C', 'Java', 'C++'],
    current: 1
}]

// localStorage.setItem('key', JSON.stringify(questions));
// console.log(localStorage.getItem('key'))



// тут лежат переменные / variables
let lengthArray, index = 0, score = 0;


if (document.getElementById('container')) {
    localStorage.getItem('key', JSON.stringify(questions));
    questions = JSON.parse(localStorage.getItem('key'));
    // console.log(questionsFromStorage);
    lengthArray = questions.length;
    showQ(index)
}

// тут функция показа вопроса (наверное) / show question function
function showQ(n) {
    document.getElementById('question').innerHTML = `
            <p class="quest">${questions[n].question}</p>`
    let qS = questions[n].answers
    for (let i = 0; i < qS.length; i++)
        document.querySelector('#container ul').innerHTML +=
            `<li onclick=func(${i})>${qS[i]}</li>`
}

// переход на следущий вопрос
function func(m) {
    if (m == questions[index].current)
        score++;
    ++index;

    if (index < lengthArray) {
        console.log(index)
        document.getElementById('question').innerHTML = ''
        document.querySelector('#container ul').innerHTML = ''
        showQ(index)
    }
    else {
        finish()
    }
}

//  функция окончания

function finish() {
    document.getElementById('container').innerHTML = `<div id="result">
                <p id = "theEnd" > Вы набрали: ${score} / ${questions.length} </p>
                    <img id="js" src="https://www.datocms-assets.com/48401/1628644950-javascript.png?auto=format&fit=max&w=1200"
                        alt="JavaScript">
                        <p id="recommendations">${whoAreWho(score, questions.length)}</p>
                    </div>`
}

//  функция определения правильных ответов
//  n - кол-во правильных ответов, m - количество вопросов
function whoAreWho(n, m) {
    let procent = n / m;
    if (procent == 1)
        return `Вы гений! <br> Вы ответили на все вопросы`
    else if (procent < 0.34) {
        return `К сожалению все печально. Учи материал`
    }
    else {
        return `В целом неплохо`
    }
}

// функционал добавления вопросов
if (document.querySelector('form')) {
    const selfMadeQuestion = document.getElementById('selfMadeQuestion')
    const variant = document.getElementById('variant')
    const addAnswer = document.getElementById('addAnswer')
    const current = document.getElementById('current')
    const addQuestion = document.getElementById('addQuestion')
    let i = 3, nAnswer = 1;

    addAnswer.onclick = function () {
        if (nAnswer < 5) {
            let createInput = document.createElement('input')
            createInput.placeholder = 'Введите вариант ответа'
            variant.append(createInput)
            nAnswer++;
            if (nAnswer === 5) {
                addAnswer.remove();
            }
        }
    }

    addQuestion.onclick = function () {
        let plusedAnswers = document.querySelectorAll('fieldset input')
        console.log(plusedAnswers)

        const an = [];

        for (let i = 0; i < plusedAnswers.length; i++) {
            if (plusedAnswers[i].value != '')
                an[i] = plusedAnswers[i].value
        }


        if (selfMadeQuestion.value != '' && current.value != '') {
            const newObject = {}
            newObject.question = selfMadeQuestion.value;
            newObject.answers = an;
            newObject.current = current.value - 1;
            newObject.id = i++;
            questions.push(newObject)
            localStorage.setItem('key', JSON.stringify(questions));
            console.log(questions)
        }
    }
}