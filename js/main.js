'use strict';

var COUNT_OF_ADS = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');

map.classList.remove('map--faded');

var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createAdvertisement = function (index) {
  var advertisement = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
    },

    offer: {
      title: null,
      address: '600, 350',
      price: null,
      type: getRandomElem(HOTEL_TYPES),
      rooms: null,
      guests: null,
      checkin: getRandomElem(CHECKIN_CHECKOUT_TIME),
      checkout: getRandomElem(CHECKIN_CHECKOUT_TIME),
      features: getRandomElem(HOTEL_FEATURES),
      description: null,
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomNumber(1, 3) + '.jpg',
    },

    location: {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y),
    }
  };

  return advertisement;
};

var renderAdvertisement = function (index) {
  var adElem = adTemplate.cloneNode(true);
  adElem.style.left = createAdvertisement().location.x + 'px';
  adElem.style.top = createAdvertisement().location.y + 'px';
  adElem.querySelector('img').src = createAdvertisement(index).author.avatar;
  adElem.querySelector('img').alt = createAdvertisement().offer.title;

  return adElem;
};

var showAdvertisements = function () {
  var mapPinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 1; i <= COUNT_OF_ADS; i++) {
    fragment.appendChild(renderAdvertisement(i));
    mapPinsList.appendChild(fragment);
  }
};

showAdvertisements();
