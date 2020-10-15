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

const getRandomInterval = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = function (array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

const getRandomArray = function (name, comment) {
  const randomArray = [];
  for (let i = 1; i < PHOTOS_COUNT; i++) {
    randomArray.push({
      url: `photos/${i}.jpg`,
      likes: getRandomInterval(LIKES_MIN, LIKES_MAX),
      description: `Лучшее фото на Земле`,
      comments: [
        {
          avatar: `img/avatar-${getRandomInterval(COMMENTS_MIN, COMMENTS_MAX)}.svg`,
          message: getRandomElement(comment),
          name: getRandomElement(name),
        },
      ],
    });
  }

  return randomArray;
};

const getPhoto = function (photo) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = photo.url;
  pictureElement.querySelector(`.picture__img`).alt = photo.description;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return pictureElement;
};

const fillElements = function () {
  const fragment = document.createDocumentFragment();
  const arrayOfObjects = getRandomArray(AUTHOR_NAMES, COMMENTS_LIST);

  arrayOfObjects.forEach(function (item) {
    fragment.appendChild(getPhoto(item));
  });

  pictures.appendChild(fragment);
};

fillElements();
