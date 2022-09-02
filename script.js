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
        elementos[i].style.backgroundSize = "100% 100%";
    }
}

function getQuizzes() {
    const promessa = axios.get(`${URL_API}/quizzes`);
    promessa.then(showQuizzes);
}

function iniciaQuizz(indiceQuizz) {
    const elementoEscondido = document.querySelector('.conteudo-principal');
    elementoEscondido.classList.add('hidden');
    const quizzSelecionado = document.querySelector('.quizz-selected');
    quizzSelecionado.classList.remove('hidden');
    const logo = document.querySelector('.quizz-logo');
    logo.scrollIntoView({
        block: "end",
        inline: "start",
        behavior: "smooth"
    });
    logo.firstElementChild.innerHTML = `${quizzes[indiceQuizz].title}`;
    logo.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.57), 
rgba(0,0,0,0.57)), url(${quizzes[indiceQuizz].image})`;
    logo.style.backgroundSize = "25% 100%";
    const perguntaQuizz = document.querySelector('.quizz-question');
    perguntaQuizz.innerHTML = '';

    for (let i = 0; i < quizzes[indiceQuizz].questions.length; i++) {
        perguntaQuizz.innerHTML += `<div class="quizz-question-title">
            <h1>
                ${quizzes[indiceQuizz].questions[i].title}
            </h1>
        </div>
        <div class="quizz-selected-images">
            <div>
                <div class="quizz-selected-option">
                </div>
                <p>
                    ${quizzes[indiceQuizz].questions[i].answers[0].text}
                </p>
                <div class="quizz-selected-option">
                </div>
                <p>
                    ${quizzes[indiceQuizz].questions[i].answers[1].text}
                </p>
            </div>
        </div>`;
    }
    const imageQuizz = document.querySelector('.quizz-question-title');
    imageQuizz.style.backgroundColor = quizzes[indiceQuizz].questions[0].color;
    const imagesQuestionsQuizz = document.querySelectorAll('.quizz-selected-option')
    for (let i = 0; i < imagesQuestionsQuizz.length; i++) {
        imagesQuestionsQuizz[i].style.backgroundImage = `${quizzes[indiceQuizz].questions[i].image}`;
    }

}

function selectQuizz(seletor) {

    const quizzId = Number(seletor.id);
    for (let i = 0; i < quizzes.length; i++)
        if (quizzId === quizzes[i].id) {
            const indiceQuizzSelecionado = i;
            iniciaQuizz(indiceQuizzSelecionado);
        }

}

getQuizzes();
