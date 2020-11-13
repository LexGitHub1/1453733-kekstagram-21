'use strict';

const MAX_RANDOM_ELEMENTS = 10;

const filtersForm = document.querySelector(`.img-filters__form`);
const renderPictures = window.cardCreate.renderPictures;

const showDefaultPictures = function () {
  const defaultPhotos = window.cardCreate.cardsList;
  renderPictures(defaultPhotos);
  window.cardCreate.clickSmallPhoto(defaultPhotos);
};

const shuffleArray = function (array) {
  const arrayCopy = array.slice();
  const iterations = MAX_RANDOM_ELEMENTS < arrayCopy.length ? MAX_RANDOM_ELEMENTS : arrayCopy.length - 1;

  for (let i = 0; i < iterations; i++) {
    const randomIndex = Math.floor(Math.random() * (arrayCopy.length - i)) + i;
    const currentElement = arrayCopy[i];
    arrayCopy[i] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = currentElement;
  }
  return arrayCopy;
};

const showRandomPictures = function () {
  const picturesList = window.cardCreate.cardsList;
  const randomElements = shuffleArray(picturesList).slice(0, MAX_RANDOM_ELEMENTS);
  renderPictures(randomElements);
  window.cardCreate.clickSmallPhoto(randomElements);
};

const showDiscussedPictures = function () {
  const picturesListCopy = window.cardCreate.cardsList.slice();
  const sortedList = picturesListCopy.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });
  renderPictures(sortedList);
  window.cardCreate.clickSmallPhoto(sortedList);
};

const removePictures = function () {
  const pics = document.querySelectorAll(`.picture`);
  pics.forEach(function (item) {
    item.remove();
  });
};

const setActiveFilterBtn = function (evt) {
  const currentActive = filtersForm.querySelector(`.img-filters__button--active`);
  const {target} = evt;
  if (!target.classList.contains(`img-filters__button--active`)) {
    currentActive.classList.remove(`img-filters__button--active`);
    target.classList.add(`img-filters__button--active`);
  }
};

const filterClickHandler = window.timeOut.debounce(function (evt) {
  removePictures();
  setActiveFilterBtn(evt);

  switch (evt.target.id) {
    case `filter-default`:
      showDefaultPictures();
      break;
    case `filter-random`:
      showRandomPictures();
      break;
    case `filter-discussed`:
      showDiscussedPictures();
      break;
    default:
      showDefaultPictures();
  }
});

filtersForm.addEventListener(`click`, filterClickHandler);
