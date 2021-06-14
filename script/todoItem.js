let todoDictionary = [];

function createTodoList(id){
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
}

function fillTodoList(todo)
{
    
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

function addNewTodo(){
    const todo = prompt("skriv nytt todo");

    fillTodoList(todo);
}

function removeTodo(event){
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
}