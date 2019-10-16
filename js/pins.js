'use strict';

(function () {
  var mainMapPin = document.querySelector('.map__pin--main');
  var PIN_SIZE = 65;

  var mapSize = {
    x: {
      min: 0,
      max: 1200,
    },
    y: {
      min: 130,
      max: 630,
    },
  };

  /**
   * Добавляет адрес пина в поле "адрес" и делает это поля только для чтения
   * @param {Boolean} isActive - Активна карта или неактивна
   * @return {String} - Позиция главного пина
   */
  var getAdrress = function (isActive) {
    var NEEDLE_HEIGHT = 22;

    var mapPinPosition = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE / 2));

    if (isActive) {
      mapPinPosition = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE + NEEDLE_HEIGHT));
    }

    return mapPinPosition;
  };

  /**
   * Создает аттрибут для пина с данными в формате JSON
   * @param {Object} advertisementData - Объект с данными объявления
   * @param {HTMLElement} advertisementPin - Пин объявления
   */
  var setAdverstismentData = function (advertisementData, advertisementPin) {
    advertisementPin.setAttribute('data-params', JSON.stringify(advertisementData));
  };

  /**
   * Парсит данные из формата JSON в объект
   * @param {HTMLElement} advertisementPin - Пин объявления
   * @return {Object} - Объект с данными объявления
   */
  var parseAdvertisementData = function (advertisementPin) {
    var params = advertisementPin.getAttribute('data-params');
    return JSON.parse(params);
  };

  mainMapPin.addEventListener('mousedown', window.map.open);
  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMoseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      var topPos = mainMapPin.offsetTop - shift.y;
      var leftPos = mainMapPin.offsetLeft - shift.x;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (topPos >= mapSize.y.min - PIN_SIZE / 2 && topPos <= mapSize.y.max - PIN_SIZE / 2) {
        mainMapPin.style.top = topPos + 'px';
      }

      if (leftPos >= mapSize.x.min - PIN_SIZE / 2 && leftPos <= mapSize.x.max - PIN_SIZE / 2) {
        mainMapPin.style.left = leftPos + 'px';
      }

      window.form.setAddressInInput();
    };

    var onMoseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMoseMove);
      document.removeEventListener('mouseup', onMoseUp);
    };

    document.addEventListener('mousemove', onMoseMove);
    document.addEventListener('mouseup', onMoseUp);
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.open);
  });

  window.pins = {
    setAdverstismentData: setAdverstismentData,
    parseAdvertisementData: parseAdvertisementData,
    getAdrress: getAdrress,
  };
})();
