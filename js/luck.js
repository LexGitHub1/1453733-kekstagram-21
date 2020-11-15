'use strict';

const main = document.querySelector(`main`);
const onSuccessUpload = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const successElement = onSuccessUpload.cloneNode(true);
const successInner = successElement.querySelector(`.success__inner`);
const successButton = successElement.querySelector(`.success__button`);

const createSuccessModule = () => {
  main.insertAdjacentElement(`afterbegin`, successElement);
  successButton.addEventListener(`click`, successButtonClickHandler);
  document.addEventListener(`click`, successWindowClickHandler);
  document.addEventListener(`keydown`, escPressHandler);
};

const deleteSuccessModule = () => {
  successButton.removeEventListener(`click`, successButtonClickHandler);
  document.removeEventListener(`click`, successWindowClickHandler);
  document.removeEventListener(`keydown`, escPressHandler);
  main.removeChild(successElement);
};

const successButtonClickHandler = () => {
  deleteSuccessModule();
};

const successWindowClickHandler = (evt) => {
  if (evt.target !== successInner) {
    deleteSuccessModule();
  }
};

const escPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    deleteSuccessModule();
  }
};

const successUploadHandler = () => {
  createSuccessModule();
};

window.luck = {
  successUploadHandler,
};
