import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDateEl = document.querySelector('input#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userData;
btnStartEl.setAttribute('disabled', true);
const timer = {
  timerId: null,
  start() {


    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userData - currentTime;
      console.log(deltaTime);
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
      inputDateEl.setAttribute('disabled', '');
      if (deltaTime < 1000) {
        Notiflix.Notify.success('Timer is over');
        inputDateEl.removeAttribute('disabled');
        clearInterval(this.timerId);
      }
    }, 1000);

    btnStartEl.setAttribute('disabled', true);
  },
};

const chooseDate = flatpickr(inputDateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.setAttribute('disabled', true);
    } else {
      userData = selectedDates[0].getTime();
      btnStartEl.removeAttribute('disabled');

      btnStartEl.addEventListener('click', timer.start);
    }
  },
});

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
