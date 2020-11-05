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

const picturesElement = document.querySelector(`.pictures`);

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

const mocks = getMocksArray(OBJECTS_AMOUNT);
picturesElement.appendChild(renderPictures(mocks));

// Полноэкранный режим

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

// Скрыть полноэкранный режим

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
  renderBigPicture(mocks[id]);

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

// Задание 4.12 (Личный проект: доверяй, но проверяй (часть 1))

// Загрузка изображения и показ формы редактирования 1.2 и 1.3

const photoEdit = document.querySelector(`.img-upload__overlay`);
const photoPrew = document.querySelector(`.img-upload__preview img`);
const effectField = document.querySelector(`.img-upload__effect-level`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadCloseBtn = document.querySelector(`.img-upload__cancel`);

const onPhotoEditEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    photoEdit.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
  }
};

const photoEditOpen = function () {
  photoEdit.classList.remove(`hidden`);
  effectField.classList.add(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPhotoEditEscPress);
};

const photoEditClose = function () {
  photoPrew.className = ``;
  photoPrew.style.transform = ``;
  photoEdit.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPhotoEditEscPress);
  effectField.classList.add(`hidden`);
};

uploadCloseBtn.addEventListener(`click`, function () {
  photoEditClose();
});

uploadFile.addEventListener(`change`, function () {
  photoEditOpen();

  if (uploadFile.files && uploadFile.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoPrew.setAttribute(`src`, e.target.result);
    };
    reader.readAsDataURL(uploadFile.files[0]);
  }
});

// Масштаб

const scaleBtnMin = document.querySelector(`.scale__control--smaller`);
const scaleBtnMax = document.querySelector(`.scale__control--bigger`);
const scaleControlNum = document.querySelector(`.scale__control--value`);
let scale = 100;

scaleBtnMin.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  if (scale > 25) {
    scale -= 25;
    scaleControlNum.value = `${scale}%`;
    photoPrew.style.transform = `scale(${scale / 100})`;
  }
});

scaleBtnMax.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  if (scale < 100) {
    scale += 25;
    scaleControlNum.value = `${scale}%`;
    photoPrew.style.transform = `scale(${scale / 100})`;
  }
});

// Эффект на изображение

const img = document.querySelector(`.img-upload__preview img`);
const effects = document.querySelector(`.effects`);

const onEffectChange = function (evt) {
  if (evt.target.matches(`input[type="radio"]`)) {
    img.className = ``;
    img.className = `effects__preview--${evt.target.value}`;

    if (evt.target.value === `none`) {
      effectField.classList.add(`hidden`);
    } else {
      effectField.classList.remove(`hidden`);
    }
  }
};

effects.addEventListener(`click`, onEffectChange);

// Изменение размера изображения

const effectLevelDepth = effectField.querySelector(`.effect-level__depth`);
const effectPin = effectField.querySelector(`.effect-level__pin`);
const effectPinValue = effectField.querySelector(`.effect-level__value`);

effectPin.addEventListener(`mousedown`, function (evt) {
  const pinLineWidth = effectField.querySelector(`.effect-level__line`).offsetWidth;
  let startCoord = evt.clientX;
  const onDocumentMouseMove = function (moveEvt) {
    const shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;
    let currentCoord = effectPin.offsetLeft - shift;
    if (currentCoord < 0) {
      currentCoord = 0;
    } else if (currentCoord > pinLineWidth) {
      currentCoord = pinLineWidth;
    }
    effectPin.style.left = `${currentCoord}px`;
    effectLevelDepth.style.width = `${currentCoord}px`;
    effectPinValue.value = Math.round(currentCoord * 100 / pinLineWidth);
  };
  const onDocumentMouseUp = function () {
    document.removeEventListener(`mousemove`, onDocumentMouseMove);
    document.removeEventListener(`mouseup`, onDocumentMouseUp);
  };
  document.addEventListener(`mousemove`, onDocumentMouseMove);
  document.addEventListener(`mouseup`, onDocumentMouseUp);
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
