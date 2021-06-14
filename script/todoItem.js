let todoDictionary = [];
let local_id;

function createTodoList(id) {
    local_id = id;

    if (todoDictionary[local_id]) {
        todoDictionary.push({
            key: local_id,
            value: []
        });
    }

    const todoList = document.querySelector(".todo-item-list");
    todoList.innerText = "";

    const addTodoDiv = document.createElement("div");
    addTodoDiv.className = ("full-width" + " flex" + " space-around");

    addTodoDiv.innerHTML = "<p>Lägg till nytt Todo</p>";

    const plusbutton = document.createElement("p");
    plusbutton.innerText = "+";
    plusbutton.addEventListener("click", addNewTodo);
    addTodoDiv.append(plusbutton);

    todoList.append(addTodoDiv);

    fillTodoList();
}

function fillTodoList() {


    for (let todo of todoDictionary[local_id]) {
        const todoList = document.querySelector(".todo-item-list");
        const newTodoDiv = document.createElement("div");
        newTodoDiv.className = ("full-width" + " flex" + " space-around" + " no-margin-on-p");

        const todoText = document.createElement("p").innerText = todo;

        const minusButton = document.createElement("p");
        minusButton.addEventListener("click", removeTodo);
        minusButton.innerText = "-";

        newTodoDiv.append(todoText);
        newTodoDiv.append(minusButton);

        todoList.append(newTodoDiv);
    }
}

function addNewTodo() {
    let a = todoDictionary[local_id];
    if (!a) {
        todoDictionary[local_id] = [];
    }

    //let add_id = local_id;

    const todo = prompt("skriv nytt todo");
    todoDictionary[local_id].push(todo);

    if (todo) {
        createTodoList(local_id);
    }
    createCalender();
    localStorage.setItem('todolist', JSON.stringify(todoDictionary));
}

function removeTodo(event) {

    let text = event.target.parentNode.childNodes[0].wholeText;

    for (let i = 0; i < todoDictionary[local_id].length; i++) {
        if (todoDictionary[local_id][i] === text) {
            todoDictionary[local_id].splice(i, 1);
            break;
        }
    }
    createTodoList(local_id);
    createCalender();
}