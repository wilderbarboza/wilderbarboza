var cor = 1;
var pause= true;
function automatico(){
    if( pause===false){
        console.log(pause)
    switch(cor) {
        case 1:
                cor=2;
                document.getElementById('semaforo').setAttribute('src','assets/image/verde.png');
                tempo(5);
        break;
        case 2:
                cor=3;
                document.getElementById('semaforo').setAttribute('src','assets/image/amarelo.png');
                tempo(2);
            break;
        case 3:
                cor=1;
                document.getElementById('semaforo').setAttribute('src','assets/image/vermelho.png');
                tempo(5);
            break;
  }
}else{
    console.log(pause)
  return;

}
}
function tempo(t){
    pause=false;
    setTimeout(automatico,t*1000);
}

function verde(){
    pause = true;
    cor=2;
    document.getElementById('semaforo').setAttribute('src','assets/image/verde.png');
}
function vermelho(){
    pause = true;
    cor=3;
    document.getElementById('semaforo').setAttribute('src','assets/image/vermelho.png');
}
function amarelo(){
    pause = true;
    cor=1;
    document.getElementById('semaforo').setAttribute('src','assets/image/amarelo.png')
}