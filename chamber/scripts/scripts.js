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
	//Verify
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

/* Using the memership level */

const spotlightsUrl = 'json/data.json';

let spot1 = document.getElementsByClassName("spotlight1");
let spot2 = document.getElementsByClassName("spotlight2");
let spot3 = document.getElementsByClassName("spotlight3");

const displaySpotlights= (companies) => {

	const members = [];
	for (let i =0; i < 9; i++)
	{
		if (companies[i]['level'] == 'Silver' || companies[i]['level'] == 'Gold')
			members.push(companies[i]);
	}

	let random = Math.floor(Math.random() * members.length);
	spot1[0].querySelector('h1').innerText = members[random]['name'];
	spot1[0].querySelector('a').href = members[random]['website'];
	spot1[0].querySelector('img').src = members[random]['imageurl'];
	spot1[0].querySelector('h3').innerText = `Membership Level: ${members[random]['level']}`;
	let link = document.createElement('a');
	link.href = members[random]['website'];
	link.innerText = "Website Link (Click on me)";
	spot1[0].querySelectorAll('p')[0].innerText = "";
	spot1[0].querySelectorAll('p')[0].appendChild(link);
	spot1[0].querySelectorAll('p')[1].innerText = `Phone: ${members[random]['phone']}`
	members.splice(random,1);

	random = Math.floor(Math.random() * members.length);
	spot2[0].querySelector('h1').innerText = members[random]['name'];
	spot2[0].querySelector('a').href = members[random]['website'];
	spot2[0].querySelector('img').src = members[random]['imageurl'];
	spot2[0].querySelector('h3').innerText = `Membership Level: ${members[random]['level']}`;
	link = document.createElement('a');
	link.href = members[random]['website'];
	link.innerText = "Website Link (Click on me)";
	spot2[0].querySelectorAll('p')[0].innerText = "";
	spot2[0].querySelectorAll('p')[0].appendChild(link);
	spot2[0].querySelectorAll('p')[1].innerText = `Phone: ${members[random]['phone']}`
	members.splice(random,1);

	random = Math.floor(Math.random() * members.length);
	spot3[0].querySelector('h1').innerText = members[random]['name'];
	spot3[0].querySelector('a').href = members[random]['website'];
	spot3[0].querySelector('img').src = members[random]['imageurl'];
	spot3[0].querySelector('h3').innerText = `Membership Level: ${members[random]['level']}`;
	link = document.createElement('a');
	link.href = members[random]['website'];
	link.innerText = "Website Link (Click on me)";
	spot3[0].querySelectorAll('p')[0].innerText = "";
	spot3[0].querySelectorAll('p')[0].appendChild(link);
	spot3[0].querySelectorAll('p')[1].innerText = `Phone: ${members[random]['phone']}`
	members.splice(random,1);

}

async function getSpotlightsData() {
    const response = await fetch(spotlightsUrl);
    const data = await response.json();
    displaySpotlights(data.companies);
}

getSpotlightsData();