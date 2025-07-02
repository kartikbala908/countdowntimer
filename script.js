let timer = null;
let startDate = null;
let endDate = null;

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const input = document.getElementById("datetime");
const statusText = document.getElementById("status");
const targetText = document.getElementById("target-date");
const timerSection = document.getElementById("timer-section");

startBtn.addEventListener("click", () => {
  const userDate = new Date(input.value);
  if (!input.value || userDate <= new Date()) {
    alert("Please select a future date and time!");
    return;
  }

  startDate = Date.now();
  endDate = userDate.getTime();
  targetText.textContent = "🎯 Target: " + userDate.toLocaleString();

  timerSection.classList.remove("hidden");
  resetBtn.classList.remove("hidden");

  if (timer) clearInterval(timer);
  timer = setInterval(updateCountdown, 1000);
  updateCountdown();
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  input.value = "";
  timerSection.classList.add("hidden");
  resetBtn.classList.add("hidden");
  targetText.textContent = "";
  statusText.textContent = "";
  setTime(0, 0, 0, 0);
  document.getElementById("progress-bar").style.width = "0%";
});

function updateCountdown() {
  const now = Date.now();
  const remaining = endDate - now;
  const total = endDate - startDate;

  if (remaining <= 0) {
    clearInterval(timer);
    setTime(0, 0, 0, 0);
    document.getElementById("progress-bar").style.width = "100%";
    statusText.textContent = "⏰ Time's Up!";
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  setTime(days, hours, minutes, seconds);
  const progress = ((now - startDate) / total) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
  statusText.textContent = "⏱️ Counting down...";
}

function setTime(d, h, m, s) {
  document.getElementById("days").textContent = format(d);
  document.getElementById("hours").textContent = format(h);
  document.getElementById("minutes").textContent = format(m);
  document.getElementById("seconds").textContent = format(s);
}

function format(n) {
  return n < 10 ? "0" + n : n;
}
