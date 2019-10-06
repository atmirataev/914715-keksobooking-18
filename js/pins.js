'use strict';

(function () {
  var PIN_SIZE = 65;
  var NEEDLE_HEIGHT = 22;
  var mainMapPin = document.querySelector('.map__pin--main');

  mainMapPin.addEventListener('mousedown', window.map.open);
  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.open);
  });

  /**
   * Добавляет адрес пина в поле "адрес" и делает это поля только для чтения
   * @param {Boolean} isActive - Активна карта или неактивна
   * @return {Any} - Адрес
   */
  var setAddressInInput = function (isActive) {
    var addressInput = window.form.adForm.querySelector('input[name="address"]');
    var mapPinPosition = addressInput.value;

    addressInput.value = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE / 2));

    if (isActive) {
      addressInput.value = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE + NEEDLE_HEIGHT));
    }

    return mapPinPosition;
  };

  setAddressInInput(false);

  window.mainPin = {
    setAddressInInput: setAddressInInput,
  };

})();
