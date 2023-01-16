var semaforo = 1;
var cor=1;

document.onload=tempo(1);
function sfrente(){
 switch(cor){
     case 1:
        document.getElementById('frente').setAttribute('src','assets/image/verde.png')
         cor=2
         tempo(5);
         break;
    case 2:
        document.getElementById('frente').setAttribute('src','assets/image/amarelo.png')
         cor=3
         tempo(2);
         break;
    case 3:
        document.getElementById('frente').setAttribute('src','assets/image/vermelho.png')
        cor=1
        semaforo=2
        sfundo();
        break;
 }
}
function sfundo(){
    switch(cor){
        case 1:
            document.getElementById('fundo').setAttribute('src','assets/image/verde.png')
            cor=2
            tempo(5);
            break;
       case 2:
            document.getElementById('fundo').setAttribute('src','assets/image/amarelo.png')
            cor=3
            tempo(2);
            break;
       case 3:
           document.getElementById('fundo').setAttribute('src','assets/image/vermelho.png')
           cor=1
           semaforo=3
           sdireita();
           break;
    }
   }
   function sdireita(){
    switch(cor){
        case 1:
            document.getElementById('direita').setAttribute('src','assets/image/verde-direita.png')
            cor=2
            tempo(5);
            break;
       case 2:
            document.getElementById('direita').setAttribute('src','assets/image/amarelo-direita.png')
            cor=3
            tempo(2);
            break;
       case 3:
           document.getElementById('direita').setAttribute('src','assets/image/vermelho-direita.png')
           cor=1
           semaforo=4
           sesquerda();
           break;
    }
   }
   function sesquerda(){
    switch(cor){
        case 1:
            document.getElementById('esquerda').setAttribute('src','assets/image/verde-esquerda.png')
            cor=2
            tempo(5);
            break;
       case 2:
            document.getElementById('esquerda').setAttribute('src','assets/image/amarelo-esquerda.png')
            cor=3
            tempo(2);
            break;
       case 3:
            document.getElementById('esquerda').setAttribute('src','assets/image/vermelho-esquerda.png')
           cor=1
           semaforo=1
           sfrente();
           break;
    }
   }

   function tempo(t){
       switch(semaforo){
            case 1:
               setTimeout(sfrente,t*1000);
               break;
            case 2:
                setTimeout(sfundo,t*1000);
                break;
            case 3:
                setTimeout(sdireita,t*1000);
                break;
            case 4:
                setTimeout(sesquerda,t*1000);
                break;
       }
   }