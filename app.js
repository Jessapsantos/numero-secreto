let listaDenumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextNaTela(tag, texto) {
    let campo = document.querySelector(tag);
        campo.innerHTML = texto;
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR'; 
            utterance.rate = 1.2; 
            window.speechSynthesis.speak(utterance); 
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
}

function mensagemInicial() {
    exibirTextNaTela('h1', 'Jogo do número secreto');
    exibirTextNaTela('p', 'Escolha um número entre 1 e 100.');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto) {
        exibirTextNaTela('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextNaTela ('p', 'O número secreto é menor');
        } else {
            exibirTextNaTela ('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNalista = listaDenumerosSorteados.length;

    if (quantidadeDeElementosNalista == numeroLimite) {
        listaDenumerosSorteados = [];
    }
    if (listaDenumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDenumerosSorteados.push(numeroEscolhido);
        console.log(listaDenumerosSorteados)
        return numeroEscolhido
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
