'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

const imgUpload = document.querySelector(`.img-upload`);
const fileChooser = imgUpload.querySelector(`.img-upload__start input[type=file]`);
const previewImg = imgUpload.querySelector(`.img-upload__preview img`);
const effectsPreview = imgUpload.querySelectorAll(`.effects__preview`);

const setEffectsPreview = (customImage) => {
  effectsPreview.forEach((preview) => {
    preview.style = `background-image: url('${customImage}')`;
  });
};

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (!matches) {
    window.mistake.errorUploadHandler(`Недопустимый формат`);
    window.modalOpenClose.imageUploadOverlay.classList.add(`hidden`);
    window.submit.resetImageData();
  }

  const reader = new FileReader();
  reader.addEventListener(`load`, () => {
    const image = reader.result;
    previewImg.src = image;
    setEffectsPreview(image);
  });
  reader.readAsDataURL(file);
});
