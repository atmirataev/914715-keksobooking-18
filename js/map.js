'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapIsActive = false;

  var renderAdvertisement = function (ad) {
    var adElem = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    adElem.style.left = ad.location.x + 'px';
    adElem.style.top = ad.location.y + 'px';
    adElem.querySelector('img').src = ad.author.avatar;
    adElem.querySelector('img').alt = ad.offer.title;

    return adElem;
  };

  var succesGettingHandler = function (ads) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderAdvertisement(ads[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var errorBlock = errorTemplate.querySelector('.error');
    var siteMain = document.querySelector('main');
    var errorMessageCloseBtn = errorBlock.querySelector('.error__button');

    errorBlock.querySelector('.error__message').textContent = errorMessage;
    siteMain.appendChild(errorBlock);

    errorMessageCloseBtn.addEventListener('click', function () {
      window.backend.load(succesGettingHandler, errorHandler);
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
      window.mainPin.setAddressInInput(true);
    }
  };

  window.map = {
    open: openMap,
  };
})();
