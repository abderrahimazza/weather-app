
const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


 getWeatherLocation("morocco");
 async function getWeatherLocation(city) {
    // fetch(url(city))
    // .then(function (data) {
    //     return data.json();
    // })
    // .then(function (data) {
    //     console.log(data);
    //     showData(data)
    // })
    // .catch( _ => {
    //     console.error("Error");
    // })

    const reponse = await fetch(url(city));
    const data = await reponse.json();
    

    if (data.cod == 404) {
        main.innerHTML = data.message;
    }

    showData(data);

}


function showData(data) {
    const weather = document.createElement("h1");
    const temp = KtoC(data.main.temp);

    weather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> <br> ${temp} °C <br> ${data.name} `;

    // clean results
    main.innerHTML = "";

    main.appendChild(weather);
    
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = search.value ;
    if (city) {
        getWeatherLocation(city);
    }
    search.value = '';
})


window.addEventListener('load', function () {
    search.focus();
})