const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const quizzes = [];
let indiceQuizzSelecionado = null;
let questionsAnswered = 0;
let correctAnswers = 0;

function showQuizzes(promessa) {
    const elementoQuizz = document.querySelector(".quizzes-list");
    elementoQuizz.innerHTML = "";

    for (let i = 0; i < promessa.data.length; i++) quizzes.push(promessa.data[i]);

    for (let i = 0; i < quizzes.length; i++) {
        elementoQuizz.innerHTML += `<div class="quizz" 
        id="${quizzes[i].id}" onclick="selectQuizz(this)">
            <p>
                ${quizzes[i].title} 
            </p>
        </div>`;
    }

    const elementos = document.querySelectorAll(".quizz");

    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundImage = `linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8))
        , url(${quizzes[i].image})`;
        elementos[i].style.backgroundSize = "320px 180px";
    }
}

function getQuizzes() {
    const promessa = axios.get(`${URL_API}/quizzes`);
    promessa.then(showQuizzes);
}

function scrollQuestion() {
    document.querySelectorAll('.quizz-question')[questionsAnswered].scrollIntoView({
        block: "end",
        inline: "start",
        behavior: "smooth"
    })
}

function resultCalc(result) {
    
    let indexResultLevel = 0;
    for (let i = quizzes[indiceQuizzSelecionado].levels.length - 1; i >= 0; i--) {
        if (quizzes[indiceQuizzSelecionado].levels[i].minValue <= result) {
            return indexResultLevel = i;
        }
    }
}

function finishQuizz() {
    if (questionsAnswered == quizzes[indiceQuizzSelecionado].questions.length) {
        const quizzSelected = document.querySelector('.quizz-selected');
        let result = (correctAnswers / questionsAnswered).toFixed(2) * 100;
        const indexResultLevel = resultCalc(result);
                
        
        quizzSelected.innerHTML += `
        <div class="quizz-question hidden">
            <div class="quizz-question-title">
                <h1 data-identifier="quizz-result">
                    ${result}% de acerto:
                    ${quizzes[indiceQuizzSelecionado].levels[indexResultLevel].title}
                </h1>
            </div>
            <div class="quizz-selected-images">
                <div class="quizz-selected-option">
                </div>
                <p>
                </p>
            </div>
        </div>`;
        const quizzFinish = document.querySelectorAll('.quizz-selected-images');

        quizzFinish[quizzFinish.length - 1].classList.add('quizz-finish');
        quizzFinish[quizzFinish.length - 1].style.height = "100%";
        quizzFinish[quizzFinish.length - 1].style.width = "98%";

        quizzFinish[quizzFinish.length - 1].firstElementChild.style.backgroundImage = `url(${quizzes[indiceQuizzSelecionado].levels[indexResultLevel].image})`;
        quizzFinish[quizzFinish.length - 1].firstElementChild.style.backgroundSize = "100% 100%";
        quizzFinish[quizzFinish.length - 1].firstElementChild.style.height = "95%";
        
        quizzFinish[quizzFinish.length - 1].firstElementChild.nextElementSibling.innerHTML =
            `${quizzes[indiceQuizzSelecionado].levels[indexResultLevel].text}`;
        
        quizzFinish[quizzFinish.length - 1].previousElementSibling.style.height = "100px";
        quizzFinish[quizzFinish.length - 1].previousElementSibling.style.width = "98%";
        quizzFinish[quizzFinish.length - 1].parentNode.style.height = "320px";
        
        setTimeout(() => document.querySelectorAll('.quizz-question')[questionsAnswered].classList.remove('hidden'), 2000);
        setTimeout(scrollQuestion, 2000);
    }
}
    
function verifyAnswer(seletor) {

    let correctAnswerIndex = null;
    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions[questionsAnswered].answers.length; i++)
        if (quizzes[indiceQuizzSelecionado].questions[questionsAnswered].answers[i].isCorrectAnswer)
            correctAnswerIndex = i;
    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions[questionsAnswered].answers.length; i++) {
        if (quizzes[indiceQuizzSelecionado].questions[questionsAnswered].answers[correctAnswerIndex].text ==
            seletor.parentNode.children[i].firstElementChild.nextElementSibling.innerText) {

            seletor.parentNode.children[i].firstElementChild.nextElementSibling.style = "color:green";
            if (seletor.parentNode.children[i] !== seletor)
                seletor.parentNode.children[i].style.opacity = "0.4";
        } else {
            seletor.parentNode.children[i].firstElementChild.nextElementSibling.style = "color:red";
            if (seletor.parentNode.children[i] !== seletor)
                seletor.parentNode.children[i].style.opacity = "0.4";
        }
    }

    for (let i = 0; i < seletor.parentNode.children.length; i++)
        seletor.parentNode.children[i].removeAttribute("onclick");
	if (seletor.firstElementChild.nextElementSibling.innerText ==
        quizzes[indiceQuizzSelecionado].questions[questionsAnswered].answers[correctAnswerIndex].text)
        correctAnswers++;
    questionsAnswered++;
    
    if (questionsAnswered < quizzes[indiceQuizzSelecionado].questions.length) {
        setTimeout(() => document.querySelectorAll('.quizz-question')[questionsAnswered].classList.remove('hidden'), 2000);
        setTimeout(scrollQuestion, 2000);
    }
    finishQuizz();
}


function buildQuestionsStructure(indiceQuizzSelecionado) {
    const quizzSelected = document.querySelector(".quizz-selected");
    quizzSelected.innerHTML = "";
    quizzSelected.innerHTML += `<div class="quizz-logo">
    <h1></h1>
    </div>`;
    const logo = document.querySelector(".quizz-logo");
    logo.scrollIntoView({
        block: "end",
        inline: "start",
        behavior: "smooth"
    });
    logo.firstElementChild.innerHTML = `${quizzes[indiceQuizzSelecionado].title}`;
    logo.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.57), 
rgba(0,0,0,0.57)), url(${quizzes[indiceQuizzSelecionado].image})`;
    logo.style.backgroundSize = "360px 230px";

    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions.length; i++) {
        quizzSelected.innerHTML += `
        <div class="quizz-question">
            <div class="quizz-question-title">
                <h1>
                    ${quizzes[indiceQuizzSelecionado].questions[i].title}
                </h1>
            </div>
            <div class="quizz-selected-images">
            </div>
        </div>`;
    }

    const quizzQuestions = document.querySelectorAll(".quizz-question");

    console.log(`quizzQuestions.length: `, quizzQuestions.length);

    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions.length; i++) {
        for (j = 0; j < quizzes[indiceQuizzSelecionado].questions[i].answers.length; j++) {
            quizzQuestions[i].firstElementChild.nextElementSibling.innerHTML += `
            <div onclick="verifyAnswer(this)">
                <div class="quizz-selected-option">
                </div>
                <p>
                </p>
            </div>`;
            quizzQuestions[i].firstElementChild.style.backgroundColor = 
			`${quizzes[indiceQuizzSelecionado].questions[i].color}`;
        }
    }

    const questionsContent = document.querySelectorAll(".quizz-selected-option");
    let k = 0,
        randomNumber = 0;

    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions.length; i++) {
        let randomNumbers = [];
        for (let j = 0; j < quizzes[indiceQuizzSelecionado].questions[i].answers.length; j++)
            randomNumbers.push(j);

        for (let j = quizzes[indiceQuizzSelecionado].questions[i].answers.length; j;) {
            randomNumber = (Math.random() * j--) | 0;
            tmp = randomNumbers[randomNumber];
            randomNumbers[randomNumber] = randomNumbers[j];
            randomNumbers[j] = tmp;
        }

        for (let j = 0; j < quizzes[indiceQuizzSelecionado].questions[i].answers.length; j++) {
            questionsContent[k].style.backgroundImage = `
        url(${quizzes[indiceQuizzSelecionado].questions[i].answers[randomNumbers[j]]
                    .image
                })`;

            questionsContent[k].style.backgroundSize = "100% 100%";
            questionsContent[k].style.cursor = "pointer";

            questionsContent[k].nextElementSibling.innerHTML = `
        ${quizzes[indiceQuizzSelecionado].questions[i].answers[randomNumbers[j]].text}`;
            k++;
        }
    }
	
    for (let i = quizzes[indiceQuizzSelecionado].questions.length - 1; i > 0; i--)
        quizzQuestions[i].classList.add('hidden');
}

function startQuizz(indiceQuizzSelecionado) {
    const elementoEscondido = document.querySelector(".conteudo-principal");
    elementoEscondido.classList.add("hidden");
    const quizzSelecionado = document.querySelector(".quizz-selected");
    quizzSelecionado.classList.remove("hidden");

    buildQuestionsStructure(indiceQuizzSelecionado);
}

function selectQuizz(seletor) {
    const quizzId = Number(seletor.id);
    for (let i = 0; i < quizzes.length; i++)
        if (quizzId === quizzes[i].id) {
            indiceQuizzSelecionado = i;
            startQuizz(indiceQuizzSelecionado);
        }
}

getQuizzes();
