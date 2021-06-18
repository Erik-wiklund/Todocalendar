async function tryFetchCalenderInfo() {
    try {
        await fetchCalendarInfo();
    } catch (error) {
        console.error(error);
    }
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
            dayDiv.classList.add("min-height-calender");
        }
        else if (i < firstWeekdayInMonth + numberOfDays) {
            dayDiv.id = selectedYear + "-" + (selectedMonth + 1) + "-" + (i - firstWeekdayInMonth + 1);
            dayDiv.innerHTML = i - firstWeekdayInMonth + 1;
            dayDiv.addEventListener("click", showTodos);
            dayDiv.classList.add("pointer");
            dayDiv.classList.add("min-height-calender");

            if (todoDictionary.length && todoDictionary.find(x => x.key === dayDiv.id)) {

                var numberoftodos = todoDictionary.find(x => x.key === dayDiv.id).value.length;
                if (numberoftodos > 0) {

                    let number = document.createElement("div");
                    const posdiv = document.createElement("div");
                    posdiv.className = "position-absolute-task"
                    number.className = "overflow-tasks";

                    if (2 > numberoftodos > 0) {
                        number.innerText = (numberoftodos + ' uppgift idag');
                    } else {
                        number.innerText = (numberoftodos + ' uppgifter idag');
                    };

                    posdiv.append(number);
                    dayDiv.append(posdiv);
                }
            }

            // Kontrollera om helgdag
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

            if (prevSelected && prevSelected.id === dayDiv.id) {
                dayDiv.classList.add(getLastClassNameFromElement(prevSelected));
                prevSelected = dayDiv;
            }
        }
        else {
            dayDiv.innerText = i - (numberOfDays + firstWeekdayInMonth - 1);
            dayDiv.className = "grey";
            dayDiv.classList.add("min-height-calender");
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
        await tryFetchCalenderInfo();
    }
    createCalender();
}

async function nextMonth() {
    selectedMonth++;

    if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear++;
        await tryFetchCalenderInfo();
    }
    createCalender();
}

function showTodos(event) {

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

    if (!prevSelected) {
        prevSelected = event.target;
    }
    else if (event.target.id !== prevSelected.id) {
        prevSelected.classList.toggle(getLastClassNameFromElement(prevSelected));
        prevSelected = event.target;
    }
    else if (event.target.id == prevSelected.id) {
        prevSelected = undefined;
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

function getLastClassNameFromElement(element) {
    return element.classList[prevSelected.classList.length - 1];
}

const gridSize = 42;
let selectedMonth = new Date().getMonth();
let selectedYear = new Date().getFullYear();
let prevSelected;
const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
