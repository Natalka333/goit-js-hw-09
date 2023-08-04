function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

let timerEl = null;
btnStopEl.setAttribute('disabled', '');

btnStartEl.addEventListener('click', () => {
  timerEl = setInterval(() => {
    const colorNew = getRandomHexColor();
    document.body.style.backgroundColor = colorNew;
  }, 1000);
  btnStartEl.setAttribute('disabled', '');
  btnStopEl.removeAttribute('disabled');
});

btnStopEl.addEventListener('click', () => {
  clearInterval(timerEl);
  btnStartEl.removeAttribute('disabled');
  btnStopEl.setAttribute('disabled', '');
});
