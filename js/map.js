'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapIsActive = false;

  /**
   * @param {Object} advertisement - Элемент массива объектов объявлений, полученных с сервера
   * @return {HTMLElement} - Пин объявления
   */
  var renderAdvertisement = function (advertisement) {
    var adElem = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    adElem.style.left = advertisement.location.x + 'px';
    adElem.style.top = advertisement.location.y + 'px';
    adElem.querySelector('img').src = advertisement.author.avatar;
    adElem.querySelector('img').alt = advertisement.offer.title;

    return adElem;
  };

  /**
   * При успешной загрузки данных с сервера, отображает пины на карте
   * @param {Array} advertisements - Массив объектов, полученных с сервера
   */
  var succesGettingHandler = function (advertisements) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advertisements.length; i++) {
      var advertisementPin = renderAdvertisement(advertisements[i]);
      fragment.appendChild(advertisementPin);
      window.pins.setAdverstismentData(advertisements[i], advertisementPin);
    }

    mapPinsList.appendChild(fragment);
    window.card.openPopup();
  };

  var succesPostingHandler = function () {
    window.pins.removePinsAndCard();
    mapIsActive = false;
    window.form.toggleForm(mapIsActive);
    window.form.adForm.reset();
    window.pins.setMainPinInCenter();
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    showSuccessMsg();
  };

  /**
   * При неуспешной загрузки данных с сервера, выводит сообщение об ошибке
   * @param {String} errorMessage - Текст сообщения
   */
  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true);
    var errorBlock = errorTemplate.querySelector('.error');
    var siteMain = document.querySelector('main');
    var errorMessageCloseBtn = errorBlock.querySelector('.error__button');

    /**
     * Закрывает окно с сообщением об ошибке
     */
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
   * Показывает сообщение об успешной отправке формы
   */
  var showSuccessMsg = function () {
    var successTemplate = document.querySelector('#success').content.cloneNode(true);
    var successBlock = successTemplate.querySelector('.success');
    var siteMain = document.querySelector('main');

    siteMain.appendChild(successBlock);

    /**
     * Закрывает окно с сообщением об успешной отправке формы
     */
    var closeSuccessPopup = function () {
      siteMain.removeChild(successBlock);
    };

    document.addEventListener('click', closeSuccessPopup, {
      once: true
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeSuccessPopup);
      document.removeEventListener('click', closeSuccessPopup);
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
      mapIsActive = true;
      window.form.toggleForm(mapIsActive);
    }
  };

  window.map = {
    mapBlock: map,
    open: openMap,
    succesPostingHandler: succesPostingHandler,
    errorHandler: errorHandler,
  };
})();
