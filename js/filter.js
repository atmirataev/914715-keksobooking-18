'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var OfferPrice = {
    LOW: {
      MAX: '9999',
    },
    MIDDLE: {
      MIN: '10000',
      MAX: '49999',
    },
    HIGH: {
      MIN: '50000',
    }

  };
  var housingTypeToggle = filter.querySelector('#housing-type');
  var priceToggle = filter.querySelector('#housing-price');
  var housingRoomsToggle = filter.querySelector('#housing-rooms');
  var housingGuestsToggle = filter.querySelector('#housing-guests');
  var housingFeaturesToggle = filter.querySelector('#housing-features');


  var filterAds = function (ads) {
    return ads.filter(function (item) {

      if (housingTypeToggle.value !== 'any') {
        return item.offer.type === housingTypeToggle.value;
      }

      return window.map.ads;
    }).filter(function (item) {

      if (priceToggle.value === 'middle') {
        return item.offer.price >= OfferPrice.MIDDLE.MIN && item.offer.price < OfferPrice.MIDDLE.MAX;
      } else if (priceToggle.value === 'low') {
        return item.offer.price < OfferPrice.LOW.MAX;
      } else if (priceToggle.value === 'high') {
        return item.offer.price >= OfferPrice.HIGH.MIN;
      }

      return window.map.ads;
    }).filter(function (item) {

      if (housingRoomsToggle.value !== 'any') {
        return item.offer.rooms === +housingRoomsToggle.value;
      }

      return window.map.ads;
    }).filter(function (item) {

      if (housingGuestsToggle.value !== 'any') {
        return item.offer.guests === +housingGuestsToggle.value;
      }

      return window.map.ads;
    }).filter(function (item) {
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
