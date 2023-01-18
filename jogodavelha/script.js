//dados iniciais//
let square={
    a1:'', a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:''
};
let player='';
let warnning='';
let playng=false;


reset()

document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item => {
    addEventListener('click',itemclick)
})

function itemclick(event){
    
    let item = event.target.getAttribute('data-item')
    console.log(event)
    if(playng && square[item]===''){
        square[item]=player;
        renderSquare();
        tooglePlayer();
        console.log(item)
        
    }
}

function tooglePlayer(){
   player=(player==='x')? 'o':'x';
   renderInfo();
}

function reset(){
    warnning='';
    console.log('ok')
    let randon = Math.floor(Math.random()*2)
    player = (randon===0)? 'o':'x';

    for(let i in square){
        square[i]='';
    }
    playng=true;

    renderSquare();
    renderInfo();
}

function renderSquare(){
    for (let i in square){
        let item = document.querySelector(`div[data-item=${i}]`)
      item.innerHTML=square[i];
    }
    checkGame()
}


function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML=warnning

}

function checkGame(){
    if(checkWinner('o')){
        warnning='O "o" venceu!'
        playng=false
    }else if(checkWinner('x')){
        warnning='O "x" venceu!'
        playng=false
    }else if(isFull()){
        warnning='Deu empate'
        playng=false;
    }
}

function checkWinner(player){
let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1']

for(let w in pos){
    let pArray = pos[w].split(',');
    let hasWon=pArray.every(option => square[option] === player);
    if(hasWon){
        return true;
    }

    }
    return false;
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}