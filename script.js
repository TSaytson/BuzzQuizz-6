const URL_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
const quizzes = [];


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

function buildQuestionsStructure(indiceQuizz) {
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
    logo.firstElementChild.innerHTML = `${quizzes[indiceQuizz].title}`;
    logo.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.57), 
rgba(0,0,0,0.57)), url(${quizzes[indiceQuizz].image})`;
    logo.style.backgroundSize = "360px 230px";

    for (let i = 0; i < quizzes[indiceQuizz].questions.length; i++) {
        quizzSelected.innerHTML += `
        <div class="quizz-question">
            <div class="quizz-question-title">
                <h1>
                    ${quizzes[indiceQuizz].questions[i].title}
                </h1>
            </div>
            <div class="quizz-selected-images">
            </div>
        </div>`;
    }

    const quizzQuestions = document.querySelectorAll('.quizz-question');

    console.log(`quizzQuestions.length: `, quizzQuestions.length);

    for (let i = 0; i < quizzes[indiceQuizz].questions.length; i++) {
        for (j = 0; j < quizzes[indiceQuizz].questions[i].answers.length; j++) {
            quizzQuestions[i].firstElementChild.nextElementSibling.innerHTML += `
            <div>
                <div onclick="verifyAnswer(this)" class="quizz-selected-option">
                </div>
                <p>
                </p>
            </div>`;
            quizzQuestions[i].firstElementChild.style.backgroundColor = `${quizzes[indiceQuizz].questions[i].color}`;
        }
    }

    const questionsContent = document.querySelectorAll('.quizz-selected-option');
    k = 0;
    for (let i = 0; i < quizzes[indiceQuizz].questions.length; i++) {
        for (let j = 0; j < quizzes[indiceQuizz].questions[i].answers.length; j++) {
            questionsContent[k].style.backgroundImage = `
        url(${quizzes[indiceQuizz].questions[i].answers[j].image})`;

            questionsContent[k].style.backgroundSize = "320px 180px";
            questionsContent[k].style.cursor = "pointer";

            questionsContent[k].nextElementSibling.innerHTML = `
        ${quizzes[indiceQuizz].questions[i].answers[j].text}`;
            k++;
        }
    }
}

function startQuizz(indiceQuizz) {
    const elementoEscondido = document.querySelector(".conteudo-principal");
    elementoEscondido.classList.add("hidden");
    const quizzSelecionado = document.querySelector(".quizz-selected");
    quizzSelecionado.classList.remove("hidden");

    buildQuestionsStructure(indiceQuizz);

}

function selectQuizz(seletor) {

    const quizzId = Number(seletor.id);
    for (let i = 0; i < quizzes.length; i++)
        if (quizzId === quizzes[i].id) {
            const indiceQuizzSelecionado = i;
            startQuizz(indiceQuizzSelecionado);
        }

}

getQuizzes();
