'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram/`;
const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const getServer = (xhr, onSuccess, onError) => {
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

const load = (success, error) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`GET`, URL_LOAD);
  getServer(xhr, success, error);
  xhr.send();
};

const upload = (data, success, error) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, URL_UPLOAD);
  getServer(xhr, success, error);
  xhr.send(data);
};

window.server = {
  load,
  upload
};
