'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  /**
   * Устраняет 'дребезг' в ходе работы с фильтром. Данные обновляется с задержкой DEBOUNCE_INTERVAL мс
   * @param {Function} cb - Функция обратного вызова
   * @return {Function} - Устанавливает время задержки данных
   */
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = debounce;
})();
