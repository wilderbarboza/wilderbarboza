let totalSliders = document.querySelectorAll('.slider--item').length;
document.querySelector('.slider-width').style.width= `calc(100vw * ${totalSliders} )`;
document.querySelector('.slider-controls').style.height = `${document.querySelector('.slider').clientHeight}px`;
let currentslide = 0



function goprev(){
  currentslide--;
      if(currentslide<0){
          currentslide = totalSliders -1;
      }
  updateslide()
}
function gonext(){
  currentslide++;
  if (currentslide > (totalSliders-1)){
    currentslide=0;
  }
  updateslide()
}

function updateslide(){
    let slideWidth = document.querySelector('.slider--item9').clientWidth;
    let newmargin = (currentslide * slideWidth);
    document.querySelector('.slider-width').style.marginLeft = `-${newmargin}px`
}