const URL_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
const quizzes = [];
let indiceQuizzSelecionado = null;

function showQuizzes(promessa) {
    const elementoQuizz = document.querySelector('.quizzes-list');
    elementoQuizz.innerHTML = '';

    for (let i = 0; i < promessa.data.length; i++)
        quizzes.push(promessa.data[i]);

    for (let i = 0; i < quizzes.length; i++) {
        elementoQuizz.innerHTML += `<div class="quizz" 
        id="${quizzes[i].id}" onclick="selectQuizz(this)">
            <p>
                ${quizzes[i].title} 
            </p>
        </div>`
    }

    const elementos = document.querySelectorAll('.quizz');

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

function verifyAnswer(seletor, indiceQuizzSelecionado) {

    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions.length; i++) {
        if (quizzes[indiceQuizzSelecionado].questions[i].title == seletor.parentNode.previousElementSibling.innerHTML) {

        }
    }
}

function buildQuestionsStructure(indiceQuizzSelecionado) {
    const quizzSelected = document.querySelector(".quizz-selected");
    quizzSelected.innerHTML = "";
    quizzSelected.innerHTML += `<div class="quizz-logo">
    <h1></h1>
    </div>`
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

    const quizzQuestions = document.querySelectorAll('.quizz-question');

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
            quizzQuestions[i].firstElementChild.style.backgroundColor = `${quizzes[indiceQuizzSelecionado].questions[i].color}`;
        }
    }

    const questionsContent = document.querySelectorAll('.quizz-selected-option');
    let k = 0, randomNumber = 0;

    for (let i = 0; i < quizzes[indiceQuizzSelecionado].questions.length; i++) {
        let randomNumbers = [];
        for (let j = 0; j < quizzes[indiceQuizzSelecionado].questions[i].answers.length; j++) {
            randomNumbers.push(j);
        }
        for (let j = quizzes[indiceQuizzSelecionado].questions[i].answers.length; j;) {
            randomNumber = Math.random() * j-- | 0;
            tmp = randomNumbers[randomNumber];
            randomNumbers[randomNumber] = randomNumbers[j];
            randomNumbers[j] = tmp;
        }

        for (let j = 0; j < quizzes[indiceQuizzSelecionado].questions[i].answers.length; j++) {
            questionsContent[k].style.backgroundImage = `
        url(${quizzes[indiceQuizzSelecionado].questions[i].answers[randomNumbers[j]].image})`;

            questionsContent[k].style.backgroundSize = "340px 180px";
            questionsContent[k].style.cursor = "pointer";

            questionsContent[k].nextElementSibling.innerHTML = `
        ${quizzes[indiceQuizzSelecionado].questions[i].answers[randomNumbers[j]].text}`;
            k++;
        }
    }
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
