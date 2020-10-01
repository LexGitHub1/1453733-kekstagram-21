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

const getRandomGenerator = function (length) {
  return Math.floor(Math.random() * Math.floor(length));
};

const MockupPhotoObject = function (url, description, likes, comments) {
  this.url = url;
  this.description = description;
  this.likes = likes;
  this.comments = comments;
};

const generateCommentContent = () => {
  const commentNum = getRandomGenerator(COMMENTS_LIST.length);
  let commentContent = COMMENTS_LIST[commentNum];

  if (Math.random() < 0.5) {
    const secondCommentNum = getRandomGenerator(COMMENTS_LIST.length);
    commentContent += ` ` + COMMENTS_LIST[secondCommentNum];
  }
  return commentContent;
};

const MockupComment = function () {
  const avatarNum = getRandomGenerator(COMMENTS_MIN, 1, true);
  const nameNum = getRandomGenerator(AUTHOR_NAMES.length);
  const message = generateCommentContent();

  this.avatar = `img/avatar-${avatarNum}.svg`;
  this.message = message;
  this.name = AUTHOR_NAMES[nameNum];
};

const createPhotoArray = (arrayLength) => {
  const photoArray = [];
  for (let i = 1; i <= arrayLength; i++) {
    const likesAmount = getRandomGenerator(LIKES_MAX, LIKES_MIN, true);
    const commentsAmount = getRandomGenerator(COMMENTS_MAX);
    const comments = [];
    for (let j = 0; j < commentsAmount; j++) {
      comments.push(new MockupComment());
    }
    const newPhotoObject = new MockupPhotoObject(
        `photos/${i}.jpg`,
        `Тестовое фото №${i}`,
        likesAmount,
        comments
    );
    photoArray.push(newPhotoObject);
  }
  return photoArray;
};

const createDomPictureElement = (template, pictureObject) => {
  const newPictureElement = template.cloneNode(true);
  const imgElement = newPictureElement.querySelector(`.picture__img`);
  const likesAmountElement = newPictureElement.querySelector(`.picture__likes`);
  const commentsAmountElement = newPictureElement.querySelector(`.picture__comments`);

  imgElement.src = pictureObject.url;
  likesAmountElement.textContent = pictureObject.likes;
  commentsAmountElement.textContent = pictureObject.comments.length;
  return newPictureElement;
};

const generateDomPicturesFragment = (picturesArray) => {
  const newFragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  for (let i = 0; i < picturesArray.length; i++) {
    const newChildElement = createDomPictureElement(pictureTemplate, picturesArray[i]);
    newFragment.appendChild(newChildElement);
  }
  return newFragment;
};

const picturesParentElement = document.querySelector(`.pictures`);

const mockupPhotosArray = createPhotoArray(PHOTOS_COUNT);

const mockupPhotosFragment = generateDomPicturesFragment(mockupPhotosArray);
picturesParentElement.appendChild(mockupPhotosFragment);
