//Date

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

// Banner

banner = document.getElementsByClassName('banner')[0]

if (dayName != 'Monday' && dayName != 'Tuesday')
{
	banner.style.display = "none"
}

// Days Visit

const today = Date.now();

if (!localStorage.getItem("visitDate")) {
	localStorage.setItem("visitDate", today);
}

// console.log(localStorage.getItem("visitDate"));

const toSet = parseInt(today) - parseInt(localStorage.getItem("visitDate"));

localStorage.setItem("visitDate", today);

const days = toSet*1.1574e-8

const lastVisit = document.getElementsByClassName("lastVisit")[0]
if (lastVisit){
	lastVisit.innerHTML = "Days Since Last Visit: " + days.toFixed(0) + " Days"
}

/* Join */

const hidden_date = document.getElementById('hidden-date')
if (hidden_date)
{
	// console.log(hidden_date.value)
	hidden_date.value = currentDate
	// console.log(hidden_date.value)
}