let totalTime, remainingTime, timerInterval, running = false;

// Imposta il timer all'apertura della pagina
window.onload = function() {
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
}

function setupTimer() {
    let min = parseInt(document.getElementById('minutes').value) || 0;
    let sec = parseInt(document.getElementById('seconds').value) || 0;
    totalTime = remainingTime = min * 60 + sec;
    document.querySelector('.setup-container').style.display = 'none';
    document.getElementById('timerScreen').style.display = 'flex';
    updateDisplay();
}

function startTimer() {
    if (!running) {
        running = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (remainingTime > 0 && running) {
        remainingTime--;
        updateDisplay();
    } else if (remainingTime === 0) {
        clearInterval(timerInterval);
        document.getElementById('progress').style.background = 'red';
        document.getElementById('timerScreen').style.background = 'red';
        document.getElementById('timerText').textContent = 'FINE TEMPO';
    }
}

function pauseTimer() {
    running = !running;
}

function reimpostaTimer() {
    clearInterval(timerInterval);
    document.querySelector('.setup-container').style.display = 'block';
    document.getElementById('timerScreen').style.display = 'none';
    document.getElementById('progress').style.background = 'green';
    document.getElementById('timerScreen').style.background = 'black';
    running = false;
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
}

function addTime(secondsToAdd) {
    if (running) {
        remainingTime += secondsToAdd;  // Aggiunge il tempo al timer
        totalTime += secondsToAdd;  // Aggiorna anche il tempo totale
        updateDisplay();
    } else {
        remainingTime += secondsToAdd;  // Aggiunge il tempo anche se il timer è in pausa
        updateDisplay();
    }
}

function updateDisplay() {
    let min = Math.floor(remainingTime / 60);
    let sec = remainingTime % 60;
    document.getElementById('timerText').textContent = 
        String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
    let percentage = (remainingTime / totalTime) * 100;
    document.getElementById('progress').style.width = percentage + '%';
}
