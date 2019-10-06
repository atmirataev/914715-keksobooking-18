'use strict';

(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();

  var renderCard = function (ad) {
    var cardElem = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
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

    var getPopupType = function (houseType) {
      switch (houseType) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
      }

      return houseType;
    };

    popupTitle.textContent = ad.offer.title;
    popupAddress.textContent = ad.offer.address;
    popupPrice.textContent = ad.offer.price + '₽/ночь';
    popupType.textContent = getPopupType(ad.offer.type);
    popupCapacity.textContent = ad.offer.rooms + ' команаты, для ' + ad.offer.guests + ' гостей';
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

    fragment.appendChild(cardElem);

  };

  mapFiltersContainer.insertAdjacentHTML('beforeBegin', fragment);

  window.card = {
    render: renderCard,
  };
})();
