'use strict';

const COMMENTS_LIST = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const AUTHOR_NAMES = [
  `Александр`,
  `Виктор`,
  `Ирина`,
  `Кирилл`,
  `Ольга`,
  `Петр`
];

const OBJECTS_AMOUNT = 25;

const AVATAR = {
  width: 35,
  height: 25,
};

const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = function (array) {
  return array[getRandom(0, array.length - 1)];
};

const getCommentsArray = function (count) {
  const comments = [];

  for (let i = 0; i < count; i++) {
    const comment = {
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENTS_LIST),
      name: AUTHOR_NAMES[getRandom(0, 6)]
    };
    comments.push(comment);
  }
  return comments;
};

const getPhotosArray = function (objectsAmount) {
  const photos = [];
  for (let i = 1; i <= objectsAmount; i++) {
    const photo = {
      url: `photos/${i}.jpg`,
      description: `Описание фото`,
      likes: getRandom(15, 200),
      comments: getCommentsArray()
    };
    photos.push(photo);
  }
  return photos;
};

const getPhoto = function (photo) {
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = photo.url;
  pictureElement.querySelector(`.picture__img`).alt = photo.description;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return pictureElement;
};

const renderPictures = function (pictures) {
  const picturesElement = document.querySelector(`.pictures`);
  const fragmentPhoto = document.createDocumentFragment();

  pictures.forEach(function (value) {
    fragmentPhoto.appendChild(getPhoto(value));
  });
  picturesElement.appendChild(fragmentPhoto);
};

const photosArray = getPhotosArray(OBJECTS_AMOUNT);

renderPictures(photosArray);

// Задание 3.18 (Личный проект: больше деталей (часть 2))

const createSocialComment = function (object) {
  const fragment = document.createDocumentFragment();
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = socialComments.querySelector(`li`);
  socialComments.innerHTML = ``;

  object.comments.forEach(function (value) {
    const li = socialComment.cloneNode(true);
    li.querySelector(`.social__picture`).src = value.avatar;
    li.querySelector(`.social__picture`).alt = value.name;
    li.querySelector(`.social__picture`).width = AVATAR.width;
    li.querySelector(`.social__picture`).height = AVATAR.height;
    li.querySelector(`.social__text`).textContent = value.message;
    fragment.append(li);
    socialComments.append(fragment);
  });
};

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureOpened = function (object) {
  bigPicture.classList.remove(`hidden`);
  const {url, likes, comments, description} = object;
  document.querySelector(`.big-picture__img img`).src = url;
  document.querySelector(`.likes-count`).textContent = likes;
  document.querySelector(`.comments-count`).textContent = comments.length;
  document.querySelector(`.social__caption`).textContent = description;
  createSocialComment(photosArray[0]);
};
bigPictureOpened(photosArray[0]);

const socialCommentCount = document.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);

const commentsLoader = document.querySelector(`.comments-loader`);
commentsLoader.classList.add(`hidden`);

document.querySelector(`body`).classList.add(`modal-open`);
