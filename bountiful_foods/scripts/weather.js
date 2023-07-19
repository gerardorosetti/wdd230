const daynumber = {
	Sunday: 1,
	Monday: 2,
	Tuesday: 3,
	Wednesday: 4,
	Thursday: 5,
	Friday: 6,
	Saturday: 7,
    domingo: 1,
    lunes: 2,
    martes: 3,
    miércoles: 4,
    jueves: 5,
    viernes: 6,
    sábado: 7
};

const currentTempC = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#condition-img');
const captionDesc = document.querySelector('#condition-text');
const humidity = document.querySelector('#humidity');

const forecastCont = document.querySelector('.forecast');
const forecastList = document.querySelectorAll('.forecast-box');

const dayList = [];
const day1 = [];
const day2 = [];
const day3 = [];

const currentPage = [1,1,1];
const rightArrow = document.querySelectorAll('.right');
const leftArrow = document.querySelectorAll('.left');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,US&appid=c7a88691ff7f98908e15c855847369ba'
const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.1581&lon=-117.3506&appid=c7a88691ff7f98908e15c855847369ba'

function  displayResults(weatherData) {
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

        let repair = [0,0,0];

        if (daynumber[dayName] + 1 > 7)
        {
            repair[0] = -7;
        }
        if (daynumber[dayName] + 2 > 7)
        {
            repair[1] = -7;
        }
        if (daynumber[dayName] + 3 > 7)
        {
            repair[2] = -7;
        }

        if (daynumber[item.day] == daynumber[dayName] + 1 + repair[0])
        {
            day1.push(item);
        }
        if (daynumber[item.day] == daynumber[dayName] + 2 + repair[1])
        {
            day2.push(item);
        }
        if (daynumber[item.day] == daynumber[dayName] + 3 + repair[2])
        {
            day3.push(item);
        }
    });
    dayList.push(day1);
    dayList.push(day2);
    dayList.push(day3);

    forecastList[0].querySelector(".time").textContent = `${day1[0]['day']} at ${day1[0]['time']}`;
    forecastList[0].querySelector("p").textContent = day1[0]['description'];
    forecastList[0].querySelector("img").src = day1[0]['image'];
    forecastList[0].querySelector(".temp").textContent = day1[0]['temperature'];

    forecastList[1].querySelector(".time").textContent = `${day2[0]['day']} at ${day2[0]['time']}`;
    forecastList[1].querySelector("p").textContent = day2[0]['description'];
    forecastList[1].querySelector("img").src = day2[0]['image'];
    forecastList[1].querySelector(".temp").textContent = day2[0]['temperature'];

    forecastList[2].querySelector(".time").textContent = `${day3[0]['day']} at ${day3[0]['time']}`;
    forecastList[2].querySelector("p").textContent = day3[0]['description'];
    forecastList[2].querySelector("img").src = day3[0]['image'];
    forecastList[2].querySelector(".temp").textContent = day3[0]['temperature'];

    leftArrow.forEach(left => {
        left.setAttribute('class','no-display');
    });
}

rightArrow.forEach(function(right,index) {
    right.addEventListener("click", (event) =>
    {
        if (currentPage[index] < dayList[index].length)
        {
            forecastList[index].querySelector(".time").textContent = `${dayList[index][currentPage[index]]['day']} at ${dayList[index][currentPage[index]]['time']}`;
            forecastList[index].querySelector("p").textContent = dayList[index][currentPage[index]]['description'];
            forecastList[index].querySelector("img").src = dayList[index][currentPage[index]]['image'];
            forecastList[index].querySelector(".temp").textContent = dayList[index][currentPage[index]]['temperature'];
            currentPage[index]++;
        }
        if (currentPage[index] == dayList[index].length)
        {
            right.setAttribute('class','no-display');
        }
        if (currentPage[index] > 1)
        {
            leftArrow[index].setAttribute('class','next left');
        }
    });
});

leftArrow.forEach(function(left,index) {
    left.addEventListener("click", (event) =>
    {
        if (currentPage[index] > 1)
        {
            currentPage[index]--;
            forecastList[index].querySelector(".time").textContent = `${dayList[index][currentPage[index]-1]['day']} at ${dayList[index][currentPage[index]-1]['time']}`;
            forecastList[index].querySelector("p").textContent = dayList[index][currentPage[index]-1]['description'];
            forecastList[index].querySelector("img").src = dayList[index][currentPage[index]-1]['image'];
            forecastList[index].querySelector(".temp").textContent = dayList[index][currentPage[index]-1]['temperature'];
        }
        if (currentPage[index] == 1)
        {
            left.setAttribute('class','no-display');
        }
        if (currentPage[index] < dayList[index].length)
        {
            rightArrow[index].setAttribute('class','next right');
        }
    });
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