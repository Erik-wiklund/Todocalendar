window.addEventListener("load", main);

function main(){
    addEventListeners();
    createCalender();
    updateCalender();
}

function createCalender(){
    const calenderGrid = document.getElementById("calender");

    for (let i = 0; i < gridSize; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.id = "calenderDay" + i;
        calenderGrid.append(dayDiv);
    }

    const calenderHeader = document.getElementById("calender-header");
    const h2Div = document.createElement("h2");
    h2Div.id = "monthYearH2";
    const nextMonth = document.getElementById("next-month");
    calenderHeader.insertBefore(h2Div, nextMonth);
}

function updateCalender(){
    const calenderGrid = document.getElementById("calender");

    const numberOfDays = getMonthDays(selectedMonth, selectedYear);
    const numberOfDayPrevouslyMonth = getMonthDays(selectedMonth - 1, selectedYear);
    const firstWeekdayInMonth = findFirstWeekDay(selectedMonth, selectedYear);

    for (let i = 0; i < gridSize; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.id = "calenderDay" + i;
        if (i < firstWeekdayInMonth) {
            dayDiv.innerText = numberOfDayPrevouslyMonth - (firstWeekdayInMonth - 1 - i);
            dayDiv.className = "grey";
        }
        else if (i < firstWeekdayInMonth + numberOfDays) {
            dayDiv.innerText = i - firstWeekdayInMonth + 1;
        }
        else {
            dayDiv.innerText = i - numberOfDays;
            dayDiv.className = "grey";
        }

        const calenderDay = document.getElementById("calenderDay" + i);
        calenderGrid.replaceChild(dayDiv, calenderDay)
    }

    const monthYearH2 = document.getElementById("monthYearH2");
    monthYearH2.innerText = months[selectedMonth] + " " + selectedYear;
}

function addEventListeners()
{
    const prevButton = document.getElementById("prev-month");
    prevButton.addEventListener("click", previousMonth);
    
    const nextButton = document.getElementById("next-month");
    nextButton.addEventListener("click", nextMonth);
}

function previousMonth()
{
    selectedMonth--;
    
    if(selectedMonth < 0)
    {
        selectedMonth = 11;
        selectedYear--;
    }

    updateCalender();
}

function nextMonth() {
    selectedMonth++;

    if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear++;
    }

    updateCalender();
}

function findFirstWeekDay(monthInt, yearInt){
    const firstWeekDay = new Date(yearInt, monthInt).getDay();
    if (firstWeekDay == 0)
    {
        return 6;
    }
    else
    {
        return firstWeekDay-1;
    }
}

function getMonthDays(monthInt, yearInt){
    return new Date(yearInt, monthInt+1, 0).getDate();
}

const gridSize = 42;
const year = new Date().getFullYear();
const month = new Date().getMonth();
let selectedMonth = month;
let selectedYear = year;
var months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
