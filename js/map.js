'use strict';

(function () {
  var COUNT_OF_ADS = 8;
  var map = document.querySelector('.map');
  var mapIsActive = false;

  /**
   * Показывает объявления на карте
   */
  var showAdvertisements = function () {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 1; i <= COUNT_OF_ADS; i++) {
      fragment.appendChild(window.data.renderAdvertisement(i));
    }
    mapPinsList.appendChild(fragment);
  };

  /**
   * Активирует карту и формы
   */
  var openMap = function () {
    if (!mapIsActive) {
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      showAdvertisements();
      mapIsActive = true;
      window.form.toggleEnableForms(mapIsActive);
      window.form.validateForm();
      window.mainPin.setAddressInInput(true);
    }
  };

  window.map = {
    isActive: mapIsActive,
    open: openMap,
  };
})();
