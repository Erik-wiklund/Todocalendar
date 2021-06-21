function initWelcomeSegment() {
    let date = new Date()
    printTimeOfDay();
    printDayDateAndMonth(date);
    addClickEventTobutton();
}

// Prints day, date and month in sidebar
function printDayDateAndMonth(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString('sv', options);
    document.getElementById('date').innerHTML = dateString;
}

// Prints time of day in sidebar
function printTimeOfDay() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    var t_str = hours + ':' + minutes;
    document.getElementById('clock').innerHTML = t_str;
}

function addClickEventTobutton(){
    const button = document.querySelector(".show-calendar-button");
    button.addEventListener("click", editDivClasses);
}

function editDivClasses(){
    const calendarGrid = document.querySelector(".calender-grid");
    const todoHeader = document.querySelector(".todo-header");
    
    todoHeader.classList.toggle("display-none");
    calendarGrid.classList.toggle("display");
}
// Updates clock every second
setInterval(printTimeOfDay, 1000);