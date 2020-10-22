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

const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getCommentsArray = function (count) {
  const comments = [];

  for (let i = 0; i < count; i++) {
    const comment = {
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: `${getRandom(COMMENTS_LIST)}`,
      name: AUTHOR_NAMES[getRandom(0, 6)]
    };
    comments.push(comment);
  }
  return comments;
};

const getPhotosArray = function () {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
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

const photoArray = getPhotosArray(OBJECTS_AMOUNT);

const renderPictures = function () {
  const pictures = document.querySelector(`.pictures`);
  const fragmentPhoto = document.createDocumentFragment();

  photoArray.forEach(function (value) {
    fragmentPhoto.appendChild(getPhoto(value));
  });
  pictures.appendChild(fragmentPhoto);
};

renderPictures(photoArray);
