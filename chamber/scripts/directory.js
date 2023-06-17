const url = 'json/data.json';

const displayData = (companies) => {
    const cards = document.querySelector('div.cards');
    cards.setAttribute('class','cards gridView');
    companies.forEach((data) => {

        let card = document.createElement('section');
        card.setAttribute('class','grid');
        let name = document.createElement('h3');
        name.setAttribute('class','name no-display');
        let image = document.createElement('img');
        image.setAttribute('class','image');
        let address = document.createElement('h3');
        let phone = document.createElement('h3');
        let website = document.createElement('h3');
        let websiteLink = document.createElement('a')

        name.textContent = `${data.name}`;
        address.textContent = `Address: ${data['address']}`;
        phone.textContent = `Phone: ${data.phone}`;
        websiteLink.textContent = `Website Link: ${data['website']}`;
        websiteLink.href = data.website;
        website.appendChild(websiteLink)

        image.setAttribute('src', data.imageurl);
        image.setAttribute('alt', `Image/Logo of ${data.name}`);
        image.setAttribute('loading', 'lazy');

        card.appendChild(image);

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });

    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");
    const images = document.querySelectorAll('.image');
    const names = document.querySelectorAll('.name');

    const sections = document.querySelectorAll('section');
    console.log(sections)

    gridbutton.addEventListener("click", () => {
        for(let i = 0; i < images.length; i++)
        {
            images[i].setAttribute('class','image');
            names[i].setAttribute('class','name no-display');
            sections[i].setAttribute('class','grid');
            cards.setAttribute('class','cards gridView');
        }
    });

    listbutton.addEventListener("click", () => {
        for(let i = 0; i < images.length; i++)
        {
            images[i].setAttribute('class','image no-display');
            names[i].setAttribute('class','name');
            sections[i].setAttribute('class','list');
            cards.setAttribute('class','cards listView');
        }
    });

}

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.companies);
}

getData();