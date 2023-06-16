const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// const monthsDays = {
// 	"January": 31,
// 	"February": 28,
// 	"March": 31,
// 	"April": 30,
// 	"May": 31,
// 	"June": 30,
// 	"July": 31,
// 	"August": 31,
// 	"September": 30,
// 	"October": 31,
// 	"November": 30,
// 	"December": 31
// };

const numToMonth = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "December"
};

const monthsDays = {
	1: 31,
	2: 28,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31
};

const months = {
	"January": 1,
	"February": 2,
	"March": 3,
	"April": 4,
	"May": 5,
	"June": 6,
	"July": 7,
	"August": 8,
	"September": 9,
	"October": 10,
	"November": 11,
	"December": 12
};

const displayProphets = (prophets) => {
    const cards = document.querySelector('div.cards'); // select the output container element

    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let portrait = document.createElement('img');
        let birth_date = document.createElement('h3');
        let birth_place = document.createElement('h3');
        let prophet_years = document.createElement('h3');
        let children = document.createElement('h3');
        let died = document.createElement('h3');
        let age = document.createElement('h3');
        // Build the h2 content out to show the prophet's full name - finish the template string
        h2.textContent = `${prophet.name} ${prophet['lastname']}`;
        birth_date.textContent = `Date of Birth: ${prophet['birthdate']}`;
        birth_place.textContent = `Place of Birth: ${prophet.birthplace}`;
        prophet_years.textContent = `Prophet Years: ${prophet['length']}`;
        children.textContent = `Number of Children: ${prophet.numofchildren}`;
        if (prophet['death'] == null)
        {
            died.textContent = `Date of Death: Currently Alive`;
        }
        else
        {
            died.textContent = `Date of Death: ${prophet['death']}`;
        }
        const birth = prophet.birthdate.split(" ");
        let death = prophet.death
        if ( prophet.death != null)
        {
            death = prophet.death.split(" ")
        }
        else
        {
            const currentDate = new Date()
            death = []
            death.push(currentDate.getDate())
            death.push(numToMonth[currentDate.getMonth()+1])
            death.push(currentDate.getFullYear())
        }
        let values = [];
        values.push(death[2]-birth[2]);
        values.push(Math.abs(months[death[1]] - months[birth[1]]))
        if (months[death[1]] < months[birth[1]])
        {
            values[0] -= 1
            values[1] = 12-months[birth[1]] + months[death[1]];
        }
        if (death[0] - birth[0] < 0)
        {
            values[1] -= 1
            if ( values[1] < 0 )
            {
                values[0] -= 1;
                values[1] = 12 + values[1];
            }
            let aux = months[death[1]]-1;
            if (aux <= 0)
            {
                aux = 12;
            }
            values.push(monthsDays[aux]-parseInt(birth[0])+parseInt(death[0]))
        }
        else
        {
            values.push(Math.abs(death[0] - birth[0]))
        }
        age.textContent = `Time Lived: ${values[0]} Years ${values[1]} Months ${values[2]} Days`;
        // console.log(`${prophet.name}\n-Birth: ${birth[0]} / ${months[birth[1]]} / ${birth[2]}\n-Death: ${death[0]} / ${months[death[1]]} / ${death[2]}\n-Result: ${values[0]} / ${values[1]} / ${values[2]}`)


        // Build the image portrait by setting all the relevant attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        // Append the section(card) with the created elements
        card.appendChild(h2);

        // First 2
        let div1 = document.createElement('div');
        div1.setAttribute('class', 'div1');
        div1.appendChild(birth_date);
        div1.appendChild(birth_place);
        card.appendChild(div1);
        // card.appendChild(birth_date);
        // card.appendChild(birth_place);

        // Portrait
        card.appendChild(portrait);

        // Extra
        let div2 = document.createElement('div');
        div2.setAttribute('class', 'div2');
        div2.appendChild(prophet_years);
        div2.appendChild(children);
        div2.appendChild(died);
        div2.appendChild(age);
        card.appendChild(div2);
        // card.appendChild(prophet_years);
        // card.appendChild(children);
        // card.appendChild(died);
        // card.appendChild(age);

        cards.appendChild(card);
    }); // end of forEach loop
} // end of function expression

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);  // note that we reference the prophet array of the data object given the structure of the json file
    displayProphets(data.prophets);
}



getProphetData();