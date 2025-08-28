let clockInterval;
let is24Hour = true;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = "";
  if (!is24Hour) {
    ampm = hours >= 12 ? " PM":" AM";
    hours = hours % 12 || 12;
  }

document.getElementById("clock").innerHTML =
  String(hours).padStart(2, '0') + ":" +
  String(minutes).padStart(2, '0') + ":" +
  String(seconds).padStart(2, '0') +
  `<span class="ampm">${ampm}</span>`;
}

document.getElementById("startClock").onclick = () => {
  if (!clockInterval) {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }
};
document.getElementById("stopClock").onclick = () => {
  clearInterval(clockInterval);
  clockInterval = null;
};
document.getElementById("toggleFormat").onclick = () => {
  is24Hour = !is24Hour;
  updateClock();
};


window.onload = function () {
  document.getElementById("startClock").click();
};


let timerInterval;
let totalSeconds = 0;

function updateTimerDisplay() {
  let min = Math.floor(totalSeconds / 60);
  let sec = totalSeconds % 60;
  document.getElementById("timerDisplay").textContent =
    String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}

document.getElementById("startTimer").onclick = () => {
  let min = parseInt(document.getElementById("min").value) || 0;
  let sec = parseInt(document.getElementById("sec").value) || 0;
  if (totalSeconds === 0) {
  totalSeconds = min * 60 + sec;
}

  if (totalSeconds > 0 && !timerInterval) {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      totalSeconds--;
      updateTimerDisplay();
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("beep").play();
      }
    }, 1000);
  }
};

document.getElementById("stopTimer").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

document.getElementById("resetTimer").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = 0;
  updateTimerDisplay();
};

updateTimerDisplay();
