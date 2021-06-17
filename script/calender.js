window.addEventListener("load", main);


async function main() {
    await fetchCalendarInfo();
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

            if (todoDictionary.length && todoDictionary.find(x => x.key === dayDiv.id)) {

                var numberoftodos = todoDictionary.find(x => x.key === dayDiv.id).value.length;
                if (numberoftodos > 0) {
                    let number = document.createElement("div");
                    number.className = "task-div";
                    number.innerText = numberoftodos;
                    dayDiv.append(number);
                }
            }

            if (prevSelected && prevSelected.id === dayDiv.id) {
                prevSelected = dayDiv;
                dayDiv.classList.add("selectedDiv");
            }
            
            // Kontrollera om helgdag
            const sweholiday = swedishWeekends.find(x => x.date == formatDate(dayDiv.id));
            if (sweholiday) {
                dayDiv.className = "red";
                const dayName = document.createElement("p");
                
                dayName.innerText = sweholiday.holiday;
                dayDiv.append(dayName);
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
    // Skriver ut månad + år
    if (h2Div) {
        h2Div.innerText = months[selectedMonth] + " " + selectedYear;
        changeBackgroundImageAccordingToSeason(months[selectedMonth]);
    }
    else {
        const h2Div = document.createElement("h2");
        h2Div.innerText = months[selectedMonth] + " " + selectedYear;
        changeBackgroundImageAccordingToSeason(months[selectedMonth]);
        const nextMonth = document.getElementById("next-month");

        calenderHeader.insertBefore(h2Div, nextMonth);
    }
}

// Function for changing background image
function changeBackgroundImageAccordingToSeason(month) {
    const divToChange = document.getElementById('calender');

    if (isFall(month)) {
        removeSeasons(divToChange);
        setFall(divToChange);
    } else if (isSummer(month)) {
        removeSeasons(divToChange);
        setSummer(divToChange);
    }
    else if (isWinter(month)) {
        removeSeasons(divToChange);
        setWinter(divToChange);
    }
    else if (isSpring(month)) {
        removeSeasons(divToChange);
        setSpring(divToChange);
    }
}

/** Functions for checking season */
function isFall(month) {
    if (month == 'September' || month == 'Oktober' || month == 'November') {
        return true;
    }
}

function isSummer(month) {
    if (month == 'Juni' || month == 'Juli' || month == 'Augusti') {
        return true;
    }
}

function isSpring(month) {
    if (month == 'Mars' || month == 'April' || month == 'Maj') {
        return true;
    }
}

function isWinter(month) {
    if (month == 'December' || month == 'Januari' || month == 'Februari') {
        return true;
    }
}

/** Set appropriate season */
function setSummer(divToChange) {
    divToChange.classList.add('calendar-grid-image-summer');
}

function setFall(divToChange) {
    divToChange.classList.add('calendar-grid-image-fall');
}

function setWinter(divToChange) {
    divToChange.classList.add('calendar-grid-image-winter');
}

function setSpring(divToChange) {
    divToChange.classList.add('calendar-grid-image-spring');
}

/** remove classes from calendar background */
function removeSeasons(divToChange) {
    divToChange.classList.remove(
        'calendar-grid-image-winter',
        'calendar-grid-image-fall',
        'calendar-grid-image-summer',
        'calendar-grid-image-spring'
    )
}

function addEventListeners() {
    const prevButton = document.getElementById("prev-month");
    prevButton.addEventListener("click", previousMonth);

    const nextButton = document.getElementById("next-month");
    nextButton.addEventListener("click", nextMonth);
}

function previousMonth() {
    selectedMonth--;

    if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear--;
    }

    createCalender();
}

function nextMonth() {
    selectedMonth++;

    if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear++;
    }

    createCalender();
}

function showTodos(event) {

    if (event.target !== this) {
        return;
    }

    if (prevSelected) {
        prevSelected.classList = "";
    }

    prevSelected = event.target;
    const calender = document.getElementById("calender");
    if (calender.classList.contains("calendar-grid-image-summer")) {
        event.target.classList.add("selectedDiv-summer");
    }
    else if (calender.classList.contains("calendar-grid-image-winter")) {
        event.target.classList.add("selectedDiv-winter");
    }
    else if (calender.classList.contains("calendar-grid-image-spring")) {
        event.target.classList.add("selectedDiv-spring");
    }
    else if (calender.classList.contains("calendar-grid-image-fall")) {
        event.target.classList.add("selectedDiv-fall");
    }
    
    initTodoList(event.target.id);
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
let prevSelected;
var months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
