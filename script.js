listTodos()

function clearDOM() {
    const formParent = document.getElementById('list') 

    while(formParent.firstChild) {
        formParent.firstChild.remove()
    }
}

const inputForm = document.getElementById('input-form')
inputForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {description:"", done: false }
    const todo = document.getElementById('input-field').value;
    data["description"] = todo
   
    postTodo(data)
    listTodos()

    const inputField = document.getElementById('input-field')
    inputField.value = "";
})

async function listTodos () {
    const database = await getAllTodos()

    clearDOM()

    let id = 1;

    Array.from(database).forEach((element) => {
        const formParent = document.getElementById('list')   
        const divListItem = document.createElement('div')
            divListItem.setAttribute('class', 'list-item')
            divListItem.setAttribute('id', 'div'+id)
        const inputCheckbox = document.createElement('input')
            inputCheckbox.setAttribute('type', 'checkbox')
            inputCheckbox.setAttribute('class', 'checkbox')
            inputCheckbox.setAttribute('id', 'check'+id)
        const inputText = document.createElement('input')
            inputText.setAttribute('type', 'text')
            inputText.setAttribute('class', 'text')
            inputText.setAttribute('id', 'item'+id)
            inputText.value = element.description
        const trashImage = document.createElement('img')
            trashImage.setAttribute('class', 'delete')
            trashImage.setAttribute('src', './img/delete.png')
            trashImage.setAttribute('id', 'delete'+id)
        id++

        const newDiv = formParent.appendChild(divListItem)
        newDiv.appendChild(inputCheckbox)
        newDiv.appendChild(inputText)
        newDiv.appendChild(trashImage)

        trashImage.addEventListener('click', (i) => {
            const trashImages = document.getElementsByClassName('delete')
            let position = Array.from(trashImages).indexOf(trashImage)
            
            deleteTodo(database[position]._id)
            location.reload()
        })

        const inputCheckboxes = document.getElementsByClassName('checkbox')
        let position = Array.from(inputCheckboxes).indexOf(inputCheckbox)
        if(element.done == true) {
            inputCheckbox.checked = true;
            inputCheckbox.nextSibling.style.textDecoration = "line-through"
        } else {
            inputCheckbox.nextSibling.style.textDecoration = "none"
            inputCheckbox.checked = false;
        }

        inputCheckbox.addEventListener('change', () => {
            if (inputCheckbox.checked == true) {

                todoIsDone(database[position]._id, true)
                location.reload()
            } else {

                todoIsDone(database[position]._id, false)
                location.reload()
            }   
        })

        inputText.addEventListener('change', () => {
            const inputTextBoxes = document.getElementsByClassName('text')
            let position = Array.from(inputTextBoxes).indexOf(inputText)
            
            changeTodo(database[position]._id, inputText.value)
        })
    }) 
}












