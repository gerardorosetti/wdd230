const checkbox = document.querySelector('.check-box');
const fieldset = document.querySelector('.drink-mix-inf');
const checkList = [];

const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json'

function  displayResults(fruitData) {
    // console.log(fruitData);
    let i = 0;
    fruitData.forEach(fruit => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.setAttribute("type","checkbox");
        input.setAttribute("value",fruit['name']);
        input.setAttribute("name",`fruit-selection`);
        input.addEventListener("click", (event) =>
        {
            let cont = 0;
            checkList.forEach(element => {
                if(element['checked']){
                    cont++;
                }
            });
            // console.log(i);
            if (cont > 3){
                event['target'].checked = false;
            }
        });
        checkList.push(input);
        label.innerText = `${fruit["name"]}        `;
        label.appendChild(input);
        checkbox.appendChild(label);
        i++;
    });
    const label = document.createElement("label");
    const textarea = document.createElement("textarea");
    textarea.setAttribute("name","special-instructions");
    textarea.setAttribute("rows","5");
    label.setAttribute("class","textarea-label");
    label.innerHTML = 'Give us your special instructions if needed:';
    label.appendChild(textarea);
    fieldset.appendChild(label);
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