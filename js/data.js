'use strict';

(function () {
  var MAP_X_COORD = {
    min: 0,
    max: 1200,
  };

  var MAP_Y_COORD = {
    min: 130,
    max: 630,
  };

  var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * @return {Array} - Массив случайной длины
   */
  var getPhotos = function () {
    var photos = [];
    var photosCount = window.util.getRandomNumber(1, 3);

    for (var i = 1; i <= photosCount; i++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
    }

    return photos;
  };

  /**
   * @param {Number} index - Индекс из цикла, который находится в showAdvertisements()
   * @return {Object} - Структура объявления без данных
   */
  function createAdvertisement(index) {
    var locationX = window.util.getRandomNumber(MAP_X_COORD.min, MAP_X_COORD.max);
    var locationY = window.util.getRandomNumber(MAP_Y_COORD.min, MAP_Y_COORD.max);
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
  }

  /**
   * @param {Number} index - Индекс из цикла, который находится в showAdvertisements()
   * @return {HTMLElement} - Объявление с данными
   */
  var renderAdvertisement = function (index) {
    var adElem = adTemplate.cloneNode(true);
    var adData = createAdvertisement(index);
    adElem.style.left = adData.location.x + 'px';
    adElem.style.top = adData.location.y + 'px';
    adElem.querySelector('img').src = adData.author.avatar;
    adElem.querySelector('img').alt = adData.offer.title;

    return adElem;
  };

  window.data = {
    renderAdvertisement: renderAdvertisement,
  };
})();
