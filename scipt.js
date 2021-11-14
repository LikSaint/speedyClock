const clockHtml = document.getElementById('clock');
const speedHtml = document.getElementById('speed');

const date = new Date();
let finalTimestamp = date.getTime();
let correction = 10;

printTime();
printSpeed();
calculateTime();

function calculateTime() {
    let previousTimestamp = 0;
    let timestampDiff = 0;
    
    requestAnimationFrame(tick);
    function tick(timestamp) {
        requestAnimationFrame(tick);

        const corr = correction ? 1/correction*10 : 0;

        timestampDiff += timestamp -  previousTimestamp;

        // print only when it's necessary for optimization
        if (corr && timestampDiff > 1000 * corr) {

            const diff = Math.trunc(timestampDiff / (1000 * corr)) * 1000; 


            finalTimestamp = finalTimestamp + diff;
            timestampDiff = timestampDiff - (diff * corr)

            printTime();
        }

        if (!corr) {
            timestampDiff = 0;
        }
        previousTimestamp = timestamp;
    }
}

function printTime() {
    const newDate = new Date(finalTimestamp);
    clockHtml.innerHTML = newDate.toLocaleTimeString();
}

function printSpeed() {
    speedHtml.innerHTML = correction / 10;
}

function handleKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
            correction++;
            break;
        case 'ArrowDown':
            correction--;
            break;
        default:
            break;
    }
    printSpeed();
}

document.addEventListener('keydown', handleKeyDown);