'use strict';

const pictures = document.querySelector(`.pictures`);
const filters = document.querySelector(`.img-filters`);
const openBigPicturePopup = window.hugeImg.openBigPicture;

const template = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const createCardElement = (object) => {
  const {likes, comments, url} = object;
  const cardElement = template.cloneNode(true);
  cardElement.querySelector(`.picture__likes`).textContent = likes;
  cardElement.querySelector(`.picture__comments`).textContent = comments.length;
  cardElement.querySelector(`img`).src = url;
  return cardElement;
};

const renderPictures = (cardsArray) => {
  const fragment = document.createDocumentFragment();
  cardsArray.forEach((cardObject) => {
    fragment.appendChild(createCardElement(cardObject));
  });
  pictures.appendChild(fragment);
  return fragment;
};

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const clickSmallPhoto = (data) => {
  const smallPhotosList = document.querySelectorAll(`.picture`);
  smallPhotosList.forEach((picture, index) => {
    picture.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      openBigPicturePopup(data[index]);
    });
  });
};

const successDataLoadHandler = (data) => {
  window.cardCreate.cardsList = [];
  window.cardCreate.cardsList = data;
  renderPictures(data);
  clickSmallPhoto(data);
  filters.classList.remove(`img-filters--inactive`);
};

window.server.load(successDataLoadHandler, errorHandler);

window.cardCreate = {
  renderPictures,
  clickSmallPhoto
};
