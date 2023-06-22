const currentTempF = document.querySelector('#current-temp-f');
const currentTempC = document.querySelector('#current-temp-c');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Merida,VE&appid=8448ba6c9adcf1506c09ac94b29e7ced'

function  displayResults(weatherData) {
    const kelvin_temp = weatherData['main']['temp'];
    const f_temp = ((kelvin_temp - 273.15) * 9/5 + 32).toFixed(1);
    const c_temp = (kelvin_temp - 273.15).toFixed(1);
    currentTempF.innerHTML = `<strong>${f_temp}</strong>`;
    currentTempC.innerHTML = `<strong>${c_temp}</strong>`;

    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();