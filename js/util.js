'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  /**
   * Выполняет func по нажатию на клавишу Enter
   * @param {Object} evt - Событие во время нажатия на клавишу
   * @param {Function} func - Фукнкция обратного вызова
   */
  var isEnterEvent = function (evt, func) {
    if (evt.keyCode === ENTER_KEYCODE) {
      func();
    }
  };

  /**
   * Выполняет func по нажатию на клавишу Esc
   * @param {Object} evt - Событие во время нажатия на клавишу
   * @param {Function} func - Фукнкция обратного вызова
   */
  var isEscEvent = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
  };
})();
