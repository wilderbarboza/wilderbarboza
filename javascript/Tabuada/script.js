function multiplica(){
    console.clear();
    var texto = '';
    var numero1 = document.getElementById('n1').value;
    for(i=1; i<=10; i++){
        result=numero1*i;
        texto= texto + numero1+' x '+i+' = '+ result+'<br/>'
        console.log(result)
    }
    document.getElementById('result').innerHTML= texto;
}
function digitou(e){
        if(e.keyCode==13){
            console.clear();
            var texto = '';
            var numero1 = document.getElementById('n1').value;
            for(i=1; i<=10; i++){
                result=numero1*i;
                texto= texto + numero1+' x '+i+' = '+ result+'<br/>'
                console.log(result)
            }
            document.getElementById('result').innerHTML= texto;
        }

}
