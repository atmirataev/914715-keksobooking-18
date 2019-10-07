'use strict';

(function () {
  /**
   * @param {Object} ad - Объявление с данными
   * @return {HTMLElement} - Карточка объявления
   */
  var renderCard = function (ad) {
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

    var getPopupType = function (type) {
      var houseTypes = {
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом',
        palace: 'Дворец',
      };

      return houseTypes[type];
    };

    popupTitle.textContent = ad.offer.title;
    popupAddress.textContent = ad.offer.address;
    popupPrice.textContent = ad.offer.price + '₽/ночь';
    popupType.textContent = getPopupType(ad.offer.type);
    popupCapacity.textContent = ad.offer.rooms + ' комнаты, для ' + ad.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
    popupFeatures.textContent = ad.offer.features.join(', ');
    popupDescription.textContent = ad.offer.description;
    popupAvatar.src = ad.author.avatar;
    ad.offer.photos.forEach(function (item) {
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
   * Получает каждый элемент массива с объектами, полученными из сервера, вызывает функцию генерации карточки объявления и отобржает на карте
   * @param {Object} ad - Объявление с данными
   */
  var putCardsInMap = function (ad) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapFiltersContainer.insertAdjacentElement('beforeBegin', renderCard(ad));
  };

  window.card = {
    putCardsInMap: putCardsInMap,
  };
})();
