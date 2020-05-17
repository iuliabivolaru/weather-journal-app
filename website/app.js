/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2ce7c639a23cd64116b67d37126b24dd';

document.getElementById('generate').addEventListener('click', populateAndGetWeatherData);

function populateAndGetWeatherData() {
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(data => {
            console.log(data);
            postWeatherData('/addWeatherData', 
            { perceivedTemp: data.main.feels_like, 
              minTemp: data.main.temp_min, 
              maxTemp: data.main.temp_max, 
              humidity: data.main.humidity });
        });
}

const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch(baseUrl + zipCode + apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

const postWeatherData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const postedData = await response.json();
        console.log('postedData ', postedData);
        return postedData;
    } catch(error) {
        console.log("error", error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// TODO: - country code de pus in input; restyle; 