'use strict';

(function () {
  var housingTypeToggle = document.querySelector('#housing-type');

  var filterForm = function () {
    var filteredAds = window.map.ads.filter(function (item) {
      return item.offer.type === housingTypeToggle.value;
    });

    return filteredAds;
  };


  var updateData = function () {
    window.pins.removePinsAndCard();
    var filteredForm = filterForm();
    filteredForm.slice(0, window.map.PINS_LIMIT);
    window.map.renderAdvertisements(filteredForm);
  };

  housingTypeToggle.addEventListener('change', updateData);
})();
