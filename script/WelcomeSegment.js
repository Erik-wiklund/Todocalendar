window.addEventListener('load', main);

function main() {
    printTimeOfDay();

    printDayDateAndMonth();
}

function printDayDateAndMonth(params) {
    let date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString('sv', options);
    document.getElementById('date').innerHTML = dateString;
}

function printTimeOfDay() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    if (seconds < 10) {
        seconds = '0' + seconds
    }

    var t_str = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clock').innerHTML = t_str;
}
setInterval(printTimeOfDay, 500);