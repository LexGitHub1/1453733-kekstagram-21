'use strict';

(function () {

  const form = document.querySelector(`.img-upload__form`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

  const resetImageData = function () {
    window.effects.setDefaultDepth();
    window.modalOpenClose.uploadFile.value = ``;
    window.scale.photoPrew.style.filter = ``;
    window.scale.photoPrew.style.transform = `scale(1.00)`;
    window.scale.photoPrew.className = `effects__preview--none`;
    window.effects.effectLevel.classList.add(`hidden`);
  };

  const submitHandler = function (evt) {
    window.server.upload(
        new FormData(form),
        function () {
          form.reset();
          resetImageData();
          imageUploadOverlay.classList.add(`hidden`);
          window.success.successUploadHandler();
        },
        function () {
          window.error.errorUploadHandler();
        });
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

  window.submit = {
    resetImageData
  };
})();
