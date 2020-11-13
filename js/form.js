'use strict';

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

window.modalOpenClose = {
  onPhotoEditEscPress,
  uploadFile,
  photoEdit
};
