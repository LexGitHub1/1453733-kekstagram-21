'use strict';

const MAX_COMMENTS_AMOUNT = 5;

const bigPicture = document.querySelector(`.big-picture`);
const bigUrl = bigPicture.querySelector(`.big-picture__img img`);
const bigLikes = bigPicture.querySelector(`.likes-count`);
const bigComments = bigPicture.querySelector(`.comments-count`);
const bigDescription = bigPicture.querySelector(`.social__caption`);

const social = bigPicture.querySelector(`.social`);
const socialComments = social.querySelector(`.social__comments`);
const socialCommentCount = social.querySelector(`.social__comment-count`);
const commentsLoader = social.querySelector(`.comments-loader`);
const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
let commentsCopy = [];

const renderSocialComments = (comment) => {
  const element = document.createElement(`li`);
  const commentImg = document.createElement(`img`);
  const commentText = document.createElement(`p`);
  element.classList.add(`social__comment`);
  commentImg.classList.add(`social__picture`);
  commentText.classList.add(`social__text`);
  element.append(commentImg, commentText);
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentText.textContent = comment.message;
  return element;
};

const moreCommentsBtnClickHandler = () => {
  const commentsList = document.querySelectorAll(`.social__comment`);
  const count = commentsList.length;
  const index = count + MAX_COMMENTS_AMOUNT;
  const fiveComments = commentsCopy.slice(count, index);
  const comments = document.createDocumentFragment();
  for (let i = 0; i < fiveComments.length; i++) {
    comments.appendChild(renderSocialComments(fiveComments[i]));
  }
  socialCommentCount.textContent = `${index} из ${commentsCopy.length} комментариев`;
  socialComments.append(comments);
  if (fiveComments.length < MAX_COMMENTS_AMOUNT) {
    socialCommentCount.textContent = `${commentsCopy.length} из ${commentsCopy.length} комментариев`;
    commentsLoader.classList.add(`hidden`);
  }
};

const openBigPicture = (object) => {
  const {url, likes, comments, description} = object;
  commentsCopy = comments.slice();
  socialComments.innerHTML = ``;
  bigUrl.src = url;
  bigLikes.textContent = likes;
  bigComments.textContent = comments.length;
  bigDescription.textContent = description;
  moreCommentsBtnClickHandler(commentsCopy);
  bigPicture.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, bigPictureEscPressHandler);
  bigPictureCancel.addEventListener(`click`, closeButtonClickHandler);

  if (comments.length > MAX_COMMENTS_AMOUNT) {
    commentsLoader.classList.remove(`hidden`);
    commentsLoader.addEventListener(`click`, moreCommentsBtnClickHandler);
  } else {
    commentsLoader.classList.add(`hidden`);
  }
};

const bigPictureEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const closeBigPicture = () => {
  bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, bigPictureEscPressHandler);
  document.body.classList.remove(`modal-open`);
  bigPictureCancel.removeEventListener(`click`, closeButtonClickHandler);
};

window.hugeImg = {
  openBigPicture,
  bigPictureEscPressHandler,
  bigPicture
};
