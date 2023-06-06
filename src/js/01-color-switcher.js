const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const COLOR_DELAY = 1000;
let bodyStyle = document.body.style;
let intervalId = null;
  
startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  console.log('hello')
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  intervalId = setInterval(() => {
    bodyStyle.backgroundColor = getRandomHexColor();
  }, COLOR_DELAY);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
