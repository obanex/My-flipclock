const userName = 'Obanex';
const apiKey = 'ac9920d0cf70cb532a9c26dd0b7dcded';  // This is my OpenWeatherMap API key
const city = 'Columbia';  // My current city

//This funnction get the time 
function updateTime() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const greetingElement = document.getElementById('greeting');
    const dateElement = document.getElementById('date');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
// this is for the morning and afternoon and evening 
    const period = hours < 12 ? 'morning' : hours < 18 ? 'afternoon' : 'evening';
    greetingElement.textContent = `Good ${period}, ${userName}.`;
    dateElement.textContent = now.toDateString();

    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}
//This function is to updtate automatically the weather
function updateWeather() {
    const weatherElement = document.getElementById('weather');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            weatherElement.textContent = `It's currently ${temperature}°F and ${description} outside.`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            weatherElement.textContent = "Unable to retrieve weather data.";
        });
}
// These are the functions to enter and exit the fullscreen mode
function toggleFullscreen() {
    const elem = document.querySelector(".container");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            document.getElementById('exitFullscreen').style.display = 'block';
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
        document.getElementById('exitFullscreen').style.display = 'none';
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        document.getElementById('exitFullscreen').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateTime, 1000);
    updateWeather();  // Fetch weather data when the page loads
    document.querySelector(".container").addEventListener('dblclick', toggleFullscreen);
});
