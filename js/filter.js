'use strict';

(function () {
  var OfferPrice = {
    LOW: {
      MAX: '10000',
    },
    MIDDLE: {
      MIN: '10000',
      MAX: '50000',
    },
    HIGH: {
      MIN: '50000',
    }
  };
  var filter = document.querySelector('.map__filters');
  var housingTypeToggle = filter.querySelector('#housing-type');
  var priceToggle = filter.querySelector('#housing-price');
  var housingRoomsToggle = filter.querySelector('#housing-rooms');
  var housingGuestsToggle = filter.querySelector('#housing-guests');
  var housingFeaturesToggle = filter.querySelector('#housing-features');

  var checkType = function (advertisement) {
    if (housingTypeToggle.value === 'any') {
      return advertisement;
    }

    return advertisement.offer.type === housingTypeToggle.value;
  };

  var checkPrice = function (advertisement) {
    if (priceToggle.value === 'middle') {
      return advertisement.offer.price >= OfferPrice.MIDDLE.MIN && advertisement.offer.price < OfferPrice.MIDDLE.MAX;
    } else if (priceToggle.value === 'low') {
      return advertisement.offer.price < OfferPrice.LOW.MAX;
    } else if (priceToggle.value === 'high') {
      return advertisement.offer.price >= OfferPrice.HIGH.MIN;
    }

    return advertisement;
  };

  var checkRooms = function (advertisement) {
    if (housingRoomsToggle.value === 'any') {
      return advertisement;
    }

    return advertisement.offer.rooms === housingRoomsToggle.value;
  };

  var checkGuests = function (advertisement) {
    if (housingGuestsToggle.value === 'any') {
      return advertisement;
    }

    return advertisement.offer.guests === housingGuestsToggle.value;
  };

  var checkFeatures = function (advertisement) {
    var checkedFeatures = housingFeaturesToggle.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (element) {
      return advertisement.offer.features.includes(element.value);
    });
  };

  var onFilterChange = function () {
    return window.map.ads.filter(function (item) {
      return checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item) && checkFeatures(item);
    });
  };

  var updateData = window.debounce(function () {
    window.pins.removePinsAndCard();
    var filteredAds = onFilterChange();
    window.map.renderAdvertisements(filteredAds.slice(0, window.map.PINS_LIMIT));
  });

  filter.addEventListener('change', updateData);
})();
