window.addEventListener('load', main);

function main() {
    //Tid
    getTimeOfDay();
    
    //Veckodag
    // getWeekDay();

    //Datum
}

function getTimeOfDay() {
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
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
setInterval(getTimeOfDay, 500);