'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  window.util = {
    isEnterEvent: function (evt, func) {
      if (evt.keyCode === ENTER_KEYCODE) {
        func();
      }
    },

    /**
     * @param {Array} arr - Массив данных для генерации случайных данных
     * @return {Any} - Случайный элемент массива
     */
    getRandomElem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  };
})();
