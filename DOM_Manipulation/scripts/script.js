const list = document.getElementById('list');
const buttom = document.getElementById('button');
const input = document.getElementById('favchap');

buttom.addEventListener("click", () =>
{
    if (input.value != '')
    {
        li = document.createElement("li");
        deleteBtn = document.createElement('button');
        li.innerText = input.value;
        deleteBtn.innerText = '❌';
        li.appendChild(deleteBtn);
        list.appendChild(li);
        deleteBtn.addEventListener ("click", (event) =>
        {
            event.currentTarget.parentNode.remove();
            input.focus();
        });
        input.focus();
        input.value = '';
    }
})