'use strict';

var COUNT_OF_ADS = 8;
var PIN_SIZE = 65;
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
var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
var mapFiltersSelects = mapFilters.querySelectorAll('.select');
var mainMapPin = document.querySelector('.map__pin--main');
var mapIsActive = false;
var capacitySelect = adForm.querySelector('#capacity');
var roomNumberSelect = adForm.querySelector('#room_number');

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
 * Показывает объявления на карте
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
 * Переключает поле в активное/неактивное состояние
 * @param {Arry} elems - Массив, содержащий интерактивные поля (input, select, fieldset)
 * @param {Boolean} isNotActive - Необходимый вид карты (активный/неактивный)
 */
var toggleEnableForms = function (elems, isNotActive) {
  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = isNotActive;
  }
};

// Переключает карту в активное состояние
[adFormFieldsets, mapFiltersFieldsets, mapFiltersSelects].forEach(function (item) {
  toggleEnableForms(item, true);
});

/**
 * Добавляет адрес пина в поле "адрес" и делает это поля только для чтения
 * @param {Boolean} isActive - Активна карта или неактивна
 * @return {Any} - Адрес
 */
var setAddressInInput = function (isActive) {
  var addressInput = adForm.querySelector('input[name="address"]');
  var mapPinPosition = addressInput.value;

  addressInput.value = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE / 2));

  if (isActive) {
    addressInput.value = Math.round(parseInt(mainMapPin.style.left, 10) + PIN_SIZE / 2) + ', ' + Math.round((parseInt(mainMapPin.style.top, 10) + PIN_SIZE * 2));
  }
  return mapPinPosition;
};

setAddressInInput(false);

/**
 * Проводит валидацию поля выбора количества гостей с учетом выбранной комнаты
 */
var validateForm = function () {
  capacitySelect.querySelectorAll('option').forEach(function (item) {
    item.disabled = roomNumberSelect.value < item.value || item.value === '0';
    if (roomNumberSelect.value === '100') {
      item.disabled = item.value > 0;
    }

    if (!item.disabled) {
      item.selected = true;
    }

    if (item.selected > roomNumberSelect.value) {
      capacitySelect.setCustomValidity('Выберете доступный вариант');
    }
  });
};

/**
 * Активирует карту и формы
 */
var openMap = function () {
  if (!mapIsActive) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    showAdvertisements();
    [adFormFieldsets, mapFiltersFieldsets, mapFiltersSelects].forEach(function (item) {
      toggleEnableForms(item, false);
    });
    validateForm();
    mapIsActive = true;
    setAddressInInput(true);
  }
};

mainMapPin.addEventListener('mousedown', openMap);
mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

roomNumberSelect.addEventListener('change', validateForm);
