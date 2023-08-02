import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDateEl = document.querySelector('input#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const timer = {
  timerId: null,
  start() {
    const startTime = chooseDate.selectedDates[0].getTime();

    btnStartEl.setAttribute('disabled', true);

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      if (deltaTime < 1000) {
        Notiflix.Notify.success('Success!');
        btnStartEl.setAttribute('disabled', true);
        this.close();
      }
    }, 1000);
  },
  close() {
    clearInterval(this.timerId);
  },
};

const chooseDate = flatpickr(inputDateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.setAttribute('disabled', true);
    } else {
      btnStartEl.setAttribute('disabled', false);
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
