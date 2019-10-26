'use strict';

(function () {
  var HouseType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  /**
   * @param {Object} advertisement - Объявление с данными
   * @return {HTMLElement} - Карточка объявления
   */
  var renderCard = function (advertisement) {
    var cardElem = cardTemplate.cloneNode(true);
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
    var offerType = advertisement.offer.type.toUpperCase();
    popupType.textContent = HouseType[offerType];
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
   * Получает данные пина, передает их в функцию создания карточки объявления, а также показывает и удаляет карточку объявления
   * @param {Object} advertisementData - Данные объявления
   */
  var putCardInMap = function (advertisementData) {
    var currentCard = renderCard(advertisementData);
    var cardCloseBtn = currentCard.querySelector('.popup__close');

    mapFiltersContainer.insertAdjacentElement('beforeBegin', currentCard);

    cardCloseBtn.addEventListener('click', closeCardPopup);
    document.addEventListener('keydown', onPopupEscPress, {
      once: true
    });
  };

  /**
   * Закрывает попап по нажатию Esc
   * @param {Event} evt - Объект event
   */
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCardPopup);
  };

  /**
   * Закрывает попап карточки объявления
   */
  var closeCardPopup = function () {
    var adCard = document.querySelector('.map__card');
    var cardCloseBtn = document.querySelector('.popup__close');

    map.removeChild(adCard);
    cardCloseBtn.removeEventListener('click', closeCardPopup);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  /**
   * При клике на пин открывает окно с карточкой объявления
   */
  var openCardPopup = function () {
    mapPins.addEventListener('click', function (evt) {
      var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
      var isCardOnSite = document.querySelector('.map__card');

      if (!mapPin) {
        return;
      }

      var advertisementData = window.pins.parseAdvertisementData(mapPin);

      if (isCardOnSite) {
        window.card.closePopup();
      }
      putCardInMap(advertisementData);
    });
  };

  window.card = {
    closePopup: closeCardPopup,
    openPopup: openCardPopup,
  };
})();
