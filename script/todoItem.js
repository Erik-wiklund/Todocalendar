let todoDictionary = [];
let local_id;

function load() {
    todoDictionary.length = 0;
    todoDictionary = JSON.parse(localStorage.getItem('todo_list').replace(null, '""'));
    for (let i = 0; i < todoDictionary.length; i++) {
        local_id = (todoDictionary[i].local_id);
        todo = (todoDictionary[i].todo);
        addStoredTodo();
    }
}

function addStoredTodo() {

    if (!todoDictionary[local_id]) {
        todoDictionary[local_id] = [];
    }
    todoDictionary[local_id].push(todo);
    if (todo) {
        for (let todo of todoDictionary[local_id]) {
            const newTodoDiv = document.createElement("div");
            newTodoDiv.className = ("full-width" + " flex" + " space-around" + " no-margin-on-p");
            const minusButton = document.createElement("p");
            minusButton.addEventListener("click", removeTodo);
            minusButton.innerText = "-";
        }
    }
    createCalender();
}

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
    addTodoDiv.className = ("full-width flex space-between");

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
        newTodoDiv.className = ("full-width flex space-between no-margin-on-p");

        const todoText = document.createElement("p");
        todoText.addEventListener("click", editTodo);
        todoText.innerText = todo;

        const minusButton = document.createElement("p");
        minusButton.addEventListener("click", removeTodo);
        minusButton.innerText = "-";

        newTodoDiv.append(todoText);
        newTodoDiv.append(minusButton);

        todoList.append(newTodoDiv);

    }
}

function addNewTodo() {
    if (!todoDictionary[local_id]) {
        todoDictionary[local_id] = [];
    }

    const todo = prompt("skriv nytt todo");
    todoDictionary[local_id].push(todo);

    if (todo) {
        createTodoList(local_id);
    }
    createCalender();

    // IF = array finns i LS
    if (localStorage.getItem('todo_list')) {
        const todoArray = JSON.parse(localStorage.getItem('todo_list'));
        todoArray.push({ "local_id": local_id, "todo": todo });
        localStorage.setItem('todo_list', JSON.stringify(todoArray));
    }
    // ELSE - array finns inte i LS
    else {
        const todos = [];
        todos.push({ "local_id": local_id, "todo": todo });
        localStorage.setItem('todo_list', JSON.stringify(todos));
    }
}

function removeTodo(event) {
    let removeArray = [];
    removeArray = JSON.parse(localStorage.getItem('todo_list'));
    let text = event.target.parentNode.childNodes[0].innerText;
    const index = getStringIndex(text);

    if (index || index === 0) {
        todoDictionary[local_id].splice(index, 1);
        removeArray.splice(i, 1);
    }
    localStorage.setItem("todo_list", JSON.stringify(removeArray));
    createTodoList(local_id);
    createCalender();
}

function editTodo(event) {
    const text = event.target.innerText;
    const index = getStringIndex(text);

    if (index || index === 0) {
        const newTodo = prompt("Ändra Todo", text);
        if (newTodo) {
            todoDictionary[local_id][index] = newTodo;
        }
    }

    createTodoList(local_id);
}

function getStringIndex(string) {
    return todoDictionary[local_id].findIndex(x => x === string);
}