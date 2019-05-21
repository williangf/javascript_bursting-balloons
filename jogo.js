/**
 * Created by willi on 28/11/2016.
 */
var timerId = null; //Variavel que armazena a chamada da funcao TimeOut

function iniciaJogo(){

    var url = window.location.search;

    var nivel_jogo = url.replace("?","");

    var tempo_segundos = 0;

    if(nivel_jogo == 1){
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2){
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){
        tempo_segundos = 30;
    }

    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_baloes = 80;

    criaBaloes(qtde_baloes);

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagemTempo(tempo_segundos + 1);

}

function criaBaloes(qtde_baloes){

    for(var i = 1; i <= qtde_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function () {
            estourar(this);
        }

        document.getElementById('cenario').appendChild(balao);
    }

}

function contagemTempo(tempo_segundos) {

    tempo_segundos = tempo_segundos - 1;

    if(tempo_segundos == -1){
        clearTimeout(timerId); // para o cronometro
        gameOver();
        return false;
    }

    document.getElementById('cronometro').innerHTML = tempo_segundos;

    timerId = setTimeout("contagemTempo("+tempo_segundos+")", 1000);

}
function estourar(e) {
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
}

function gameOver() {
    alert('Fim de jogo! Você não conseguiu estourar todos os balões a tempo...')
}

function pontuacao(acao) {

    var baloesInteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloesEstourados = document.getElementById('baloes_estourados').innerHTML;

    baloesInteiros = parseInt(baloesInteiros);
    baloesEstourados = parseInt(baloesEstourados);

    baloesInteiros = baloesInteiros + acao;
    baloesEstourados = baloesEstourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloesInteiros;
    document.getElementById('baloes_estourados').innerHTML = baloesEstourados;

    situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros) {


    if(baloesInteiros == 0){
        alert('Parabéns! Você completou o jogo a tempo!')
        pararJogo();
    }
}

function pararJogo() {
    clearTimeout(timerId);
}