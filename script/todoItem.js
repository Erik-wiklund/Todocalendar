function loadLocalStorage() {

    if (localStorage.getItem('todo_list')) {
        state.todoDictionary = JSON.parse(localStorage.getItem('todo_list'));
    }
}

function initTodoList(id) {
    state.local_id = ((state.local_id === id ? undefined : id));

    createTodoList();
    fillTodoList();
}

function createTodoList() {

    const todoList = document.querySelector(".todo-item-list");
    todoList.innerText = "";

    const addTodoDiv = createElementWithClassName("div", "full-width flex space-between");

    if (state.local_id) {
        addTodoDiv.innerHTML = "<p>Lägg till nytt Todo</p>";

        const plusbutton = createElementWithClickEventAndCustomText("p", addNewTodo, "+");
        plusbutton.className = "pointer";
        addTodoDiv.append(plusbutton);
    }
    else {
        addTodoDiv.innerHTML = "<p>Nuvarande Todos</p>";
    }

    todoList.append(addTodoDiv);
}

function fillTodoList() {

    let todoObjectList = [];
    if (state.local_id) {
        const currentDayTodoObject = state.todoDictionary.find(todoObj => todoObj.key === state.local_id)

        if (currentDayTodoObject) {
            todoObjectList.push(currentDayTodoObject);
        }
    }
    else {
        for (const todoListofDay of state.todoDictionary) {
            todoObjectList = todoObjectList.concat(todoListofDay);
        }
    }
    for (const todoObject of todoObjectList) {
        for (const todo of todoObject.value) {
            const todoListDiv = document.querySelector(".todo-item-list");

            const newTodoDiv = createElementWithClassName("div", "full-width flex space-between no-margin-on-p");

            const todoText = createElementWithClickEventAndCustomText("p", () => editTodo(todoObject, todo), todo);
            todoText.className += "overflow-todo";
            todoText.className += " pointer";

            const minusButton = createElementWithClickEventAndCustomText("p", () => removeTodo(todoObject, todo), "-");
            minusButton.className = "pointer";

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

function createElementWithClassName(elementType, className) {
    const newElement = document.createElement(elementType);
    newElement.className = (className);
    return newElement;
}

function addNewTodo() {

    const todo = prompt("skriv nytt todo");

    if (todo) {
        if (!state.todoDictionary.find(x => x.key === state.local_id)) {
            state.todoDictionary.push({
                key: state.local_id,
                value: [todo]
            });
        }
        else {
            state.todoDictionary.find(x => x.key === state.local_id).value.push(todo);
        }

        createTodoList();
        fillTodoList();
        localStorage.setItem('todo_list', JSON.stringify(state.todoDictionary));
    }
    createCalender();
}

function removeTodo(todoObject, todo) {

    const index = getIndexInArrayByString(todoObject, todo);


    if (index || index === 0) {
        state.todoDictionary.find(obj => obj === todoObject).value.splice(index, 1);
    }

    SaveTodoListToLocalStorage(state.todoDictionary);
    createTodoList();
    fillTodoList();
    createCalender();
}

function editTodo(todoObject, todo) {

    const index = getIndexInArrayByString(todoObject, todo);

    if (index || index === 0) {
        const newTodo = prompt("Ändra Todo", todo);
        if (newTodo) {
            state.todoDictionary.find(obj => obj === todoObject).value[index] = newTodo;
        }
    }

    SaveTodoListToLocalStorage(state.todoDictionary);
    createTodoList();
    fillTodoList();
}

function getIndexInArrayByString(todoObject, string) {
    return todoObject.value.findIndex(obj => obj == string);
}

function SaveTodoListToLocalStorage(todoList) {
    localStorage.setItem("todo_list", JSON.stringify(todoList));
}