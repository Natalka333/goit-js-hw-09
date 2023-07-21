const btnStartEl = document.querySelector('.button[data-start]');
const btnStopEl = document.querySelector('.button[data-stop]');

btnStartEl.addEventListener('click', onStart);
btnStopEl.addEventListener('click', onStop);

function onStart() {}
function onStop() {}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
