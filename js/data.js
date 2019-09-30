'use strict';

(function () {
  var X = {
    min: 0,
    max: 1200,
  };

  var Y = {
    min: 130,
    max: 630,
  };

  var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
    var locationX = getRandomNumber(X.min, X.max);
    var locationY = getRandomNumber(Y.min, Y.max);
    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + index + '.png',
      },

      offer: {
        title: null,
        address: locationX + ' ,' + locationY,
        price: null,
        type: window.util.getRandomElem(HOTEL_TYPES),
        rooms: null,
        guests: null,
        checkin: window.util.getRandomElem(CHECKIN_CHECKOUT_TIME),
        checkout: window.util.getRandomElem(CHECKIN_CHECKOUT_TIME),
        features: window.util.getRandomElem(HOTEL_FEATURES),
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

  window.data = {
    /**
     * @param {Number} index - Индекс из цикла, который находится в showAdvertisements()
     * @return {HTMLElement} - Объявление с данными
     */
    renderAdvertisement: function (index) {
      var adElem = adTemplate.cloneNode(true);
      adElem.style.left = createAdvertisement().location.x + 'px';
      adElem.style.top = createAdvertisement().location.y + 'px';
      adElem.querySelector('img').src = createAdvertisement(index).author.avatar;
      adElem.querySelector('img').alt = createAdvertisement().offer.title;

      return adElem;
    },
  };
})();
