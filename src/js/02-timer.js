import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const selector = document.querySelector('input#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let timeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDifference = selectedDates[0];

    if (currentDifference < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.setAttribute('disabled', true);
    } else {
      btnStartEl.setAttribute('disabled', false);
    }
  },
};

// function currentDifference(selectedDates) {
//   timeDifference = selectedDates.getTime() - currentDate;
//   const { days, hours, minutes, seconds } = convertMs(timeDifference);
//   daysEl.textContent = days;
//   hoursEl.textContent = hours;
//   minutesEl.textContent = minutes;
//   secondsEl.textContent = seconds;
//   btnStartEl.removeAttribute('disabled');
// }

flatpickr(selector, options);

btnStartEl.addEventListener('click', () => {
  const currentDifference = flatpickr.parseDate(selector.value);
  const currentDate = Date.now();
  timeDifference = currentDifference - currentDate;

  if (timeDifference <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
});

function onBtnStartTimer() {
  timerId = setInterval(startTimer, 1000);
}

// function startTimer() {
//   btnStartEl.setAttribute('disabled', true);
//   // timeDifference -= 1000;

//   if (
//     secondsEl.textContent <= 0 &&
//     minutesEl.textContent <= 0 &&
//     hoursEl.textContent <= 0 &&
//     daysEl.textContent <= 0
//   ) {
//     Notify.success('Time is up!');
//     clearInterval(timerId);
//   }
// }

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
