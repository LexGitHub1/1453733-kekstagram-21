'use strict';

(function () {
  const photoEdit = document.querySelector(`.img-upload__overlay`);
  const photoPrew = document.querySelector(`.img-upload__preview img`);
  const effectField = document.querySelector(`.img-upload__effect-level`);
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);

  const onPhotoEditEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      photoEdit.classList.add(`hidden`);
      document.querySelector(`body`).classList.remove(`modal-open`);
    }
  };

  const photoEditOpen = function () {
    photoEdit.classList.remove(`hidden`);
    effectField.classList.add(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onPhotoEditEscPress);
  };

  const photoEditClose = function () {
    photoPrew.className = ``;
    photoPrew.style.transform = ``;
    photoEdit.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPhotoEditEscPress);
    effectField.classList.add(`hidden`);
  };

  uploadCloseBtn.addEventListener(`click`, function () {
    photoEditClose();
  });

  uploadFile.addEventListener(`change`, function () {
    photoEditOpen();

    if (uploadFile.files && uploadFile.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        photoPrew.setAttribute(`src`, e.target.result);
      };
      reader.readAsDataURL(uploadFile.files[0]);
    }
  });

  // Масштаб

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

  // Эффект на изображение

  const img = document.querySelector(`.img-upload__preview img`);
  const effects = document.querySelector(`.effects`);

  const onEffectChange = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      img.className = ``;
      img.className = `effects__preview--${evt.target.value}`;

      if (evt.target.value === `none`) {
        effectField.classList.add(`hidden`);
      } else {
        effectField.classList.remove(`hidden`);
      }
    }
  };

  effects.addEventListener(`click`, onEffectChange);

  // Изменение размера изображения

  const effectLevelDepth = effectField.querySelector(`.effect-level__depth`);
  const effectPin = effectField.querySelector(`.effect-level__pin`);
  const effectPinValue = effectField.querySelector(`.effect-level__value`);

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
    };
    const onDocumentMouseUp = function () {
      document.removeEventListener(`mousemove`, onDocumentMouseMove);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);
    };
    document.addEventListener(`mousemove`, onDocumentMouseMove);
    document.addEventListener(`mouseup`, onDocumentMouseUp);
  });
})();
