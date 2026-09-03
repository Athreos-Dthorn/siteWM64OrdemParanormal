const telaInicial = document.getElementById("telaInicial");
const simboloEntrada = document.getElementById("simboloEntrada");
const musica = document.getElementById("musica");
musica.volume = 0.4;
const musicaFinal = document.getElementById("musicaFinal");
musicaFinal.volume = 0.4;
const conteudo = document.getElementById("conteudo");
const checkbox = document.getElementById("consentimento");
const botao = document.getElementById("botaoProsseguir");
const questionario1 = document.getElementById("questionario1");
const questionario2 = document.getElementById("questionario02");
const botaoQuestionario1 = document.getElementById("botaoQuestionario1");
const botaoQuestionario2 = document.getElementById("botaoQuestionario2");
const questionario3 = document.getElementById("questionario03");
const botaoQuestionario3 = document.getElementById("botaoQuestionario3")
const botaoSim = document.getElementById("botaoSim");
const botaoNao = document.getElementById("botaoNao");
const botaoFinal = document.getElementById("botaoFinal");
const mensagemInicio = document.getElementById("mensagemInicio");
const avisoFas = document.getElementById("avisoFas");
const simboloTopo = document.querySelector(".simbolo-topo");
const tituloQuestionario = document.querySelector(".titulo-questionario");
const nomeCompleto = document.getElementById("nomeCompleto");
const idade = document.getElementById("idade");
const experiencias = document.querySelectorAll('input[name="experiencia"]');
const tempoDeJogo = document.querySelectorAll('input[name="tempoDeJogo"]');
const instagram = document.getElementById("instagram");
const campanhaTeste = document.querySelectorAll('input[name="campanhaTeste"]');
const respostas = {
    nome: "",
    idade: "",
    experiencia: "",
    tempoDeJogo: "",
    gatilhos: "",
    instagram: "",
    campanhaTeste: ""
};
/* =========================================
   ENTRADA NO SITE
========================================= */

simboloEntrada.addEventListener("click", function () {

    musica.currentTime = 3.5;
    // Inicia a música
    musica.play().catch(function (erro) {
        console.log("Não foi possível iniciar a música:", erro);
    });

    // Começa a animação do símbolo
    simboloEntrada.classList.add("reduzindo");

    // Depois inicia o desaparecimento da tela inicial
    setTimeout(function () {

        telaInicial.classList.add("saindo");

        conteudo.classList.add("visivel");

    }, 500);

});


/* =========================================
   CONSENTIMENTO
========================================= */

checkbox.addEventListener("change", function () {

    if (checkbox.checked) {

        botao.disabled = false;

    } else {

        botao.disabled = true;

    }

});


/* =========================================
   BOTÃO PROSSEGUIR
========================================= */
function enviarRespostas() {
    const dados = new URLSearchParams();

    dados.append("entry.480619261", respostas.nome);
    dados.append("entry.1735860670", respostas.idade);
    dados.append("entry.1454512378", respostas.experiencia);
    dados.append("entry.1753739061", respostas.tempoDeJogo);
    dados.append("entry.1243804396", respostas.gatilhos);
    dados.append("entry.1129876452", respostas.instagram);
    dados.append("entry.571834739", respostas.campanhaTeste);

    fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLScqW-ffoz08GE7blS-W3AETn1h-1EHpAXRw9OEMQm_soX7n7w/formResponse",
        {
            method: "POST",
            mode: "no-cors",
            body: dados
        }
    );
}

botao.addEventListener("click", function () {
    if (!checkbox.checked) {
        return;
    }

    const termo = document.querySelector(".termo");
    const introducao = document.querySelector(".introducao");
    const questionario = document.getElementById("questionario1");

    // Faz o termo e a introdução desaparecer
    introducao.classList.add("saindo");
    termo.classList.add("saindo");

    // Espera a animação terminar antes de mostrar o questionário
    setTimeout(function () {
        introducao.style.display = "none";
        termo.style.display = "none";
        tituloQuestionario.classList.add("visivel");
        questionario.classList.add("visivel");
    }, 600);
});

botaoQuestionario1.addEventListener("click", function () {
    if (nomeCompleto.value.trim() === "") {
        alert("Por favor, informe seu nome completo.");
        return;
    }

    if (idade.value.trim() === "") {
        alert("Por favor, informe sua idade.");
        return;
    }

    let experienciaSelecionada = false;

    experiencias.forEach(function (opcao) {
        if (opcao.checked) {
            experienciaSelecionada = true;
        }
    });

    if (!experienciaSelecionada) {
        alert("Selecione seu nível de experiência.");
        return;
    }
    respostas.nome = nomeCompleto.value;
    respostas.idade = idade.value;

    experiencias.forEach(function (opcao) {
        if (opcao.checked) {
            respostas.experiencia = opcao.value;
        }
    });
    questionario1.classList.remove("visivel");

    setTimeout(function () {
        questionario1.style.display = "none";
        questionario2.style.display = "block";
        window.scrollTo(0, 0);

        setTimeout(function () {
            questionario2.classList.add("visivel");
        }, 50);

    }, 600);
});

botaoQuestionario2.addEventListener("click", function () {
     let tempoSelecionado = false;

    tempoDeJogo.forEach(function (opcao) {
        if (opcao.checked) {
            tempoSelecionado = true;
        }
    });

    if (!tempoSelecionado) {
        alert("Informe se você poderá participar durante todo o evento.");
        return;
    }
    tempoDeJogo.forEach(function (opcao) {
    if (opcao.checked) {
        respostas.tempoDeJogo = opcao.value;
    }
    });

    respostas.gatilhos = document.getElementById("gatilhos").value;
    questionario2.classList.remove("visivel");

    setTimeout(function () {
        questionario2.style.display = "none";
        questionario3.style.display = "block";
        window.scrollTo(0, 0);
        setTimeout(function () {
            questionario3.classList.add("visivel");
        }, 50);

    }, 600);
});

botaoQuestionario3.addEventListener("click", function () {
     if (instagram.value.trim() === "") {
        alert("Informe seu Instagram.");
        return;
    }

    let campanhaSelecionada = false;

    campanhaTeste.forEach(function (opcao) {
        if (opcao.checked) {
            campanhaSelecionada = true;
        }
    });

    if (!campanhaSelecionada) {
        alert("Informe se deseja participar da missão teste.");
        return;
    }
    respostas.instagram = instagram.value;

    campanhaTeste.forEach(function (opcao) {
        if (opcao.checked) {
            respostas.campanhaTeste = opcao.value;
        }
    });
    questionario3.classList.remove("visivel");

    setTimeout(function () {
        questionario3.style.display = "none";

        tituloQuestionario.classList.remove("visivel");
        simboloTopo.style.display = "none";
        window.scrollTo(0, 0);
        musica.pause();
        musica.currentTime = 0;

        musicaFinal.play().catch(function (erro) {
            console.log("Não foi possível iniciar a música final:", erro);
        });

        telaFinal.style.display = "block";

        setTimeout(function () {
            telaFinal.classList.add("visivel");
        }, 50);
    }, 600);
});

botaoNao.addEventListener("click", function () {

    // Esconde os botões SIM e NÃO
    botaoSim.style.display = "none";
    botaoNao.style.display = "none";

    // Mostra o botão final
    botaoFinal.style.display = "block";
});

botaoSim.addEventListener("click", function () {
    enviarRespostas();
    telaFinal.style.display = "none";
    mensagemInicio.classList.add("visivel");
    setTimeout(function () {
        mensagemInicio.classList.add("saindo");

        setTimeout(function () {
            mensagemInicio.style.display = "none";
            avisoFas.classList.add("visivel");
        }, 1000);

    }, 4000);
});

botaoFinal.addEventListener("click", function () {
    enviarRespostas();
    telaFinal.style.display = "none";

    mensagemInicio.classList.add("visivel");

    setTimeout(function () {
        mensagemInicio.classList.add("saindo");

        setTimeout(function () {
            mensagemInicio.style.display = "none";
            avisoFas.classList.add("visivel");
        }, 1000);

    }, 4000);
});
function voltarAoTopo() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
}
