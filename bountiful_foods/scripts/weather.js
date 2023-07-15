const currentTempC = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#condition-img');
const captionDesc = document.querySelector('#condition-text');
const humidity = document.querySelector('#humidity');

const forecastCont = document.querySelector('.forecast');
const forecastList = document.querySelectorAll('.forecast-box');

const dataList = [];

let currentPage = 1;
const rightArrow = document.querySelector('.right');
const leftArrow = document.querySelector('.left');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,US&appid=c7a88691ff7f98908e15c855847369ba'
const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.1581&lon=-117.3506&appid=c7a88691ff7f98908e15c855847369ba'

function  displayResults(weatherData) {
    // console.log(weatherData);
    const kelvin_temp = weatherData['main']['temp'];
    const f_temp = ((kelvin_temp - 273.15) * 9/5 + 32).toFixed(1);
    const c_temp = (kelvin_temp - 273.15).toFixed(1);
    currentTempC.innerHTML = `<strong>${c_temp}°C / ${f_temp}°F</strong>`;

    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
    let words = weatherData.weather[0].description.split(" ");
	let condition_text = '';
	words.forEach(element => {
		let e = element.charAt(0).toUpperCase() + element.slice(1);
		condition_text = condition_text + e + " ";
	});
    const desc = condition_text;

    humidity.textContent = "Humidity: " + weatherData['main']['humidity'] + "%";

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

function  displayResults2(weatherData) {
    // console.log(weatherData);
    // console.log(forecastCont);
    // console.log(forecastList);
    // console.log(forecastList[0].querySelector(".time").textContent);
    weatherData['list'].forEach(element => {
        const item = {
            day: '',
            time: '',
            image: '',
            temperature: 0,
            description: ''
        };
        const date_time = element['dt_txt'].split(' ');
        date_time[0] = date_time[0].replaceAll('-','/');
        const day = new Date(date_time[0])
        item.day = day.toLocaleDateString("us-US", { weekday: 'long' });
        item.time = date_time[1].slice(0,-3);
        item.image = `https://openweathermap.org/img/wn/${element.weather[0].icon}@4x.png`;
        const kelvin_temp = element['main']['temp'];
        const f_temp = ((kelvin_temp - 273.15) * 9/5 + 32).toFixed(1);
        const c_temp = (kelvin_temp - 273.15).toFixed(1);
        item.temperature = `${c_temp}°C / ${f_temp}°F`;
        const words = element.weather[0].description.split(" ");
        let condition_text = '';
        words.forEach(element => {
            let e = element.charAt(0).toUpperCase() + element.slice(1);
            condition_text = condition_text + e + " ";
        });
        item.description = condition_text;
        dataList.push(item);
    });
    for (let i = 0; i < 4; i++)
    {
        forecastList[i].querySelector(".time").textContent = `${dataList[i]['day']} at ${dataList[i]['time']}`;
        forecastList[i].querySelector("p").textContent = dataList[i]['description'];
        forecastList[i].querySelector("img").src = dataList[i]['image'];
        forecastList[i].querySelector(".temp").textContent = dataList[i]['temperature'];
    }
    leftArrow.setAttribute('class','no-display');
}

rightArrow.addEventListener("click", (event) =>
{
    if (currentPage < 10)
    {
        for (let i = currentPage*4, j = 0; i < currentPage*4+4; i++,j++)
        {
            forecastList[j].querySelector(".time").textContent = `${dataList[i]['day']} at ${dataList[i]['time']}`;
            forecastList[j].querySelector("p").textContent = dataList[i]['description'];
            forecastList[j].querySelector("img").src = dataList[i]['image'];
            forecastList[j].querySelector(".temp").textContent = dataList[i]['temperature'];
        }
        currentPage++;
    }
    if (currentPage == 10)
    {
        rightArrow.setAttribute('class','no-display');
    }
    if (currentPage > 1)
    {
        leftArrow.setAttribute('class','next left');
    }
});

leftArrow.addEventListener("click", (event) =>
{
    if (currentPage > 1)
    {
        currentPage--;
        for (let i = currentPage*4-1, j = 3; i >= currentPage*4-4; i--,j--)
        {
            forecastList[j].querySelector(".time").textContent = `${dataList[i]['day']} at ${dataList[i]['time']}`;
            forecastList[j].querySelector("p").textContent = dataList[i]['description'];
            forecastList[j].querySelector("img").src = dataList[i]['image'];
            forecastList[j].querySelector(".temp").textContent = dataList[i]['temperature'];
        }
    }
    if (currentPage == 1)
    {
        leftArrow.setAttribute('class','no-display');
    }
    if (currentPage < 10)
    {
        rightArrow.setAttribute('class','next right');
    }
});

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
        const response2 = await fetch(url2);
        if (response2.ok) {
            const data = await response2.json();
            displayResults2(data);
        } else {
            throw Error(await response2.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();