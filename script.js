const URL_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';

// tela 1 ------------------------------------------------------------------------
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
    logo.style.backgroundSize = "25% 100%";

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
    let k = 0;
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
            k++;
        }
    }

    const questionsContent = document.querySelectorAll('.quizz-selected-option');
    k = 0;
    for (let i = 0; i < quizzes[indiceQuizz].questions.length; i++) {
        for (let j = 0; j < quizzes[indiceQuizz].questions[i].answers.length; j++) {
            questionsContent[k].style.backgroundImage = `
        url(${quizzes[indiceQuizz].questions[i].answers[j].image})`;

            questionsContent[k].style.backgroundSize = "100% 100%";
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


// tela 2 ------------------------------------------------------------------------

// tela 3 ------------------------------------------------------------------------

let variavel;

let tituloDoQuizz=[];
let urlImgQuizz=[];
let qntDePerguntas;
let qntDeNiveis;


//função para mostrar tela 3 parte 1
function mostrarT3P1(){
    `
    <div class="tela3p1">
        <div class="titulot3">Comece pelo começo<div>
        <div class="retangulao">
            <input class="retangulo" placeholder="titudoDoQuizz">Título do seu quizz</input>
            <input class="retangulo" placeholder="urlImgQuizz">URL da imagem do seu quizz</input>
            <input class="retangulo" placeholder="qntDePerguntas">Quantidade de perguntas do quizz</input>
            <input class="retangulo" placeholder="qntDeNiveis">Quantidade de níveis do quizz</input>
        </div>
        <button class="retangulovermelho" onclick="validarEChamarParte2()">Prosseguir pra criar perguntas</button>
    </div>
    `;

}

//função para validar os dados e ir para a parte 2 da tela 3
function validarEChamarParte2 (){
    
    confereURL(urlImgQuizz);
    confereNumero(qntDePerguntas);
    confereNumero(qntDeNumeros);

    if(){
        //chama a função q mostra a parte 2
    }
}

//função para mostrar tela 3 parte 2
//função para mostrar tela 3 parte 3
//função para mostrar tela 3 parte 4

//função para conferir as URLs
function confereURL(){
    return true;
}

//função para verificar e validar os dados

//função para conferir se é numero
function confereNumero(variavel){
    typeof(variavel);
    if(typeof!="number"){
        alert("Digite um número inteiro entre 1 e 6 para a quantidade");
        return false;
    }
    return true;
}
