'use strict';

(function () {
  var filter = document.querySelector('.map__filters');

  var filterAds = function (ads) {
    return ads.filter(function (item) {
      var housingTypeToggle = filter.querySelector('#housing-type');

      if (housingTypeToggle.value !== 'any') {
        return item.offer.type === housingTypeToggle.value;
      }

      return window.map.ads;
    }).filter(function (item) {
      var priceToggle = filter.querySelector('#housing-price');

      if (priceToggle.value === 'middle') {
        return item.offer.price >= '10000' && item.offer.price < '50000';
      } else if (priceToggle.value === 'low') {
        return item.offer.price < '10000';
      } else if (priceToggle.value === 'high') {
        return item.offer.price >= '50000';
      }

      return window.map.ads;
    }).filter(function (item) {
      var housingRoomsToggle = filter.querySelector('#housing-rooms');

      if (housingRoomsToggle.value !== 'any') {
        return item.offer.rooms === +housingRoomsToggle.value;
      }

      return window.map.ads;
    }).filter(function (item) {
      var housingGuestsToggle = filter.querySelector('#housing-guests');

      if (housingGuestsToggle.value !== 'any') {
        return item.offer.guests === +housingGuestsToggle.value;
      }

      return window.map.ads;
    }).filter(function (item) {
      var housingFeaturesToggle = filter.querySelector('#housing-features');
      var checkedFeatures = housingFeaturesToggle.querySelectorAll('input:checked');

      return Array.from(checkedFeatures).every(function (element) {
        return item.offer.features.includes(element.value);
      });
    });
  };

  var updateData = window.debounce(function () {
    window.pins.removePinsAndCard();
    var filteredAds = filterAds(window.map.ads);
    window.map.renderAdvertisements(filteredAds.slice(0, window.map.PINS_LIMIT));
  });

  filter.addEventListener('change', updateData);
})();
