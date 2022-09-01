const URL_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
const quizzes = [];
function getQuizzes() {
    const promessa = axios.get(`${URL_API}/quizzes`);
    promessa.then(showQuizzes);
}

function showQuizzes(promessa) {
    console.log(promessa.data);
    const elementoQuizz = document.querySelector('.all-quizzes');

    elementoQuizz.innerHTML = '';
    for (let i = 0; i < promessa.data.length; i++)
        quizzes.push(promessa.data[i]);
    console.log(quizzes);
    for (let i = 0; i < quizzes.length; i++) {
        elementoQuizz.innerHTML += `<div class="quizz" onclick="selectQuizz()">
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

function selectQuizz() {
    const elemento = document.querySelector('.conteudo-principal');
    elemento.classList.add('hidden');
}

getQuizzes();
