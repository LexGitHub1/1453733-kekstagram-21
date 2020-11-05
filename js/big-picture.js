'use strict';

(function () {
  const picturesElement = document.querySelector(`.pictures`);

  const renderBigPictureComments = function (comments, mountingPoint) {
    for (let i = 0; i < comments.length; i++) {
      const commentListItem = document.createElement(`li`);
      commentListItem.classList.add(`social__comment`);
      const commentImage = document.createElement(`img`);
      commentImage.setAttribute(`src`, `${comments[i].avatar}`);
      commentImage.setAttribute(`alt`, `${comments[i].name}`);
      commentImage.setAttribute(`width`, `35`);
      commentImage.setAttribute(`height`, `35`);
      commentImage.classList.add(`social__picture`);
      const commentText = document.createElement(`p`);
      commentText.classList.add(`social__text`);
      commentText.textContent = comments[i].message;
      commentListItem.appendChild(commentImage);
      commentListItem.appendChild(commentText);
      mountingPoint.appendChild(commentListItem);
    }
  };

  const renderBigPicture = function (photo) {
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);
    bigPicture.querySelector(`.big-picture__img img`).setAttribute(`src`, `${photo.url}`);
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;
    bigPicture.querySelector(`.social__comments`).innerHTML = ``;
    renderBigPictureComments(photo.comments, bigPicture.querySelector(`.social__comments`));
    const socialCommentCount = document.querySelector(`.social__comment-count`);
    socialCommentCount.classList.add(`hidden`);
    const commentsLoader = document.querySelector(`.comments-loader`);
    commentsLoader.classList.add(`hidden`);
    const body = document.querySelector(`body`);
    body.classList.add(`modal-open`);
  };

  const hideBigPicture = function () {
    document.querySelector(`.big-picture`).classList.add(`hidden`);
    picturesElement.addEventListener(`click`, onPhotosContainerClick);
    bigPictureCancel.removeEventListener(`click`, onBigPictureCancelClick);
    document.removeEventListener(`keydown`, onBigPictureEscapePress);
  };

  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);

  const onBigPictureCancelClick = function () {
    hideBigPicture();
  };

  const onBigPictureEscapePress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideBigPicture();
    }
  };

  const openBigPicture = function (id) {
    renderBigPicture([id]);

    picturesElement.removeEventListener(`click`, onPhotosContainerClick);
    bigPictureCancel.addEventListener(`click`, onBigPictureCancelClick);
    document.addEventListener(`keydown`, onBigPictureEscapePress);
  };

  const onPhotosContainerClick = function (evt) {
    if (evt.target.matches(`.picture__img`)) {
      openBigPicture(evt.target.parentElement.dataset.id);
    } else if (evt.target.matches(`.pictures a`)) {
      openBigPicture(evt.target.dataset.id);
    }
  };

  picturesElement.addEventListener(`click`, onPhotosContainerClick);

  window.bigpicture = {
    renderBigPicture,
    onBigPictureEscapePress,
    picturesElement
  };
})();
