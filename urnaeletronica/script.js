let seuVotopara = document.querySelector('.d-1--1 span');
let cargo = document.querySelector('.d-1--2 span');
let descricao = document.querySelector('.d-1--4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1--right');
let numeros= document.querySelector('.d-1--3');
let votoBranco=false;
let votoconfirmado=false;
let etapaAtual=0;
let numero ='';
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroshtml='';
    numero='';
    votoBranco=false;
    for(let i=0;i<etapa.numeros;i++){
        if(i === 0){
        numeroshtml+='<div class="numero pisca"></div>';
        }else{
            numeroshtml+='<div class="numero"></div>';
        }
    }
    seuVotopara.style.display='none';
    cargo.innerHTML=etapa.titulo;
    descricao.innerHTML='';
    aviso.style.display='none';
    lateral.innerHTML='';
    numeros.innerHTML = numeroshtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero===numero){
            return true;
        }else{
            return false;
        }
    });
    if (candidato.length>0){
        candidato = candidato[0];
        seuVotopara.style.display='block';
        aviso.style.display='block';
        descricao.innerHTML=`Nome ${candidato.nome}<br\> Partido ${candidato.partido}`;

        let fotoshtml = '';
        for (let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotoshtml+= `<div class="d-1--images small"><img src="images/${candidato.fotos[i].src}">${candidato.fotos[i].legenda}</div>`
            }else{
                fotoshtml+= `<div class="d-1--images"><img src="images/${candidato.fotos[i].src}">${candidato.fotos[i].legenda}</div>`
            }
       
        }
        lateral.innerHTML = fotoshtml;
        }else{
        seuVotopara.style.display='block';
        aviso.style.display='block';
        descricao.innerHTML='<div class="aviso-grande pisca">VOTO NULO</div>'

    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove('pisca');
    if(elNumero.nextElementSibling !== null){
    elNumero.nextElementSibling.classList.add('pisca');
    }else{
        atualizaInterface();
    }
    }
}
function branco(){
    numero='';
    votoBranco=true;
    seuVotopara.style.display='block';
    aviso.style.display='block';
    numeros.innerHTML='';
    descricao.innerHTML='<div class="aviso-grande pisca">VOTO BRANCO</div>';
    lateral.innerHTML='';

}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let votoconfirmado=false;
    let etapa = etapas[etapaAtual]
    if(votoBranco===true){
    votoconfirmado=true;
    }else if (numero.length === etapa.numeros) {
    votoconfirmado=true;

    }

    if(votoconfirmado){
    etapaAtual++
    if(etapas[etapaAtual] !== undefined){
        comecarEtapa();
    }else{
        document.querySelector('.tela').innerHTML='<div class="aviso-gigante pisca">FIM</div>';
    }

}
}
comecarEtapa();