'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var isEnterEvent = function (evt, func) {
    if (evt.keyCode === ENTER_KEYCODE) {
      func();
    }
  };

  /**
   * @param {Array} arr - Массив данных для генерации случайных данных
   * @return {Any} - Случайный элемент массива
   */
  var getRandomElem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  /**
   * @param {Number} min - Минимальное число
   * @param {Number} max - Максимальное число
   * @return {Number} - Случайное число от min до max
   */
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    getRandomElem: getRandomElem,
    getRandomNumber: getRandomNumber,
  };
})();
