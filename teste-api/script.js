var lista='';

async function loadpost(){
    document.getElementById('txtpost').innerHTML='carregando...';
    let req = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body: JSON.stringify({
        title: 'Titulo de teste',
        body: 'Corpo de teste',
        UserId: 4
    }),
    headers: {
        'Content-type':'application/json'
    }
    });

    let json = await req.json();
    console.log(json);


}
