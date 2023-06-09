import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {Notify} from 'notiflix';

const pickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const msgRef = document.querySelector('.message')
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minsRef = document.querySelector('[data-minutes]');
const secsRef = document.querySelector('[data-seconds]');

pickerInput.disabled = false;
startBtn.disabled = true;
stopBtn.disabled = true;

// Обєкт налаштувань для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // Метод бібліотеки flatpickr
  onClose(selectedDates) {
    const pickedDate = selectedDates[0].getTime();

    if (pickedDate <= Date.now()) {
      Notify.warning('Please, choose a date in the future');
    } else {
      startBtn.disabled = false;
      stopBtn.disabled = false;
    }
    // Повертає в обєкт timer обрану дату pickedDate
    timer.setTargetDate(pickedDate);
  },
};

//Ініціалізація бібліотеки
flatpickr('#datetime-picker', options);

//Таймер зворотного відліку
timer = {
  isActive: false,
  intervalId: null,

  // при зверненні this.targetDate в методі start() отримаємо вибрану дату
  setTargetDate(targetDate) {
    this.targetDate = targetDate;
  },

  start() {
    if (this.isActive) {
      return
    }
    
    this.intervalId = setInterval(() => {
      const deltaTime = this.targetDate - Date.now();

      if (deltaTime < 1000) {
        const time = this.convertMs(0);   
        updateTimerFace(time);

        msgRef.textContent = `Timer stopped on ${new Date()}`;

        return;
      } else {
        const time = this.convertMs(deltaTime);
        updateTimerFace(time);

        pickerInput.disabled = true;
        startBtn.disabled = true; 
      }
      
      stopBtn.disabled = false;
    }, 1000);
        
    this.isActive = true;
  },

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    
    const time = this.convertMs(0);   
    updateTimerFace(time);

    pickerInput.disabled = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

startBtn.addEventListener('click', () => {
  timer.start();
});

stopBtn.addEventListener('click', () => {
  timer.stop();
});

function updateTimerFace({ days, hours, minutes, seconds}) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = minutes;
  secsRef.textContent = seconds;
};