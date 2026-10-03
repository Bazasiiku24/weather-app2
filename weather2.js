const btn = document.querySelector(".btn");
const inputArea = document.querySelector(".input-area");
const temperature = document.querySelector(".weather-value");
const relativeHumidity = document.querySelector(".relative-humidity");
const windSpeed = document.querySelector(".wind-speed");
const windDirection = document.querySelector(".wind-direction");
const apparentTemperature = document.querySelector(".apparent-temperature");
const card = document.querySelector(".card");
const weather = document.querySelector(".weather");
const load = document.querySelector(".loading")

console.log(card);

btn.addEventListener("click",()=>{
    const cityName = inputArea.value;

    if (cityName.length === 0) {
        alert("you should typing on input-area")
    }else{
        console.log(cityName);
        search(cityName);
    }
});

inputArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cityName = inputArea.value; // ← ここでも改めて取得する
        search(cityName);
    }
});

async function search(cityName) {
    load.style.display = "block"
    
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
    const geoData = await response.json();

    if (!geoData.results) {
        alert(`${cityName} is not found`)
        return;
    }else{
        
    }

    console.log(geoData.results[0].latitude);
    console.log(geoData.results[0].longitude);

    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code`)
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    render(weatherData);
}

function render(weatherData){
    card.classList.add("run")
    temperature.innerHTML = weatherData.current.apparent_temperature;
    relativeHumidity.innerHTML = weatherData.current.relative_humidity_2m;
    windSpeed.innerHTML = weatherData.current.wind_speed_10m;
    windDirection.innerHTML = weatherData.current.wind_direction_10m;
    apparentTemperature.innerHTML = weatherData.current.apparent_temperature;

    weatherCode(weatherData);

    load.style.display = "none"

}

function weatherCode(weatherData){
    const weatherCodeMap = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        61: "Rain",
        71: "Snow",
        95: "Thunderstorm"
    };

const weatherSort = weatherCodeMap[weatherData.current.weather_code];
const code = weatherData.current.weather_code;
console.log(code);

if (code >= 95) {
    weather.innerHTML = `<i id="weather-mark" class="fa-solid fa-cloud-bolt"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}`
}else if (code >= 71) {
    weather.innerHTML = `<i id="weather-mark" class="fa-solid fa-snowflake"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}`
}else if (code >= 61) {
    weather.innerHTML = `<i id="weather-mark" class="fa-solid fa-cloud-rain"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}</div>`
}else if (code >= 45) {
    weather.innerHTML = `<i id="weather-mark" class="fa-solid fa-smog"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}</div>`
}else if (code >= 3) {
    weather.innerHTML = `<i id="weather-mark" class="fa-regular fa-cloud"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}</div>`
}else if (code >= 2) {
    weather.innerHTML = `<i id="weather-mark" class="fa-regular fa-cloud"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}</div>`
}else if (code >= 1) {
    weather.innerHTML = `<i id="weather-mark" class="fa-solid fa-sun"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}</div>`
}else if (code >= 0) {
    weather.innerHTML = 
    `<i id="weather-mark" class="fa-solid fa-sun"></i>
    <div>${weatherCodeMap[weatherData.current.weather_code]}</div>`
}

}