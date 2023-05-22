const daynames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

function togglemenu() {
  document
    .getElementsByClassName('navigation')[0]
    .classList.toggle('responsive');
}
function togglemenu2() {
  document.getElementsByClassName('navigation2')[0]
  .classList.toggle('responsive2');
}
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const dayName = daynames[currentDate.getDay()]
const monthName = months[currentDate.getMonth()]

document.querySelector('.footer-year').textContent = currentYear;

document.querySelector('.last-updated').textContent = `Last Updated: ${document.lastModified}`

document.querySelector('.date-header').textContent = `${dayName}, ${currentDate.getDate()} ${monthName} ${currentYear}`

// banner

banner = document.getElementsByClassName('banner')[0]

if (dayName != 'Monday')
{
	banner.style.display = "none"
}

async function getWeather(num)
{
    let url = "http://api.weatherapi.com/v1/current.json?key=b86c967e8f1a4d6a8bd85728232205&q=Merida Venezuela&aqi=yes"

    let res = await fetch(url);
    let weather = await res.json();

	let temp =  weather['current']['temp_c'];
	let temp2 =  weather['current']['temp_f'];
	let condition = weather['current']['condition'];
	let speed = weather['current']['wind_kph'];
	let chill = weather['current']['feelslike_c'];
	let chill2 = weather['current']['feelslike_f'];
	let words = condition['text'].split(" ");
	let condition_text = '';
	words.forEach(element => {
		let e = element.charAt(0).toUpperCase() + element.slice(1);
		condition_text = condition_text + e + " ";
	});
	document.getElementById('temperature').textContent = temp + ' °C / ' + temp2 + ' °F';
	document.getElementById('condition-img').src = condition['icon'];
	document.getElementById('condition-text').innerText = condition_text;
	document.getElementById('wind-speed').innerText = 'Wind Speed: ' + speed + ' km/h';
	document.getElementById('wind-chill').innerText = 'Wind Chill: ' + chill + '°C / ' + chill2 + ' °F';
}

getWeather()
