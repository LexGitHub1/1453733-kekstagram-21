'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

const imgUpload = document.querySelector(`.img-upload`);
const fileChooser = imgUpload.querySelector(`.img-upload__start input[type=file]`);
const previewImg = imgUpload.querySelector(`.img-upload__preview img`);
const effectsPreview = imgUpload.querySelectorAll(`.effects__preview`);
const openModal = window.modalOpenClose.openModalHandler;

const setEffectsPreview = function (customImage) {
  effectsPreview.forEach(function (preview) {
    preview.style = `background-image: url('${customImage}')`;
  });
};

fileChooser.addEventListener(`change`, function () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (!matches) {
    window.error.errorUploadHandler(`Недопустимый формат`);
    window.modalOpenClose.imageUploadOverlay.classList.add(`hidden`);
    window.submit.resetImageData();
  }

  const reader = new FileReader();
  reader.addEventListener(`load`, function () {
    openModal();
    const image = reader.result;
    previewImg.src = image;
    setEffectsPreview(image);
  });
  reader.readAsDataURL(file);
});
