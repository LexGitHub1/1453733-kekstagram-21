'use strict';

const Value = {
  MIN: 25,
  MAX: 100
};

const photoPrew = document.querySelector(`.img-upload__preview img`);
const scaleBtnMin = document.querySelector(`.scale__control--smaller`);
const scaleBtnMax = document.querySelector(`.scale__control--bigger`);
const counterValue = document.querySelector(`.scale__control--value`);

const clickMinusScaleHandler = () => {
  let scale = parseInt(counterValue.value, 10);
  if (scale <= Value.MAX && scale > Value.MIN) {
    scale -= Value.MIN;
  }
  changeImageStyle(scale);
};

scaleBtnMin.addEventListener(`click`, clickMinusScaleHandler);

const clickPlusScaleHandler = () => {
  let scale = parseInt(counterValue.value, 10);
  if (scale >= Value.MIN && scale < Value.MAX) {
    scale += Value.MIN;
  }
  changeImageStyle(scale);
};

scaleBtnMax.addEventListener(`click`, clickPlusScaleHandler);

const changeImageStyle = (number) => {
  switch (number) {
    case 25:
      photoPrew.style.transform = `scale(0.25)`;
      counterValue.value = `${number}%`;
      break;
    case 50:
      photoPrew.style.transform = `scale(0.50)`;
      counterValue.value = `${number}%`;
      break;
    case 75:
      photoPrew.style.transform = `scale(0.75)`;
      counterValue.value = `${number}%`;
      break;
    case 100:
      photoPrew.style.transform = `scale(1.00)`;
      counterValue.value = `${number}%`;
      break;
  }
};

window.scale = {
  photoPrew,
  counterValue
};
