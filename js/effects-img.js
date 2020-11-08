'use strict';

(function () {
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

  const onEffectChange = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      window.scale.photoPrew.className = ``;
      setDefaultDepth();
      window.scale.photoPrew.className = `effects__preview--${evt.target.value}`;
    }
  };

  effects.addEventListener(`click`, onEffectChange);

  const setDefaultDepth = function () {
    effectPin.style.left = DEFAULT_EFFECT_LEVEL + `%`;
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + `%`;
    effectPinValue.value = DEFAULT_EFFECT_LEVEL;
    window.scale.photoPrew.style.filter = ``;
  };

  // Изменение размера изображения

  const setNewEffectDepth = function (levelValue) {
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

  effectPin.addEventListener(`mousedown`, function (evt) {
    const pinLineWidth = effectField.querySelector(`.effect-level__line`).offsetWidth;
    let startCoord = evt.clientX;
    const onDocumentMouseMove = function (moveEvt) {
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
    const onDocumentMouseUp = function () {
      document.removeEventListener(`mousemove`, onDocumentMouseMove);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);
    };
    document.addEventListener(`mousemove`, onDocumentMouseMove);
    document.addEventListener(`mouseup`, onDocumentMouseUp);
  });

  effectsItem.forEach(function (item) {
    item.addEventListener(`click`, function () {
      effectField.classList.remove(`hidden`);
    });
  });

  effectsItemFirst.addEventListener(`click`, function () {
    effectField.classList.add(`hidden`);
  });

  window.effects = {
    setDefaultDepth,
    effectLevel
  };
})();
