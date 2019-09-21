'use strict';

var NUMBER_OF_ADS = 8;

var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var adTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var createAd = function (index) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
    },

    offer: {
      title: null,
      address: null,
      price: null,
      type: getRandomElem(HOTEL_TYPES),
      rooms: null,
      guests: null,
      checkin: getRandomElem(CHECKIN_CHECKOUT_TIME),
      checkout: getRandomElem(CHECKIN_CHECKOUT_TIME),
      features: getRandomElem(HOTEL_FEATURES),
      description: null,
      photos: getRandomElem(HOTEL_PHOTOS),
    },

    location: {
      x: null,
      y: null,
    }
  };

  return ad;
};

var renderAd = function (index) {
  var adElem = adTemplate.cloneNode(true);
  adElem.style = 'left: ' + createAd().location.x + 'px; top: ' + createAd().location.y + 'px';
  adElem.img.src = createAd(index).author.avatar;
  adElem.alt = createAd().offer.title;

  return adElem;
};

var mapPinsList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (var i = 1; i <= NUMBER_OF_ADS; i++) {
  fragment.appendChild(renderAd(i));
  mapPinsList.appendChild(fragment);
}
