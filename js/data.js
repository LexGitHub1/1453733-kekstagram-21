'use strict';

(function () {
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

  const LIKES = {
    min: 15,
    max: 200,
  };

  const COMMENTS = {
    min: 5,
    max: 10,
  };

  const OBJECTS_AMOUNT = 25;

  const getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArrayElement = function (array) {
    return array[getRandom(0, array.length - 1)];
  };

  const getCommentsArray = function (randomAmount) {
    const resultComments = [];

    for (let i = 0; i < randomAmount; i++) {
      resultComments.push({
        avatar: `img/avatar-${getRandom(1, 6)}.svg`,
        message: getRandomArrayElement(COMMENTS_LIST),
        name: getRandomArrayElement(AUTHOR_NAMES),
      });
    }

    return resultComments;
  };

  const getMocksArray = function (objectsAmount) {
    const resultMocks = [];

    for (let i = 1; i <= objectsAmount; i++) {
      resultMocks.push({
        url: `photos/${i}.jpg`,
        description: `photo description`,
        likes: getRandom(LIKES.min, LIKES.max),
        comments: getCommentsArray(getRandom(COMMENTS.min, COMMENTS.max)),
      });
    }

    return resultMocks;
  };

  (function () {
    const mocks = getMocksArray(OBJECTS_AMOUNT);

    window.mockscreation = {
      mocks
    };
  })();
})();
