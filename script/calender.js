const gridSize = 42;
const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];

async function tryFetchCalenderInfo() {
    try {
        await fetchCalendarInfo();
    } catch (error) {
        console.error(error);
    }
}

function addEventListeners() {
    const prevButton = document.getElementById("prev-month");
    prevButton.addEventListener("click", previousMonth);

    const nextButton = document.getElementById("next-month");
    nextButton.addEventListener("click", nextMonth);
}

function createCalender() {
    printCalendarHeader();
    const calenderGrid = document.getElementById("calender");

    // Empties grid, excluding beginning of grid (weekdays)
    for (let i = calenderGrid.childNodes.length; i > 19; i--) {
        calenderGrid.childNodes.item(i - 1).remove();
    }

    const numberOfDays = getMonthDays(state.selectedMonth, state.selectedYear);
    const numberOfDayPrevouslyMonth = getMonthDays(state.selectedMonth - 1, state.selectedYear);
    const firstWeekdayInMonth = findFirstWeekDay(state.selectedMonth, state.selectedYear);

    // Loops through grid 7*7s
    for (let i = 0; i < gridSize; i++) {
        const dayDiv = document.createElement("div");
        
        // If day precedes current month
        if (i < firstWeekdayInMonth) {
            daysOutsideOfCurrentMonth(dayDiv, "grey min-height-calender", numberOfDayPrevouslyMonth - (firstWeekdayInMonth - 1 - i));
        }
        // If day is in current month
        else if (i < firstWeekdayInMonth + numberOfDays) {
            dayDiv.id = state.selectedYear + "-" + (state.selectedMonth + 1) + "-" + (i - firstWeekdayInMonth + 1);
            dayDiv.innerHTML = i - firstWeekdayInMonth + 1;
            dayDiv.addEventListener("click", showTodos);
            dayDiv.className = "pointer min-height-calender";

            if (state.todoDictionary.length && state.todoDictionary.find(x => x.key === dayDiv.id)) {
                var numberoftodos = state.todoDictionary.find(x => x.key === dayDiv.id).value.length;
                if (numberoftodos > 0) {
                    const posdiv = createsDivWithSpecifiedNumberOfTodos(numberoftodos);
                    dayDiv.append(posdiv);
                }
            }
            
            markDayRedIfSwedishHoliday(dayDiv);
            
            // If day is selected keep selection
            if (state.prevSelected && state.prevSelected.id === dayDiv.id) {
                dayDiv.classList.add(getLastClassNameFromElement(state.prevSelected));
                state.prevSelected = dayDiv;
            }
        }
        // If day exceeds current month
        else {
            daysOutsideOfCurrentMonth(dayDiv, "grey min-height-calender", i - (numberOfDays + firstWeekdayInMonth - 1));
        }
        calenderGrid.append(dayDiv);
    }
}

function printCalendarHeader() {
    const calenderHeader = document.getElementById("calender-header");
    const h2Div = document.querySelector("div.calender-weekdays-header > h2");
    // Skriver ut månad + år
    if (h2Div) {
        h2Div.innerText = months[state.selectedMonth] + " " + state.selectedYear;
        changeBackgroundImageAccordingToSeason(months[state.selectedMonth]);
        changeSidePanelColorAccordingToSeason(months[state.selectedMonth]); // To change color on side panel
    }
    else {
        const h2Div = document.createElement("h2");
        h2Div.innerText = months[state.selectedMonth] + " " + state.selectedYear;
        changeBackgroundImageAccordingToSeason(months[state.selectedMonth]);
        const nextMonth = document.getElementById("next-month");
        h2Div.className += " text-center"

        calenderHeader.insertBefore(h2Div, nextMonth);
        changeSidePanelColorAccordingToSeason(months[state.selectedMonth]); // To change color on side panel
    }
}

function markDayRedIfSwedishHoliday(dayDiv) {
    const sweholiday = swedishWeekends.find(x => x.date == formatDate(dayDiv.id));

    if (sweholiday) {
        dayDiv.className += " red pointer";

        const dayName = document.createElement("p");
        const posdiv = document.createElement("div");

        posdiv.className = "position-absolute"
        dayName.className = "overflow"

        dayName.innerText = sweholiday.holiday;
        posdiv.append(dayName);
        dayDiv.append(posdiv);
    }
}

function createsDivWithSpecifiedNumberOfTodos(numberOfTodos) {
    let number = document.createElement("div");
    const posdiv = document.createElement("div");
    posdiv.className = "position-absolute-task"
    number.className = "overflow-tasks";

    if (2 > numberOfTodos > 0) {
        number.innerText = (numberOfTodos + ' uppgift idag');
    } else {
        number.innerText = (numberOfTodos + ' uppgifter idag');
    };

    posdiv.append(number);
    return posdiv;
}

function daysOutsideOfCurrentMonth(element, classname, day) {
    element.innerText = day;
    element.className = classname;
}

// function for changing color on side panel
function changeSidePanelColorAccordingToSeason(month) {
    const divToChangeColorFor = document.getElementById("sidepanel");
    removeColors(divToChangeColorFor);

    if (isFall(month)) {
        divToChangeColorFor.classList.add("fall-background");
    } else if (isSpring(month)) {
        divToChangeColorFor.classList.add("spring-background");
    } else if (isWinter(month)) {
        divToChangeColorFor.classList.add("winter-background");
    } else if (isSummer(month)) {
        divToChangeColorFor.classList.add("summer-background");
    }
}

// For removing color classes
function removeColors(divToChangeColorFor) {
    divToChangeColorFor.classList.remove(
        'summer-background',
        'fall-background',
        'winter-background',
        'spring-background'
    )
}

// Function for changing background image
function changeBackgroundImageAccordingToSeason(month) {
    const divToChange = document.getElementById('calender');

    removeSeasons(divToChange);

    if (isFall(month)) {
        setSeason(divToChange, "calendar-grid-image-fall")
    } else if (isSummer(month)) {
        setSeason(divToChange, "calendar-grid-image-summer")
    }
    else if (isWinter(month)) {
        setSeason(divToChange, "calendar-grid-image-winter")
    }
    else if (isSpring(month)) {
        setSeason(divToChange, "calendar-grid-image-spring")
    }
}

/** Functions for checking season */
function isFall(month) {
    if (month == 'September' || month == 'Oktober' || month == 'November') { return true; }
}

function isSummer(month) {
    if (month == 'Juni' || month == 'Juli' || month == 'Augusti') { return true; }
}

function isSpring(month) { 
    if (month == 'Mars' || month == 'April' || month == 'Maj') { return true; }
}

function isWinter(month) {
    if (month == 'December' || month == 'Januari' || month == 'Februari') { return true; }
}
/** - - - - - - - - - - - - - -  */

/** Set appropriate season */
function setSeason(divToChange, seasonClass) {
    divToChange.classList.add(seasonClass);
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

async function previousMonth() {
    state.selectedMonth--;

    if (state.selectedMonth < 0) {
        state.selectedMonth = 11;
        state.selectedYear--;
        await tryFetchCalenderInfo();
    }
    createCalender();
}

async function nextMonth() {
    state.selectedMonth++;

    if (state.selectedMonth > 11) {
        state.selectedMonth = 0;
        state.selectedYear++;
        await tryFetchCalenderInfo();
    }
    createCalender();
}

function showTodos(event) {

    // Changes season color for selected day
    if (event.target) {
        let seasonString = "";
        const calender = document.getElementById("calender");
        if (calender.classList.contains("calendar-grid-image-summer")) {
            seasonString = "selectedDiv-summer";
        }
        else if (calender.classList.contains("calendar-grid-image-winter")) {
            seasonString = "selectedDiv-winter";
        }
        else if (calender.classList.contains("calendar-grid-image-spring")) {
            seasonString = "selectedDiv-spring";
        }
        else if (calender.classList.contains("calendar-grid-image-fall")) {
            seasonString = "selectedDiv-fall";
        }
        event.target.classList.toggle(seasonString);
    }

    // Checks selected day
    if (!state.prevSelected) {
        state.prevSelected = event.target;
    }
    else if (event.target.id !== state.prevSelected.id) {
        state.prevSelected.classList.toggle(getLastClassNameFromElement(state.prevSelected));
        state.prevSelected = event.target;
    }
    else if (event.target.id == state.prevSelected.id) {
        state.prevSelected = undefined;
    }

    initTodoList(event.target.id);
}

// Finds first weekday of month
function findFirstWeekDay(monthInt, yearInt) {
    const firstWeekDay = new Date(yearInt, monthInt).getDay();
    if (firstWeekDay == 0) {
        return 6;
    }
    else {
        return firstWeekDay - 1;
    }
}

// Returns number of days in month
function getMonthDays(monthInt, yearInt) {
    return new Date(yearInt, monthInt + 1, 0).getDate();
}

// Returns last class of element (class name "prevSelected" is always last)
function getLastClassNameFromElement(element) {
    return element.classList[state.prevSelected.classList.length - 1];
}