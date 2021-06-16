window.addEventListener("load", main);


async function main() {
    try {
        await fetchCalendarInfo();
    } catch (error) {
        console.error(error);
    }
    load();
    addEventListeners();
    createCalender();
}

function createCalender() {
    const calenderGrid = document.getElementById("calender");

    for (let i = calenderGrid.childNodes.length; i > 19; i--) {
        calenderGrid.childNodes.item(i - 1).remove();
    }

    const numberOfDays = getMonthDays(selectedMonth, selectedYear);
    const numberOfDayPrevouslyMonth = getMonthDays(selectedMonth - 1, selectedYear);
    const firstWeekdayInMonth = findFirstWeekDay(selectedMonth, selectedYear);

    for (let i = 0; i < gridSize; i++) {
        const dayDiv = document.createElement("div");
        if (i < firstWeekdayInMonth) {
            dayDiv.innerText = numberOfDayPrevouslyMonth - (firstWeekdayInMonth - 1 - i);
            dayDiv.className = "grey";
        }
        else if (i < firstWeekdayInMonth + numberOfDays) {
            dayDiv.id = selectedYear + "-" + (selectedMonth + 1) + "-" + (i - firstWeekdayInMonth + 1);
            dayDiv.innerHTML = i - firstWeekdayInMonth + 1;
            dayDiv.addEventListener("click", showTodos);
            dayDiv.classList.add("pointer");

            if (todoDictionary.length && todoDictionary.find(x => x.key === dayDiv.id)) {

                var numberoftodos = todoDictionary.find(x => x.key === dayDiv.id).value.length;
                if (numberoftodos > 0) {

                    let number = document.createElement("div");
                    const posdiv = document.createElement("div");
                    posdiv.className = "position-absolute-task"
                    number.className = "overflow";

                    if (2 > numberoftodos > 0) {
                        number.innerText = (numberoftodos + ' uppgift idag');
                    } else {
                        number.innerText = (numberoftodos + ' uppgifter idag');
                    };

                    posdiv.append(number);
                    dayDiv.append(posdiv);
                }
            }

            if (prevSelected && prevSelected.id === dayDiv.id) {
                prevSelected = dayDiv;
                dayDiv.classList.add("selectedDiv");
            }

            // Kontrollera om helgdag
            const sweholiday = swedishWeekends.find(x => x.date == formatDate(dayDiv.id));
            if (sweholiday) {
                dayDiv.className = "red pointer";

                const dayName = document.createElement("p");
                const posdiv = document.createElement("div");

                posdiv.className = "position-absolute"
                dayName.className = "overflow"

                dayName.innerText = sweholiday.holiday;
                posdiv.append(dayName);
                dayDiv.append(posdiv);

            }
        }
        else {
            dayDiv.innerText = i - (numberOfDays + firstWeekdayInMonth - 1);
            dayDiv.className = "grey";
        }

        calenderGrid.append(dayDiv);
    }

    const calenderHeader = document.getElementById("calender-header");
    const h2Div = document.querySelector("div.calender-weekdays-header > h2");

    if (h2Div) {
        h2Div.innerText = months[selectedMonth] + " " + selectedYear;
    }
    else {
        const h2Div = document.createElement("h2");
        h2Div.innerText = months[selectedMonth] + " " + selectedYear;
        const nextMonth = document.getElementById("next-month");

        calenderHeader.insertBefore(h2Div, nextMonth);
    }
}

function addEventListeners() {
    const prevButton = document.getElementById("prev-month");
    prevButton.addEventListener("click", previousMonth);

    const nextButton = document.getElementById("next-month");
    nextButton.addEventListener("click", nextMonth);
}

async function previousMonth() {
    selectedMonth--;

    if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear--;
        await fetchCalendarInfo();
    }
    createCalender();
}

async function nextMonth() {
    selectedMonth++;

    if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear++;
        await fetchCalendarInfo();
    }
    createCalender();
}

function showTodos(event) {

    if (prevSelected == null) {
        prevSelected = event.target.id;
        newSelected = event.target;
        event.target.classList.toggle("selectedDiv");
        initTodoList(event.target.id);
    }
    else if (event.target.id !== prevSelected && prevSelected !== null) {
        newSelected.classList.remove("selectedDiv");
        event.target.classList.toggle("selectedDiv")
        prevSelected = event.target.id;
        newSelected = event.target;
        initTodoList(event.target.id);
    }
    else if (event.target.id == event.target.id) {
        event.target.classList.toggle("selectedDiv");
    }
}

function findFirstWeekDay(monthInt, yearInt) {
    const firstWeekDay = new Date(yearInt, monthInt).getDay();
    if (firstWeekDay == 0) {
        return 6;
    }
    else {
        return firstWeekDay - 1;
    }
}

function getMonthDays(monthInt, yearInt) {
    return new Date(yearInt, monthInt + 1, 0).getDate();
}

const gridSize = 42;
let selectedMonth = new Date().getMonth();
let selectedYear = new Date().getFullYear();
let prevSelected = null;
let newSelected;
var months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
