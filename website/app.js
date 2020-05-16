/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2ce7c639a23cd64116b67d37126b24dd';

document.getElementById('generate').addEventListener('click', populateAndGetWeatherData);

function populateAndGetWeatherData() {
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseUrl, zipCode, apiKey);
}

const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch(baseUrl + zipCode + apiKey);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();