'use strict';

(function () {
  /**
   * @param {String} type - Полученный с сервера тип гостиницы
   * @return {String} - Русский перевод
   */
  var getPopupType = function (type) {
    var HouseTypes = {
      FLAT: 'Квартира',
      BUNGALO: 'Бунгало',
      HOUSE: 'Дом',
      PACALE: 'Дворец',
    };

    return HouseTypes[type];
  };

  /**
   * @param {Object} advertisement - Объявление с данными
   * @return {HTMLElement} - Карточка объявления
   */
  var renderCard = function (advertisement) {
    var cardTemplate = document.querySelector('#card').content.cloneNode(true);
    var cardElem = cardTemplate.querySelector('.map__card');
    var popupTitle = cardElem.querySelector('.popup__title');
    var popupAddress = cardElem.querySelector('.popup__text--address');
    var popupPrice = cardElem.querySelector('.popup__text--price');
    var popupType = cardElem.querySelector('.popup__type');
    var popupCapacity = cardElem.querySelector('.popup__text--capacity');
    var popupTime = cardElem.querySelector('.popup__text--time');
    var popupFeatures = cardElem.querySelector('.popup__features');
    var popupDescription = cardElem.querySelector('.popup__description');
    var popupPhotos = cardElem.querySelector('.popup__photos');
    var popupAvatar = cardElem.querySelector('.popup__avatar');

    popupTitle.textContent = advertisement.offer.title;
    popupAddress.textContent = advertisement.offer.address;
    popupPrice.textContent = advertisement.offer.price + '₽/ночь';
    popupType.textContent = getPopupType(advertisement.offer.type.toUpperCase());
    popupCapacity.textContent = advertisement.offer.rooms + ' комнаты, для ' + advertisement.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + advertisement.offer.checkin + ' , выезд до ' + advertisement.offer.checkout;
    popupFeatures.textContent = advertisement.offer.features.join(', ');
    popupDescription.textContent = advertisement.offer.description;
    popupAvatar.src = advertisement.author.avatar;
    advertisement.offer.photos.forEach(function (item) {
      popupPhotos.querySelector('img').src = item;

      if (item) {
        var hotelImage = popupPhotos.querySelector('img').cloneNode(true);
        hotelImage.src = item;
        popupPhotos.appendChild(hotelImage);
      }
    });

    return cardElem;
  };

  /**
   * Скрывает все объявления.
   */
  var hideCardsExcepThLast = function () {
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (item) {
      item.style.display = 'none';
    });
  };

  /**
   * Получает каждый элемент массива с объектами, полученными из сервера, вызывает функцию генерации карточки объявления и отобржает на карте
   * @param {Object} advertisement - Объявление с данными
   */
  var putCardsInMap = function (advertisement) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapFiltersContainer.insertAdjacentElement('beforeBegin', renderCard(advertisement));
    hideCardsExcepThLast();
  };

  window.card = {
    putCardsInMap: putCardsInMap,
  };
})();
