const swedishWeekends = []; // array av röda dagar för aktuell månad

async function fetchCalendarInfo() {
    const url = 'https://api.dryg.net/dagar/v2.1/' + selectedYear;
    const response = await fetch(url);
    const data = await response.json();

    // Lägger svenska helgdagar till lokal array
    for (const day of data.dagar) {
        if (day['helgdag']) {
            //console.log(day['datum']);
            //console.log(day['helgdag']);
            swedishWeekends.push({
                date: day['datum'],
                holiday: day['helgdag']
            });
        }
    }
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