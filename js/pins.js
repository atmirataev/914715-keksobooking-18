'use strict';

(function () {
  var PIN_SIZE = 65;
  var NEEDLE_HEIGHT = 22;
  var MAIN_PIN_DEFAULT_POS = {
    top: 375,
    left: 570,
  };
  var mainMapPin = document.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
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
   * Добавляет адрес пина в поле "адрес"
   * @param {Boolean} isActive - Активна карта или неактивна
   * @return {String} - Позиция главного пина
   */
  var getAddress = function (isActive) {
    var pinXPos = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2);
    var pinYPos = parseInt(mainMapPin.style.top, 10);
    var heightDivider = isActive ? PIN_SIZE + NEEDLE_HEIGHT : PIN_SIZE / 2;

    return pinXPos + ', ' + Math.round(pinYPos + heightDivider);
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

  var onMainMapPinEnterClick = function (evt) {
    window.util.isEnterEvent(evt, window.map.open);
  };

  mainMapPin.addEventListener('keydown', onMainMapPinEnterClick);
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


      if (topPos >= mapSize.y.min - PIN_SIZE - NEEDLE_HEIGHT && topPos <= mapSize.y.max - PIN_SIZE - NEEDLE_HEIGHT) {
        mainMapPin.style.top = topPos + 'px';
      }

      if (leftPos >= mapSize.x.min - Math.round(PIN_SIZE / 2) && leftPos <= mapSize.x.max - Math.round(PIN_SIZE / 2)) {
        mainMapPin.style.left = leftPos + 'px';
      }

      window.form.setAddressInInput(true);
    };

    var onMoseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMoseMove);
      document.removeEventListener('mouseup', onMoseUp);
    };

    document.addEventListener('mousemove', onMoseMove);
    document.addEventListener('mouseup', onMoseUp);
  });

  /**
   * Перемещает позицию главной метки на положение по умолчаниб
   */
  var setMainPinInCenter = function () {
    mainMapPin.style.top = MAIN_PIN_DEFAULT_POS.top + 'px';
    mainMapPin.style.left = MAIN_PIN_DEFAULT_POS.left + 'px';
    window.form.setAddressInInput(false);
  };

  /**
   * Удаляет с карты метки и карточку объявления
   */
  var removePinsAndCard = function () {
    var mapPins = mapPinsList.querySelectorAll('.map__pin:not(.map__pin--main');
    var adCard = document.querySelector('.map__card');

    mapPins.forEach(function (mapPin) {
      mapPinsList.removeChild(mapPin);
    });

    if (adCard) {
      window.map.block.removeChild(adCard);
    }
  };

  window.pins = {
    mainMapPin: mainMapPin,
    setAdverstismentData: setAdverstismentData,
    parseAdvertisementData: parseAdvertisementData,
    getAddress: getAddress,
    setMainPinInCenter: setMainPinInCenter,
    removePinsAndCard: removePinsAndCard,
    onMainMapPinEnterClick: onMainMapPinEnterClick,
  };
})();
