'use strict';

const photoEdit = document.querySelector(`.img-upload__overlay`);
const photoPrew = document.querySelector(`.img-upload__preview img`);
const effectField = document.querySelector(`.img-upload__effect-level`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);
const {hashTagsInput, commentsField} = window.validation;

const photoEditEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    photoEditClose();
  }
};

const photoEditOpen = () => {
  photoEdit.classList.remove(`hidden`);
  effectField.classList.add(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, photoEditEscPressHandler);
};

const photoEditClose = () => {
  hashTagsInput.value = ``;
  commentsField.value = ``;
  uploadFile.value = ``;
  photoPrew.className = ``;
  photoPrew.style.transform = ``;
  photoEdit.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, photoEditEscPressHandler);
  effectField.classList.add(`hidden`);
};

uploadCloseBtn.addEventListener(`click`, () => {
  photoEditClose();
});

uploadFile.addEventListener(`change`, () => {
  photoEditOpen();

  if (uploadFile.files && uploadFile.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPrew.setAttribute(`src`, e.target.result);
    };
    reader.readAsDataURL(uploadFile.files[0]);
  }
});

window.modalOpenClose = {
  photoEditEscPressHandler,
  uploadFile,
  photoEdit
};
