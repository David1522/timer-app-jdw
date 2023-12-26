const alert_container = document.querySelector('.alert-container');
const countdown = document.querySelector('.countdown');
const start_btn = document.getElementById('start-btn');
const stop_btn = document.getElementById('stop-btn');
const reset_btn = document.getElementById('reset-btn');
const counter_alert = document.querySelector('.alert-countdown-container');
const audio = new Audio('../SOUND/countdown_finished.mp3');

countdown.innerHTML = (`${JSON.parse(sessionStorage.getItem('start-time'))}:00`) || 0;

disableButtons();

let startTime = JSON.parse(sessionStorage.getItem('start-time')) || 0;
let totalTime = startTime * 60;
let intervalID;

start_btn.addEventListener('click', () => {
  if (totalTime == 0) {
    counter_alert.innerHTML = `<p>The counter cannot be 0. Try with a bigger number.</p>`;
  } else {
    disableButtons('Start')
    intervalID = setInterval(countdownTime, 1000);
  }
});


stop_btn.addEventListener('click', () => {
  disableButtons('Stop');
  clearInterval(intervalID);
});

reset_btn.addEventListener('click', () => {
  disableButtons();
  totalTime = startTime * 60;
  clearInterval(intervalID);
  countdown.innerHTML = `${startTime}:00`;
});

function countdownTime () {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;

  seconds < 10 ? seconds = '0' + seconds : 0;

  totalTime--;

  countdown.innerHTML = `${minutes}:${seconds}`;

  if (totalTime == 0) {
    audio.play();
    clearInterval(intervalID);
    disableButtons('Finish');
  }
}

function disableButtons (button_pressed) {
  if (button_pressed === 'Start') {
    start_btn.disabled = true;
    stop_btn.disabled = false;
    reset_btn.disabled = false;
  } else if (button_pressed === 'Stop') {
    start_btn.disabled = false;
    stop_btn.disabled = true;
    reset_btn.disabled = false;
  } else if (button_pressed === 'Finish') {
    start_btn.disabled = true;
    stop_btn.disabled = true;
    reset_btn.disabled = false;
  } else {
    start_btn.disabled = false;
    stop_btn.disabled = true;
    reset_btn.disabled = true;
  }
}

// Update Countdown
document.getElementById('update-input').addEventListener('click', (e) => {
  e.preventDefault();

  updatedTime = document.getElementById('focus-time-input').value;

  if (updatedTime < 0) {
    alert_container.innerHTML = `
      <p>Negative values are not allowed, try again please.</p>
    `;
  } else {
    alert_container.innerHTML = '';
    countdown.innerHTML = `${updatedTime}:00`;
    sessionStorage.setItem('start-time', JSON.stringify(startTime));
    totalTime = updatedTime * 60;
    startTime = updatedTime;
  }
});