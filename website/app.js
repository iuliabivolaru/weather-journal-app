/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2ce7c639a23cd64116b67d37126b24dd';
document.getElementById('generate').addEventListener('click', populateAndGetWeatherData);

function populateAndGetWeatherData() {
    const zipCode = document.getElementById('zip').value;
    let usersFeelings = document.getElementById('feelings').value;
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(data => {
            console.log(data);
            postWeatherData('/addWeatherData', 
            { temperature: data.main.feels_like,
              usersFeelings,
              date: todaysDate });
            document.getElementById('date').innerHTML = todaysDate;
            document.getElementById('temp').innerHTML = data.main.feels_like;
            document.getElementById('content').innerHTML = usersFeelings;                      
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
let todaysDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// TODO: - country code de pus in input; restyle; de modificat obiectul trimis in post - de pus temp, content 
// si date in loc; de update UI