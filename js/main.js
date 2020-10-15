'use strict';

const COMMENTS_MIN = 1;
const COMMENTS_MAX = 4;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const PHOTOS_COUNT = 25;

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

const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const getRandomElement = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getCommentsArray = function (numberOfComments) {
  const array = [];
  for (let i = 0; i < numberOfComments; i++) {
    const commentObj = {
      avatar: `img/avatar-` + getRandomElement(COMMENTS_MIN, COMMENTS_MAX) + `.svg`,
      message: COMMENTS_LIST[getRandomElement(0, COMMENTS_LIST.length - 1)],
      name: AUTHOR_NAMES[getRandomElement(0, AUTHOR_NAMES.length - 1)]
    };
    array.push(commentObj);
  }
  return array;
};

const createPhotoArray = function () {
  const randomData = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    const object = {
      url: `photos/` + i + `.jpg`,
      description: `Описание фотографии`,
      likes: getRandomElement(LIKES_MIN, LIKES_MAX),
      comments: getCommentsArray(getRandomElement(COMMENTS_MIN, COMMENTS_MAX))
    };
    randomData.push(object);
  }
  return randomData;
};

const renderPhoto = function (photo) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = photo.url;
  pictureElement.querySelector(`.picture__img`).alt = photo.description;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return pictureElement;
};

const fillElements = function () {
  const fragment = document.createDocumentFragment();
  const photosArray = createPhotoArray();
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(renderPhoto(photosArray[i]));
  }
  pictures.appendChild(fragment);
};

fillElements();
