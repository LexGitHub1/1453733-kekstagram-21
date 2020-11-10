'use strict';

(function () {

  const URL = {
    load: `https://21.javascript.pages.academy/kekstagram/data`,
    upload: `https://21.javascript.pages.academy/kekstagram`
  };

  const STATUS_CODE = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;

  const server = function (xhr, onSuccess, onError) {
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  const load = function (success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(`GET`, URL.load);
    server(xhr, success, error);
    xhr.send();
  };

  const upload = function (data, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL.upload);
    server(xhr, success, error);
    xhr.send(data);
  };

  window.server = {
    load,
    upload
  };
})();
