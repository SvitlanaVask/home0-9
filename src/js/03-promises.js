import {Notify} from 'notiflix';

const formRef = document.querySelector('form');
const submitBtn = document.querySelector('button');

formRef.addEventListener('submit', onFormSubmit);
submitBtn.addEventListener('click', createPromise);

function onFormSubmit(evt) {
  evt.preventDefault();
  
  //Глибока деструктуризація 
  const { delay: {value: delay} } = evt.currentTarget.elements;
  const { step: { value: step } } = evt.currentTarget.elements;
  const { amount: { value: amount } } = evt.currentTarget.elements;
  
  for (let i = 1; i <= Number(amount); i+=1 ) {
    createPromise(i, Number(delay) + Number(step)*i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay); 
  });
}