'use strict';

var COUNT_OF_ADS = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var ENTER_KEYCODE = 13;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var fieldsetsInMapFilters = mapFilters.querySelectorAll('fieldset');
var selectInMapFilters = mapFilters.querySelectorAll('.select');
var mainMapPin = document.querySelector('.map__pin--main');
var mapIsActive = false;
var capacitySelect = adForm.querySelector('#capacity');

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

/**
 * @description - Отключает поля формы
 */
var disableForms = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', 'disabled');
  }

  for (i = 0; i < fieldsetsInMapFilters.length; i++) {
    fieldsetsInMapFilters[i].setAttribute('disabled', 'disabled');
  }

  for (i = 0; i < selectInMapFilters.length; i++) {
    selectInMapFilters[i].setAttribute('disabled', 'disabled');
  }
};

disableForms(); // Неактивные поля при старте загрузки страницы

/**
 * @description - Делает активными поля формы
 */
var doActiveForms = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  }

  for (i = 0; i < fieldsetsInMapFilters.length; i++) {
    fieldsetsInMapFilters[i].removeAttribute('disabled');
  }

  for (i = 0; i < selectInMapFilters.length; i++) {
    selectInMapFilters[i].removeAttribute('disabled');
  }
};

/**
 * @description - Добавляет адрес пина в поле "адрес"
 * @return {Any} - Адрес
 */
var getMapPinPosition = function () {
  var mapPinPosition = adForm.querySelector('input[name="address"]').value = parseInt(mainMapPin.style.left, 10) + ', ' + parseInt(mainMapPin.style.top, 10);
  return mapPinPosition;
};

getMapPinPosition(); // Ввод адреса в соответствующее поле при старте загрузки страницы

/**
 * @description - Активирует карту и формы
 */
var openMap = function () {
  if (!mapIsActive) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    showAdvertisements();
    doActiveForms();
    mapIsActive = true;
  }
};

mainMapPin.addEventListener('mousedown', openMap);
mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

// Проблемы:
// 1. Валидация. Пытался сделать через второй подход. Писал-писал код - закопался и удалил все.

var checkIsCapacityMoreThanRooms = function () {
  var selectedRoom = adForm.querySelector('#room_number').querySelector('option[selected]').value;
  var selectedCapacity = capacitySelect.querySelector('option[selected]').value;

  if (selectedRoom < selectedCapacity) {
    return true;
  }

  return false;
};
