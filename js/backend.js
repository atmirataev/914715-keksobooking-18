'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var ERROR_MSG = 'Произошла ошибка соединения';
  var OK_STATUS = 200;

  /**
   * Подготавливает запрос
   * @param {Function} onLoad - Callback, который срабатыает при успешном выполнении запроса
   * @param {Function} onError - Callback, который не срабатыает при успешном выполнении запроса
   * @return {XMLHttpRequest} - Готовый запрос на сервер
   */
  var prepareRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ERROR_MSG);
    });

    return xhr;
  };

  /**
   * Функия, получающая данные с сервера
   * @param {Function} onLoad - Callback, который срабатыает при успешном выполнении запроса
   * @param {Function} onError - Callback, который не срабатыает при успешном выполнении запроса
   */
  var load = function (onLoad, onError) {
    var xhr = prepareRequest(onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  /**
   * Функция, отправляющая данные на сервер
   * @param {Object} data - Oбъект FormData, который содержит данные формы, которые будут отправлены на сервер
   * @param {Function} onLoad - Callback, который срабатыает при успешном выполнении запроса
   * @param {Function} onError - Callback, который не срабатыает при успешном выполнении запроса
   */
  var save = function (data, onLoad, onError) {
    var xhr = prepareRequest(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
