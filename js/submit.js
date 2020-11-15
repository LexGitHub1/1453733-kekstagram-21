'use strict';

const form = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

const resetImageData = () => {
  window.specialView.setDefaultDepth();
  window.modalOpenClose.uploadFile.value = ``;
  window.scale.photoPrew.style.filter = ``;
  window.scale.photoPrew.style.transform = `scale(1.00)`;
  window.scale.photoPrew.className = `effects__preview--none`;
  window.specialView.effectLevel.classList.add(`hidden`);
};

const submitHandler = (evt) => {
  window.server.upload(
      new FormData(form),
      () => {
        form.reset();
        resetImageData();
        imageUploadOverlay.classList.add(`hidden`);
        window.luck.successUploadHandler();
      },
      () => {
        window.mistake.errorUploadHandler();
      });
  evt.preventDefault();
};

form.addEventListener(`submit`, submitHandler);

window.submit = {
  resetImageData
};
