document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();
    let input=document.querySelector('#searchInput').value;
    let key = '3ae9d7034ef24a6943c832e6b740b45b'

    if(input!==''){
        showWarning('Carregando...')
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${key}&units=metric&lang=pt_br`;
        let result = await fetch(url);
        let json = await result.json();
        console.log(json);

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                icon: json.weather[0].icon,
                windspeed: json.wind.speed,
                winddeg: json.wind.deg
            })

        } else {
            clearinfo();
            showWarning("Cidade não encontrada");
        }
    }
})

function showInfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windspeed} <span>km/h</span>`;
    document.querySelector('.info .temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`);
    document.querySelector('.vento .ventoArea .ventoPonto').style.transform=`rotate(${json.winddeg-90}deg)`;
    document.querySelector('.resultado').style.display ='block';
}


function clearinfo(){
    showWarning('');
    document.querySelector('.resultado').style.display ='none';
}


function showWarning(msg){
  document.querySelector('.aviso').innerHTML=msg;
}