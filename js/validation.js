'use strict';

(function () {
  const COMMENTS_MAX = 120;

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

  hashTagsInput.addEventListener(`focusin`, function () {
    document.removeEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  hashTagsInput.addEventListener(`focusout`, function () {
    document.addEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  const commentsField = document.querySelector(`.text__description`);
  commentsField.oninput = function () {
    const valueLength = commentsField.value.length;
    if (commentsField.value.length > COMMENTS_MAX) {
      commentsField.setCustomValidity(`Удалите ` + (COMMENTS_MAX - valueLength) + ` симв.`);
    } else {
      commentsField.setCustomValidity(``);
    }
    commentsField.reportValidity();
  };

  commentsField.addEventListener(`focusin`, function () {
    document.removeEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  commentsField.addEventListener(`focusout`, function () {
    document.addEventListener(`keydown`, window.modalopenclose.modalEscPress);
  });

  window.validation = {
    hashTagsInput,
    commentsField
  };
})();
