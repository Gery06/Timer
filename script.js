let totalTime, remainingTime, timerInterval, running = false;

window.onload = function() {
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
    document.getElementById('timerScreen').style.display = 'none';
}

function setupTimer() {
    let min = parseInt(document.getElementById('minutes').value) || 0;
    let sec = parseInt(document.getElementById('seconds').value) || 0;

    if (min === 0 && sec === 0) return;

    totalTime = remainingTime = min * 60 + sec;
    document.querySelector('.setup-container').style.display = 'none';
    document.getElementById('timerScreen').style.display = 'flex';
    document.getElementById('progress').style.width = '100%';
    document.getElementById('progress').style.background = 'green';
    document.getElementById('timerScreen').style.background = 'black';
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
        document.getElementById('progress').style.width = `${(remainingTime / totalTime) * 100}%`;
    } else if (remainingTime === 0) {
        clearInterval(timerInterval);
        startFlashing();
        document.getElementById('progress').style.background = 'red';
        document.getElementById('timerText').textContent = 'FINE TEMPO';
    }
}

function startFlashing() {
    // Aggiungi la classe flash-red all'elemento che deve lampeggiare (il timer e il fondo)
    let timerScreen = document.getElementById('timerScreen');
    let timerText = document.getElementById('timerText');

    // Aggiungi la classe flash-red al fondo
    timerScreen.classList.add('flash-red');
    
    // Facoltativamente, aggiungi la classe anche al testo per farlo lampeggiare (se desiderato)
    timerText.classList.add('flash-red');
    
    // Rimuovi il timer dal ciclo e imposta il testo a "FINE TEMPO"
    timerText.textContent = 'FINE TEMPO';
}



function reimpostaTimer() {
    location.reload();
}

function updateDisplay() {
    let min = Math.floor(remainingTime / 60);
    let sec = remainingTime % 60;
    document.getElementById('timerText').textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
