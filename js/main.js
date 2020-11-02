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

const LIKES = {
  min: 15,
  max: 200,
};

const COMMENTS = {
  min: 5,
  max: 10,
};

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

const mocks = getMocksArray(OBJECTS_AMOUNT);
renderPictures(mocks);

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
  });
  socialComments.append(fragment);
};

const bigPicture = document.querySelector(`.big-picture`);
const showFullSizePicture = function (object) {
  bigPicture.classList.remove(`hidden`);

  const {url, likes, comments, description} = object;
  document.querySelector(`.big-picture__img img`).src = url;
  document.querySelector(`.likes-count`).textContent = likes;
  document.querySelector(`.comments-count`).textContent = comments.length;
  document.querySelector(`.social__caption`).textContent = description;
  createSocialComment(mocks[0]);

  bigPicture.classList.add(`hidden`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  socialCommentCount.classList.add(`hidden`);

  const commentsLoader = document.querySelector(`.comments-loader`);
  commentsLoader.classList.add(`hidden`);

  document.querySelector(`body`).classList.add(`modal-open`);
};
showFullSizePicture(mocks[0]);

//  Задание 4.12 (Личный проект: доверяй, но проверяй (часть 1))

// Загрузка изображения и показ формы редактирования 1.2 и 1.3

const uploadImageFile = document.querySelector(`#upload-file`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadCancel = document.querySelector(`#upload-cancel`);

const modalEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = function () {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, modalEscPress);
};

const closeModal = function () {
  imageUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, modalEscPress);
  uploadImageFile.value = ``;
};

uploadImageFile.addEventListener(`change`, function () {
  openModal();
});

uploadCancel.addEventListener(`click`, function () {
  closeModal();
});

// Масштаб

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const scaleValue = document.querySelector(`.scale__control--value`);
const imageUploadPreview = document.querySelector(`.img-upload__preview img`);

const value = {
  min: 25,
  max: 100
};

const onMinusScaleClick = function () {
  let scale = parseInt(scaleValue.value, 10);
  if (scale <= value.max && scale > value.min) {
    scale -= value.min;
  }
  imageStyleChange(scale);
};

scaleControlSmaller.addEventListener(`click`, onMinusScaleClick);

const onPlusScaleClick = function () {
  let scale = parseInt(scaleValue.value, 10);
  if (scale >= value.min && scale < value.max) {
    scale += value.min;
  }
  imageStyleChange(scale);
};

scaleControlBigger.addEventListener(`click`, onPlusScaleClick);

const imageStyleChange = function (number) {
  imageUploadPreview.style.transform = `scale(${number / 100})`;
  scaleValue.value = `${number}%`;
};

// Эффект на изображение

const img = document.querySelector(`.img-upload__preview img`);
const effects = document.querySelector(`.effects`);

const filterChange = function (evt) {
  if (evt.target.matches(`input[type="radio"]`)) {
    img.className = ``;
    img.className = `effects__preview--${evt.target.value}`;
  }
};

effects.addEventListener(`click`, filterChange);

// Интенсивность эффекта

const effectLevelPin = document.querySelector(`.effect-level__pin`);
effectLevelPin.addEventListener(`mouseup`, function () {
});
const effectLevelValue = document.querySelector(`.effect-level__value`);

effectLevelValue.value = {
  min: 0,
  max: 100
};

// effectLevelValue.value // меняется по перемещению effectLevelPin;
// img.style.filter // меняется по изменению effectLevelValue.value;

effectLevelValue.addEventListener(`change`, function () {
  if (img.className === `effects__preview--chrome`) {
    img.style.filter = `filter: grayscale(0..1)`;
  }
  if (img.className === `effects__preview--sepia`) {
    img.style.filter = `filter: sepia(0..1)`;
  }
  if (img.className === `effects__preview--marvin`) {
    img.style.filter = `filter: invert(0..100%)`;
  }
  if (img.className === `effects__preview--phobos`) {
    img.style.filter = `filter: blur(0..3px)`;
  }
  if (img.className === `effects__preview--heat`) {
    img.style.filter = `filter: brightness(1..3)`;
  }
});

const liFirst = document.querySelector(`.effects__item:first-child`);
const Li = document.querySelector(`.effects__item:not(:first-child)`);
const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);

imgUploadEffectLevel.classList.add(`hidden`);

liFirst.addEventListener(`click`, function () {
  imgUploadEffectLevel.classList.add(`hidden`);
});

Li.addEventListener(`click`, function () {
  imgUploadEffectLevel.classList.remove(`hidden`);
});

// Валидация хеш-тегов и комментов

const isRepeated = function (elements) {
  return Array.from(new Set(elements.map((tag) => tag.toLowerCase()))).length !== elements.length;
};

const doValidationOfHashtags = function (tags) {
  const validationRule = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,20})(\b|\r)/gi;
  return tags.every((tag) => validationRule.test(tag));
};

const hashTagsInput = document.querySelector(`.text__hashtags`);

const hashTagsInputKeyupHandler = function (evt) {
  const hashTags = evt.target.value.split(` `);
  if (hashTags.length > 5) {
    hashTagsInput.setCustomValidity(`Максимальное количество тегов - 5`);
  } else if (isRepeated(hashTags)) {
    hashTagsInput.setCustomValidity(`Теги не должны повторяться`);
  } else if (doValidationOfHashtags(hashTags)) {
    hashTagsInput.setCustomValidity(`Теги должны соответствовать формату`);
  } else {
    hashTagsInput.setCustomValidity(``);
  }
};
hashTagsInput.addEventListener(`input`, hashTagsInputKeyupHandler);
