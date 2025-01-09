let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

// Start/Stop functionality
function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('start-stop').textContent = "Start";
  } else {
    timer = setInterval(updateTime, 10); // Update every 10 milliseconds
    document.getElementById('start-stop').textContent = "Pause";
  }
  isRunning = !isRunning;
}

// Update time display
function updateTime() {
  milliseconds++;

  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  // Format the time (HH:MM:SS.milliseconds)
  const formattedTime = formatTime(hours, minutes, seconds, milliseconds);
  document.getElementById('time-display').textContent = formattedTime;
}

// Format time to 2 digits (HH:MM:SS.mmm)
function formatTime(hours, minutes, seconds, milliseconds) {
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

// Pad numbers with leading zeros
function padZero(num, length = 2) {
  return num.toString().padStart(length, '0');
}

// Reset the stopwatch
function reset() {
  clearInterval(timer);
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCounter = 1;
  document.getElementById('time-display').textContent = "00:00:00.00";
  document.getElementById('start-stop').textContent = "Start";
  document.getElementById('lap-list').innerHTML = '';
}

// Record lap time
function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(hours, minutes, seconds, milliseconds);
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `Lap ${lapCounter}: <span>${lapTime}</span>`;
    document.getElementById('lap-list').appendChild(lapItem);
    lapCounter++;
  }
}