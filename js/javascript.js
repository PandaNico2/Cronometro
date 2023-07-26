let intervalId;
let timeRemaining = 0;
let paused = true; // Inicia pausado
let totalTime = 0; // Variável para armazenar o tempo total selecionado pelos botões

function addToTime(minutes, seconds = 0) {
  totalTime += minutes * 60 + seconds;
  if (paused) { // Se estiver pausado, atualiza o cronômetro
    timeRemaining = totalTime;
    updateTimerDisplay(timeRemaining);
  } else {
    const currentSeconds = timeRemaining % 60;
    timeRemaining = totalTime + currentSeconds;
    updateTimerDisplay(timeRemaining);
  }
}

function toggleTimer() {
  paused = !paused;
  if (!paused) { // Se for retomado, inicia o cronômetro
    startTimer();
  } else {
    stopTimer();
  }
}

function startTimer() {
  if (timeRemaining > 0) {
    paused = false;
    intervalId = setInterval(() => {
      if (!paused && timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        // Tocar áudio de alerta e piscar fundo em vermelho nos últimos 10 minutos e últimos 10 segundos
        if (timeRemaining <= 10) {
          playAlertSound();
          blinkBackgroundRed();
        } else if (timeRemaining === 600) {
          playAlertSound();
          blinkBackgroundRed();
        }
      } else if (timeRemaining === 0) {
        stopTimer();
        // alert("Tempo esgotado!");
      }
    }, 1000);
  }
}

function updateTimerDisplay(time) {
  const minutesDisplay = String(Math.floor(time / 60)).padStart(2, "0");
  const secondsDisplay = String(time % 60).padStart(2, "0");
  document.getElementById("minutes").textContent = minutesDisplay;
  document.getElementById("seconds").textContent = secondsDisplay;
}

function stopTimer() {
  clearInterval(intervalId);
  const timerDisplay = document.querySelector(".box_timer");
  timerDisplay.classList.remove("blink");
  resetBackground(); // Para garantir que o fundo pare de piscar ao parar o cronômetro

  // Pausar o áudio
  const alertSound = document.getElementById("alertSound");
  alertSound.pause();
}

function resetTimer() {
  stopTimer();
  totalTime = 0;
  timeRemaining = 0;
  updateTimerDisplay(timeRemaining);
  resetBackground(); // Para garantir que o fundo pare de piscar ao zerar o cronômetro
  paused = true; // Corrigindo para permitir adicionar mais tempo após zerar
}

function playAlertSound() {
  const alertSound = document.getElementById("alertSound");
  alertSound.play();
}

function blinkBackgroundRed() {
  const timerDisplay = document.querySelector(".box_timer");
  timerDisplay.classList.add("blink");
}

function resetBackground() {
  const timerDisplay = document.querySelector(".box_timer");
  timerDisplay.classList.remove("blink");
}
