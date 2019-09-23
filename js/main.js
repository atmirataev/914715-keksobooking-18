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

/**
 * @param {Array} arr - Массив данных для генерации случайных данных
 * @return {Any} - Случайный элемент массива
 */
var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * @param {Number} min - Минимальное число
 * @param {Number} max - Максимальное число
 * @return {Number} - Случайное число от min до max
 */
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

/**
 * @return {Array} - Массив случайной длины
 */
var getPhotos = function () {
  var photos = [];
  var photosCount = getRandomNumber(1, 3);
  for (var i = 1; i <= photosCount; i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return photos;
};

/**
 * @param {Number} index - Индекс из цикла, который находится в showAdvertisements()
 * @return {Object} - Структура объявления без данных
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
      photos: getPhotos(),
    },

    location: {
      x: locationX,
      y: locationY,
    }
  };

  return advertisement;
};

/**
 * @param {Number} index - Индекс из цикла, который находится в showAdvertisements()
 * @return {HTMLElement} - Объявление с данными
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
 * @description - Показывает объявления на карте
 */
var showAdvertisements = function () {
  var mapPinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 1; i <= COUNT_OF_ADS; i++) {
    fragment.appendChild(renderAdvertisement(i));
  }
  mapPinsList.appendChild(fragment);
};

showAdvertisements();
