function mudarTema(tema) {
    const root = document.documentElement;

    if (tema === 'espacial') {
        root.style.setProperty('--bg-color', '#060b19');
        root.style.setProperty('--primary-color', '#00e5ff');

    } else if (tema === 'alerta') {
        root.style.setProperty('--bg-color', '#0b0b0b');
        root.style.setProperty('--primary-color', '#b40000');
        

    } else if (tema === 'profundo') {
        root.style.setProperty('--bg-color', '#021329');
        root.style.setProperty('--primary-color', '#2979ff');
    }
}

let slideIndex = 0;

function mostrarSlides() {

    let slides = document.getElementsByClassName("slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }

    setTimeout(mostrarSlides, 4000);
}

window.addEventListener('DOMContentLoaded', mostrarSlides);

async function validarEBuscar(event) {

    event.preventDefault();

    const campoCidade = document.getElementById("cidade");

    const cidade = campoCidade.value.trim();

    if (cidade === "") {

        alert("Erro: O campo de cidade não pode ser enviado vazio!");

        campoCidade.focus();

        return;
    }
    const chave = "92cb741773693c46c46a746ef9de328f";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`;

    try {

        const resposta = await fetch(url);

        const dados = await resposta.json();

        if (dados.cod != 200) {

            document.getElementById("resultado").innerHTML =
                `<p style="color: var(--red)">Cidade não encontrada.</p>`;

            return;
        }

        document.getElementById("resultado").innerHTML = `
            <div style="margin-top: 20px; padding: 15px; border-left: 4px solid var(--primary-color); background: rgba(255,255,255,0.02)">
                <h3>${dados.name}</h3>

                <p>🌡 Temperatura: ${dados.main.temp}°C</p>

                <p>☁ Clima: ${dados.weather[0].description}</p>

                <p>💧 Umidade: ${dados.main.humidity}%</p>
            </div>
        `;

    } catch (erro) {

        document.getElementById("resultado").innerHTML =
            `<p>Erro ao conectar com o serviço climático.</p>`;
    }
}

const perguntasQuiz = [

    {
        q: "Qual o foco principal do Orbital Flood Watch?",
        o: ["Previsão de terremotos", "Prevenção de enchentes", "Controle de tráfego"],
        a: 1
    },

    {
        q: "Qual tecnologia embarcada simula os sensores do projeto?",
        o: ["Raspberry Pi", "Arduino (Wokwi)", "PlayStation"],
        a: 1
    },

    {
        q: "Qual linguagem faz a modelagem matemática no projeto?",
        o: ["PHP", "Java", "Python"],
        a: 2
    },

    {
        q: "O que o sensor de distância do Arduino mede no protótipo?",
        o: ["Nível da água", "Velocidade do vento", "Temperatura externa"],
        a: 0
    },

    {
        q: "Qual estado sofreu a maior tragédia climática em 2024 abordada no site?",
        o: ["São Paulo", "Rio de Janeiro", "Rio Grande do Sul"],
        a: 2
    },

    {
        q: "Que componente do Arduino emite o alerta sonoro?",
        o: ["LED", "Buzzer", "Display LCD"],
        a: 1
    },

    {
        q: "Para qual destes públicos o sistema NÃO foi desenhado?",
        o: ["Defesa Civil", "Astrônomos amadores", "Comunidades vulneráveis"],
        a: 1
    },

    {
        q: "Qual o principal benefício do monitoramento orbital contínuo?",
        o: ["Alertas antecipados", "Internet gratuita", "Redução do calor"],
        a: 0
    },

    {
        q: "Quantos municípios brasileiros sofrem riscos críticos?",
        o: ["Menos de 50", "Mais de 600", "Nenhum"],
        a: 1
    },

    { 
    q: "Em caso de aviso de alarme de inundação iminente, qual é a primeira recomendação de segurança?", 
    o: ["Subir para os lugares mais altos ou zonas seguras", "Ficar na rua para monitorar a água", "Tentar salvar móveis pesados primeiro"], 
    a: 0 
    }
];

function renderizarQuiz() {

    const container = document.getElementById("quiz-perguntas");

    container.innerHTML = "";

    perguntasQuiz.forEach((item, index) => {

        let opcoesHtml = "";

        item.o.forEach((opcao, oIndex) => {

            opcoesHtml += `
                <label>
                    <input type="radio" name="pergunta${index}" value="${oIndex}" required>
                    ${opcao}
                </label>
            `;
        });

        container.innerHTML += `
            <div class="question-block">

                <p>
                    <strong>${index + 1}. ${item.q}</strong>
                </p>

                <div class="options-block">
                    ${opcoesHtml}
                </div>

            </div>
        `;
    });
}

function calcularQuiz(event) {

    event.preventDefault();

    let acertos = 0;

    perguntasQuiz.forEach((item, index) => {

        const selecionado =
            document.querySelector(`input[name="pergunta${index}"]:checked`);

        if (
            selecionado &&
            parseInt(selecionado.value) === item.a
        ) {
            acertos++;
        }
    });

    const resultadoDiv =
        document.getElementById("quiz-resultado");

    resultadoDiv.innerHTML =
        `Você acertou ${acertos} de 10 perguntas!`;

    if (acertos >= 7) {
        resultadoDiv.style.color = "var(--green)";

    } else {
        resultadoDiv.style.color = "var(--yellow)";
    }
}

window.addEventListener('DOMContentLoaded', renderizarQuiz);

const originalCalcularQuiz = calcularQuiz;

calcularQuiz = function(event) {

    originalCalcularQuiz(event);

    const resDiv =
        document.getElementById("quiz-resultado");

    resDiv.style.display = "block";

    resDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}