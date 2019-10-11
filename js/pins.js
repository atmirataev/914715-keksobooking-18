'use strict';

(function () {
  /**
   * Добавляет адрес пина в поле "адрес" и делает это поля только для чтения
   * @param {Boolean} isActive - Активна карта или неактивна
   * @return {Any} - Адрес
   */
  var setAddressInInput = function (isActive) {
    var PIN_SIZE = 65;
    var NEEDLE_HEIGHT = 22;

    var addressInput = window.form.adForm.querySelector('input[name="address"]');
    var mapPinPosition = addressInput.value;
    var mainMapPin = document.querySelector('.map__pin--main');

    addressInput.value = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE / 2));

    if (isActive) {
      addressInput.value = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE + NEEDLE_HEIGHT));
    }

    mainMapPin.addEventListener('mousedown', window.map.open);
    mainMapPin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.map.open);
    });

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

  /**
   * При клике на пин открывает окно с карточкой объявления
   */
  var onMapPinClick = function () {
    var mapPins = document.querySelectorAll('.map__pin');

    mapPins.forEach(function (item) {
      item.addEventListener('click', function () {
        var advertisementData = parseAdvertisementData(item);
        var isCardOnSite = document.querySelector('.map__card');

        if (isCardOnSite) {
          window.card.closePopup();
        }

        window.card.putCardInMap(advertisementData);
      });
    });
  };

  setAddressInInput(false);

  window.pins = {
    setAddressInInput: setAddressInInput,
    setAdverstismentData: setAdverstismentData,
    onMapPinClick: onMapPinClick,
  };
})();
