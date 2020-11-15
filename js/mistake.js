'use strict';

const main = document.querySelector(`main`);
const errorUpload = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

const errorElement = errorUpload.cloneNode(true);
const errorButton = errorElement.querySelector(`.error__button`);
const errorInner = errorElement.querySelector(`.error__inner`);

const createErrorModule = () => {
  main.insertAdjacentElement(`beforeend`, errorElement);
  errorButton.addEventListener(`click`, errorButtonClickHandler);
  document.addEventListener(`click`, errorWindowClickHandler);
  document.addEventListener(`keydown`, errorEscPressHandler);
};

const deleteErrorModule = () => {
  main.removeChild(errorElement);
  errorButton.removeEventListener(`click`, errorButtonClickHandler);
  document.removeEventListener(`click`, errorWindowClickHandler);
  document.removeEventListener(`keydown`, errorEscPressHandler);
};

const errorButtonClickHandler = () => {
  deleteErrorModule();
};

const errorWindowClickHandler = (evt) => {
  if (evt.target !== errorInner) {
    deleteErrorModule();
  }
};

const errorEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    deleteErrorModule();
  }
};

const errorUploadHandler = () => {
  createErrorModule();
};

window.mistake = {
  errorUploadHandler
};
