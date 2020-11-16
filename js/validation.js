'use strict';

const HASHTAGS_MAX_COUNT = 5;
const COMMENTS_MAX = 140;
const HASHTAG_REG_EXP = /^#([а-яА-Я]|[a-zA-Z]|[0-9]){1,20}$/;

const USER_MESSAGE = {
  LESS_THEN_FIVE: `Нельзя указать больше пяти хэш-тегов`,
  NO_DUPLICATES: `Один и тот же хэш-тег не может быть использован дважды`,
  CORRECT: `Не верный формат хештега`
};

const hashTagsInput = document.querySelector(`.text__hashtags`);
const commentsField = document.querySelector(`.text__description`);

const hashTagsInputKeyupHandler = () => {
  const hashtagsArr = hashTagsInput.value.replace(/ +/g, ` `).trim().toLowerCase().split(` `);

  const isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

  const isHashtagCorrect = hashtagsArr.every((tag) => {
    return HASHTAG_REG_EXP.test(tag);
  });

  const isHastagsNoDuplicates = hashtagsArr.every((item, index, array) => {
    return array.indexOf(item) === index;
  });

  hashTagsInput.setCustomValidity(``);

  if (!isHashtagsLessThanFive) {
    hashTagsInput.setCustomValidity(USER_MESSAGE.LESS_THEN_FIVE);
  }

  if (!isHashtagCorrect) {
    hashTagsInput.setCustomValidity(USER_MESSAGE.CORRECT);
  }

  if (!isHastagsNoDuplicates) {
    hashTagsInput.setCustomValidity(USER_MESSAGE.NO_DUPLICATES);
  }
  hashTagsInput.reportValidity();

  if (hashTagsInput.value === ``) {
    hashTagsInput.setCustomValidity(``);
  }

  if ((isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive) || hashTagsInput.value === ``) {
    hashTagsInput.style.outline = ``;
    hashTagsInput.style.background = ``;
  } else {
    hashTagsInput.style.outline = `2px solid red`;
    hashTagsInput.style.background = `pink`;
  }
};

hashTagsInput.addEventListener(`input`, hashTagsInputKeyupHandler);

hashTagsInput.addEventListener(`focusin`, () => {
  document.removeEventListener(`keydown`, window.modalOpenClose.photoEditEscHandler);
});

hashTagsInput.addEventListener(`focusout`, () => {
  document.addEventListener(`keydown`, window.modalOpenClose.photoEditEscHandler);
});

commentsField.oninput = () => {
  const valueLength = commentsField.value.length;
  if (commentsField.value.length > COMMENTS_MAX) {
    commentsField.setCustomValidity(`Удалите ` + (COMMENTS_MAX - valueLength) + ` симв.`);
  } else {
    commentsField.setCustomValidity(``);
  }
  commentsField.reportValidity();
};

commentsField.addEventListener(`focusin`, () => {
  document.removeEventListener(`keydown`, window.modalOpenClose.photoEditEscHandler);
});

commentsField.addEventListener(`focusout`, () => {
  document.addEventListener(`keydown`, window.modalOpenClose.photoEditEscHandler);
});

window.validation = {
  hashTagsInput,
  commentsField
};
