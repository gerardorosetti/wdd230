const selects = document.querySelector('.select-options').querySelectorAll('select');
const fieldset = document.querySelector('.drink-mix-inf');
const submitBtn = document.getElementsByClassName('submit-btn')[0];
const form = document.getElementsByClassName('fresh-form')[0];

const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json'

let more_data = '';

function  displayResults(fruitData) {
    more_data = fruitData;
    for (let index = 0; index < 3; index++) {
        selectedTag = selects[index];
        // console.log(selectedTag)
        fruitData.forEach(fruit => {
            // more_data.push(fruit);
            const opt = document.createElement("option");
            opt.value = fruit['name'];
            opt.innerText = fruit['name'];
            selectedTag.appendChild(opt);
        });
    }
    const label = document.createElement("label");
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id","textarea-input");
    textarea.setAttribute("name","special-instructions");
    textarea.setAttribute("rows","5");
    label.setAttribute("class","textarea-label");
    label.innerHTML = 'Give us your special instructions if needed:';
    label.appendChild(textarea);
    fieldset.appendChild(label);
    console.log(more_data);
}

// submitBtn.addEventListener("click", (event) =>
// {
//     if (!localStorage.getItem("drinks")) {
//         localStorage.setItem("drinks", 0);
//     }
//     let current_drinks = parseInt(localStorage.getItem("drinks"));
//     current_drinks += 1;
//     localStorage.setItem("drinks",current_drinks);
//     const light_box = document.createElement('div');
//     light_box.setAttribute('class','.light-box');
//     const name_input = document.getElementById("name-input");
//     const mail_input = document.getElementById("mail-input");
//     const phone_input = document.getElementById("phone-input");
//     const textarea_input = document.getElementById("textarea-input");
//     const name = document.createElement("h1");
//     name.innerText = name_input.value;
//     light_box.appendChild(name);

//     const fresh = document.getElementsByClassName("fresh")[0];
//     fresh.appendChild(light_box);
// });

function summary (event)
{
    event.preventDefault();
    if (!localStorage.getItem("drinks")) {
        localStorage.setItem("drinks", 0);
    }
    let current_drinks = parseInt(localStorage.getItem("drinks"));
    current_drinks += 1;
    localStorage.setItem("drinks",current_drinks);
    const light_box = document.createElement('div');
    light_box.setAttribute('class','light-box');
    const name_input = document.getElementById("name-input");
    const mail_input = document.getElementById("mail-input");
    const phone_input = document.getElementById("phone-input");
    const textarea_input = document.getElementById("textarea-input");

    const name = document.createElement("h2");
    name.innerText = `Client Name: ${name_input.value}`;
    const email = document.createElement("h3");
    email.innerText = `Client Email: ${mail_input.value}`;
    const phone = document.createElement("h3");
    phone.innerText = `Client Phone: ${phone_input.value}`;
    const instructions = document.createElement("h3");
    instructions.textContent = textarea_input.value;
    const fruits = []
    for (let index = 0; index < 3; index++) {
        const temp = document.createElement('h3');
        temp.innerText = `Client's Chosen Fruit ${index+1}: ${selects[index].value}`;
        fruits.push(temp);
    }

    const content_box = document.createElement('div');
    content_box.setAttribute("class","content-box");

    // light_box.appendChild(name);
    // light_box.appendChild(email);
    // light_box.appendChild(phone);
    // light_box.appendChild(fruits[0]);
    // light_box.appendChild(fruits[1]);
    // light_box.appendChild(fruits[2]);
    // if (instructions.innerText.length > 0)
    // {
    //     const temp = instructions.innerText;
    //     instructions.innerText = `Special Instructions: ${temp}`;
    //     light_box.appendChild(instructions);
    // }

    const div_client = document.createElement("div");
    div_client.setAttribute("class","div-client");

    // content_box.appendChild(name);
    // content_box.appendChild(email);
    // content_box.appendChild(phone);
    // content_box.appendChild(fruits[0]);
    // content_box.appendChild(fruits[1]);
    // content_box.appendChild(fruits[2]);
    div_client.appendChild(name);
    div_client.appendChild(email);
    div_client.appendChild(phone);
    div_client.appendChild(fruits[0]);
    div_client.appendChild(fruits[1]);
    div_client.appendChild(fruits[2]);
    if (instructions.innerText.length > 0)
    {
        const temp = instructions.textContent;
        instructions.textContent = `Special Instructions:`;
        const temp2 = document.createElement('p');
        temp2.textContent = temp;
        div_client.appendChild(instructions);
        div_client.appendChild(temp2);
    }

    content_box.appendChild(div_client);

    const div_order = document.createElement("div");
    div_order.setAttribute("class","div-order");

    const order_date = document.createElement('h3');
    order_date.setAttribute("class","order-date");
    order_date.innerText = `${dayName}, ${currentDate.getDate()} ${monthName} ${currentYear}`;
    div_order.appendChild(order_date);
    const drink_data = {
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        sugar: 0,
        calories: 0
    }

    for (let index = 0; index < 3; index++) {
        const fruit_name = selects[index].value;
        more_data.forEach(element => {
            if(element['name'] == fruit_name)
            {
                drink_data['carbohydrates'] += element['nutritions']['carbohydrates'];
                drink_data['fat'] += element['nutritions']['fat'];
                drink_data['protein'] += element['nutritions']['protein'];
                drink_data['sugar'] += element['nutritions']['sugar'];
                drink_data['calories'] += element['nutritions']['calories'];
            }
        });
    }

    const nutritional_information = document.createElement('h3');
    nutritional_information.innerText = 'Nutritional Information';
    const carbohydrates = document.createElement('p');
    carbohydrates.textContent = `Total Carbohydrates: ${drink_data['carbohydrates'].toFixed(2)}`;
    const fat = document.createElement('p');
    fat.textContent = `Total Fat: ${drink_data['fat'].toFixed(2)}`;
    const protein = document.createElement('p');
    protein.textContent = `Total Protein: ${drink_data['protein'].toFixed(2)}`;
    const sugar = document.createElement('p');
    sugar.textContent = `Total Sugar: ${drink_data['sugar'].toFixed(2)}`;
    const calories = document.createElement('p');
    calories.textContent = `Total Calories: ${drink_data['calories'].toFixed(2)}`;

    div_order.appendChild(nutritional_information);
    div_order.appendChild(carbohydrates);
    div_order.appendChild(fat);
    div_order.appendChild(protein);
    div_order.appendChild(sugar);
    div_order.appendChild(calories);

    content_box.appendChild(div_order);
    content_box.appendChild(order_date);

    light_box.appendChild(content_box);
    const btn = document.createElement('button');
    const a = document.createElement('a');
    a.innerText = "Go to Home Page";
    a.setAttribute('href','index.html');
    btn.appendChild(a);

    light_box.appendChild(btn);

    const fresh = document.getElementsByClassName("fresh")[0];
    fresh.appendChild(light_box);

};

form.addEventListener('submit', summary);

// function  displayResults(fruitData) {
//     // console.log(fruitData);
//     let i = 0;
//     fruitData.forEach(fruit => {
//         const label = document.createElement("label");
//         const input = document.createElement("input");
//         input.setAttribute("type","checkbox");
//         input.setAttribute("value",fruit['name']);
//         input.setAttribute("name",`fruit-selection`);
//         input.addEventListener("click", (event) =>
//         {
//             let cont = 0;
//             checkList.forEach(element => {
//                 if(element['checked']){
//                     cont++;
//                 }
//             });
//             // console.log(i);
//             if (cont > 3){
//                 event['target'].checked = false;
//             }
//         });
//         checkList.push(input);
//         label.innerText = `${fruit["name"]}        `;
//         label.appendChild(input);
//         checkbox.appendChild(label);
//         i++;
//     });
//     const label = document.createElement("label");
//     const textarea = document.createElement("textarea");
//     textarea.setAttribute("name","special-instructions");
//     textarea.setAttribute("rows","5");
//     label.setAttribute("class","textarea-label");
//     label.innerHTML = 'Give us your special instructions if needed:';
//     label.appendChild(textarea);
//     fieldset.appendChild(label);
// }

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