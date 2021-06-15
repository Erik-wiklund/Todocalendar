const swedishWeekends = []; // array av röda dagar för aktuell månad

async function fetchCalendarInfo() {
    const url = 'https://api.dryg.net/dagar/v2.1/' + selectedYear + '/' + (selectedMonth + 1);
    const response = await fetch(url);
    const data = await response.json();

    // Kan kommenteras bort sedan, skriver enbart ut
    // månadens dagar + information om dessa
    console.log(data.dagar); 

    // Lägger svenska helgdagar till lokal array
    for (const day of data.dagar) {
        if (day['helgdag']) {
            console.log(day['datum']);
            swedishWeekends.push(day['datum']);
        }
    }
}

// Funktion för att faktiskt kontrollera 
// om dagen i fråga är en helgdag
function checkIfSweWeekend(day) {
    
}

// Hämtad från StackOverflow
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}