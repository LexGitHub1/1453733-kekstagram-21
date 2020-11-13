'use strict';

const photoPrew = document.querySelector(`.img-upload__preview img`);
const scaleBtnMin = document.querySelector(`.scale__control--smaller`);
const scaleBtnMax = document.querySelector(`.scale__control--bigger`);
const scaleControlNum = document.querySelector(`.scale__control--value`);
let scale = 100;

scaleBtnMin.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  if (scale > 25) {
    scale -= 25;
    scaleControlNum.value = `${scale}%`;
    photoPrew.style.transform = `scale(${scale / 100})`;
  }
});

scaleBtnMax.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  if (scale < 100) {
    scale += 25;
    scaleControlNum.value = `${scale}%`;
    photoPrew.style.transform = `scale(${scale / 100})`;
  }
});

window.scale = {
  photoPrew
};
