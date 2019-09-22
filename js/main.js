'use strict';

var COUNT_OF_ADS = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');

map.classList.remove('map--faded');

/**
 * @param {array} arr массив данных для генерации случайных данных
 * @return {string} случайный элемент массива
 */
var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * @param {number} min от
 * @param {number} max до
 * @return {number} случайное число от min до max
 */
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

HOTEL_PHOTOS.length = getRandomNumber(1, 3);

/**
 * @param {number} index сюда передается индекс из цикла, который находится в showAdvertisements()
 * @return {string} структура объявления без данных
 */
var createAdvertisement = function (index) {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);
  var advertisement = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
    },

    offer: {
      title: null,
      address: locationX + ' ,' + locationY,
      price: null,
      type: getRandomElem(HOTEL_TYPES),
      rooms: null,
      guests: null,
      checkin: getRandomElem(CHECKIN_CHECKOUT_TIME),
      checkout: getRandomElem(CHECKIN_CHECKOUT_TIME),
      features: getRandomElem(HOTEL_FEATURES),
      description: null,
      photos: HOTEL_PHOTOS,
    },

    location: {
      x: locationX,
      y: locationY,
    }
  };

  return advertisement;
};

/**
 * @param {number} index сюда передается индекс из цикла, который находится в showAdvertisements()
 * @return {string} объявление с данными
 */
var renderAdvertisement = function (index) {
  var adElem = adTemplate.cloneNode(true);
  adElem.style.left = createAdvertisement().location.x + 'px';
  adElem.style.top = createAdvertisement().location.y + 'px';
  adElem.querySelector('img').src = createAdvertisement(index).author.avatar;
  adElem.querySelector('img').alt = createAdvertisement().offer.title;

  return adElem;
};

/**
 * @description показывает объявления на карте
 */
var showAdvertisements = function () {
  var mapPinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 1; i <= COUNT_OF_ADS; i++) {
    fragment.appendChild(renderAdvertisement(i));
    mapPinsList.appendChild(fragment);
  }
};

showAdvertisements();
