'use strict';

(function () {
  const getPhoto = function (photo, id) {
    const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.dataset.id = id;
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return pictureElement;
  };

  const renderPictures = function (pictures) {
    const fragmentPhoto = document.createDocumentFragment();

    for (let i = 0; i < pictures.length; i++) {
      fragmentPhoto.appendChild(getPhoto(pictures[i], i));
    }
    return fragmentPhoto;
  };

  renderPictures();
})();
