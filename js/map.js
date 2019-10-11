'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapIsActive = false;

  var renderAdvertisement = function (advertisement) {
    var adElem = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    adElem.style.left = advertisement.location.x + 'px';
    adElem.style.top = advertisement.location.y + 'px';
    adElem.querySelector('img').src = advertisement.author.avatar;
    adElem.querySelector('img').alt = advertisement.offer.title;

    return adElem;
  };

  var succesGettingHandler = function (advertisements) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advertisements.length; i++) {
      var advertisementPin = renderAdvertisement(advertisements[i]);
      fragment.appendChild(advertisementPin);
      window.pins.setAdverstismentData(advertisements[i], advertisementPin);
    }

    mapPinsList.appendChild(fragment);
    window.pins.onMapPinClick();
  };


  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var errorBlock = errorTemplate.querySelector('.error');
    var siteMain = document.querySelector('main');
    var errorMessageCloseBtn = errorBlock.querySelector('.error__button');
    var closeErrorPopup = function () {
      siteMain.removeChild(errorBlock);
    };

    errorBlock.querySelector('.error__message').textContent = errorMessage;
    siteMain.appendChild(errorBlock);

    errorMessageCloseBtn.addEventListener('click', closeErrorPopup, {
      once: true
    });

    document.addEventListener('click', closeErrorPopup, {
      once: true
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeErrorPopup);
    }, {
      once: true
    });
  };

  /**
   * Активирует карту и формы
   */
  var openMap = function () {
    if (!mapIsActive) {
      window.backend.load(succesGettingHandler, errorHandler);
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      mapIsActive = true;
      window.form.toggleEnableForms(mapIsActive);
      window.form.validateForm();
      window.pins.setAddressInInput(true);
    }
  };

  window.map = {
    open: openMap,
  };
})();
