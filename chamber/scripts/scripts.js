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