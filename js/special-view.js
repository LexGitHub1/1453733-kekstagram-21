'use strict';

const DEFAULT_EFFECT_LEVEL = 100;

const effectField = document.querySelector(`.img-upload__effect-level`);
const effects = document.querySelector(`.effects`);
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelDepth = effectField.querySelector(`.effect-level__depth`);
const effectPin = effectField.querySelector(`.effect-level__pin`);
const effectPinValue = effectField.querySelector(`.effect-level__value`);
const effectsItemFirst = document.querySelector(`.effects__item:first-child`);
const effectsItem = document.querySelectorAll(`.effects__item`);

const maxEffectsValues = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: [1, 2],
};

const effectChangeHandler = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    window.scale.photoPrew.className = ``;
    setDefaultDepth();
    window.scale.photoPrew.className = `effects__preview--${evt.target.value}`;
  }
};

effects.addEventListener(`click`, effectChangeHandler);

const setDefaultDepth = () => {
  effectPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
  effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
  effectPinValue.value = DEFAULT_EFFECT_LEVEL;
  window.scale.photoPrew.style.filter = ``;
};

const setNewEffectDepth = (levelValue) => {
  const value = levelValue / 100;

  if (window.scale.photoPrew.className.match(`effects__preview--`)) {
    switch (window.scale.photoPrew.className) {
      case `effects__preview--chrome`:
        window.scale.photoPrew.style.filter = `grayscale(${maxEffectsValues.chrome * value})`;
        break;
      case `effects__preview--sepia`:
        window.scale.photoPrew.style.filter = `sepia(${maxEffectsValues.sepia * value})`;
        break;
      case `effects__preview--marvin`:
        window.scale.photoPrew.style.filter = `invert(${levelValue}%)`;
        break;
      case `effects__preview--phobos`:
        window.scale.photoPrew.style.filter = `blur(${maxEffectsValues.phobos * value}px)`;
        break;
      case `effects__preview--heat`:
        window.scale.photoPrew.style.filter = `brightness(${maxEffectsValues.heat[1] * value + maxEffectsValues.heat[0]})`;
        break;
      default:
        window.scale.photoPrew.style.filter = ``;
    }
  }
};

effectPin.addEventListener(`mousedown`, (evt) => {
  const pinLineWidth = effectField.querySelector(`.effect-level__line`).offsetWidth;
  let startCoord = evt.clientX;
  const documentMouseMoveHandler = (moveEvt) => {
    const shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;
    let currentCoord = effectPin.offsetLeft - shift;
    if (currentCoord < 0) {
      currentCoord = 0;
    } else if (currentCoord > pinLineWidth) {
      currentCoord = pinLineWidth;
    }
    effectPin.style.left = `${currentCoord}px`;
    effectLevelDepth.style.width = `${currentCoord}px`;
    effectPinValue.value = Math.round(currentCoord * 100 / pinLineWidth);
    setNewEffectDepth(effectPinValue.value);
  };
  const documentMouseUpHandler = () => {
    document.removeEventListener(`mousemove`, documentMouseMoveHandler);
    document.removeEventListener(`mouseup`, documentMouseUpHandler);
  };
  document.addEventListener(`mousemove`, documentMouseMoveHandler);
  document.addEventListener(`mouseup`, documentMouseUpHandler);
});

effectsItem.forEach((item) => {
  item.addEventListener(`click`, () => {
    effectField.classList.remove(`hidden`);
  });
});

effectsItemFirst.addEventListener(`click`, () => {
  effectField.classList.add(`hidden`);
});

const slider = {};
slider.initSlider = (callback) => {
  effectPin.addEventListener(`mousedown`, (evt) => {
    if (typeof callback === `function`) {
      setNewEffectDepth(evt, callback);
    }
  });
};

window.specialView = {
  setDefaultDepth,
  effectLevel,
  slider
};
