window.addEventListener('load', main);

function main() {
    let date = new Date()
    printTimeOfDay();
    printDayDateAndMonth(date);
}

function printDayDateAndMonth(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString('sv', options);
    document.getElementById('date').innerHTML = dateString;
}

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
//setInterval(printTimeOfDay, 1000);