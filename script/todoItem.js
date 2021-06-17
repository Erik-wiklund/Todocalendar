let todoDictionary = [];
let local_id;

function load() {
    todoDictionary.length = 0;

    if (localStorage.getItem('todo_list')) {
        todoDictionary = JSON.parse(localStorage.getItem('todo_list'));
    }

    initTodoList(local_id);
}

function initTodoList(id) {
    local_id = ((local_id === id ? undefined : id));

    createTodoList();
    fillTodoList();
}

function createTodoList() {

    const todoList = document.querySelector(".todo-item-list");
    todoList.innerText = "";

    const addTodoDiv = createElementWithClassName("div", "full-width flex space-between");

    if (local_id) {
        addTodoDiv.innerHTML = "<p>Lägg till nytt Todo</p>";

        const plusbutton = createElementWithClickEventAndCustomText("p", addNewTodo, "+");
        addTodoDiv.append(plusbutton);
    }
    else {
        addTodoDiv.innerHTML = "<p>Nuvarande Todos</p>";
    }

    todoList.append(addTodoDiv);
}

function fillTodoList() {

    let todoObjectList = [];
    if (local_id) {
        const currentDayTodoObject = todoDictionary.find(todoObj => todoObj.key === local_id)
        
        if (currentDayTodoObject) {
            todoObjectList.push(currentDayTodoObject);
        }
    }
    else {
        for (const todoListofDay of todoDictionary) {
            todoObjectList = todoObjectList.concat(todoListofDay);
        }
    }
    for (const todoObject of todoObjectList) {
        for (const todo of todoObject.value) {
            const todoListDiv = document.querySelector(".todo-item-list");
            
            const newTodoDiv = createElementWithClassName("div", "full-width flex space-between no-margin-on-p");

            const todoText = createElementWithClickEventAndCustomText("p", () => editTodo(todoObject, todo), todo);

            const minusButton = createElementWithClickEventAndCustomText("p", () => removeTodo(todoObject, todo), "-");

            newTodoDiv.append(todoText);
            newTodoDiv.append(minusButton);

            todoListDiv.append(newTodoDiv);

        }
    }
}

function createElementWithClickEventAndCustomText(typeOfElement, functionEventShouldCall, innerText) {
    const clickableElement = document.createElement(typeOfElement);
    clickableElement.addEventListener("click", functionEventShouldCall);
    clickableElement.innerText = innerText;
    return clickableElement;
}

function createElementWithClassName(elementType, className){
    const newElement = document.createElement(elementType);
    newElement.className = (className);
    return newElement;
}

function addNewTodo() {

    const todo = prompt("skriv nytt todo");

    if (todo) {
        if (!todoDictionary.find(x => x.key === local_id)) {
            todoDictionary.push({
                key: local_id,
                value: [todo]
            });
        }
        else {
            todoDictionary.find(x => x.key === local_id).value.push(todo);
        }

        createTodoList();
        fillTodoList();
        localStorage.setItem('todo_list', JSON.stringify(todoDictionary));
    }
    createCalender();
}

function removeTodo(todoObject, todo) {

    const index = getIndexInArrayByString(todoObject, todo);


    if (index || index === 0) {
        todoDictionary.find(obj => obj === todoObject).value.splice(index, 1);
    }

    SaveTodoListToLocalStorage(todoDictionary);
    createTodoList();
    fillTodoList();
    createCalender();
}

function editTodo(todoObject, todo) {

    const index = getIndexInArrayByString(todoObject, todo);

    if (index || index === 0) {
        const newTodo = prompt("Ändra Todo", todo);
        if (newTodo) {
            todoDictionary.find(obj => obj === todoObject).value[index] = newTodo;
        }
    }

    SaveTodoListToLocalStorage(todoDictionary);
    createTodoList();
    fillTodoList();
}

function getIndexInArrayByString(todoObject, string) {
    return todoObject.value.findIndex(obj => obj == string);
}

function SaveTodoListToLocalStorage(todoList){
    localStorage.setItem("todo_list", JSON.stringify(todoList));
}