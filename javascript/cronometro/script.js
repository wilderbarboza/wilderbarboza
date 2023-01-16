let cent=0;
let seg=0;
let min=0;
let h=0;
let tempo;
function contar(){
cent++
texto();
if (cent>99){
    seg++;
    cent=0;
}
else if(seg>59){
    min++;
    seg=0;
    cent=0;
}
else if(min>59){
    h++;
    seg=0;
    cent=0;
    min=0;
}
}
function iniciar(){
    tempo=setInterval(contar,10)
}

function parar(){
    clearInterval(tempo);
}

function reset(){
    clearInterval(tempo);
    cent=0;
    seg=0;
    min=0;
    h=0;
    texto();
}
function texto(){
document.getElementById('cronometro').innerHTML=`${h<10? '0'+h:h}:${min<10? '0'+min:min}:${seg<10? '0'+seg:seg}:${cent<10? '0'+cent:cent}`
}
