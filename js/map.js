'use strict';

(function () {
  var PINS_LIMIT = 5;
  var map = document.querySelector('.map');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var siteMain = document.querySelector('main');
  var ads = [];
  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * @param {Object} advertisement - Элемент массива объектов объявлений, полученных с сервера
   * @return {HTMLElement} - Метка объявления
   */
  var renderAdvertisement = function (advertisement) {
    var adElem = adTemplate.cloneNode(true);
    adElem.style.left = advertisement.location.x + 'px';
    adElem.style.top = advertisement.location.y + 'px';
    adElem.querySelector('img').src = advertisement.author.avatar;
    adElem.querySelector('img').alt = advertisement.offer.title;

    return adElem;
  };


  /**
   * Показывает на карте необходимое количество меток объявлений
   * @param {Array} advertisements - Массив данных с объявлениями
   */
  var renderAdvertisements = function (advertisements) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advertisements.length; i++) {
      var advertisementPin = renderAdvertisement(advertisements[i]);
      fragment.appendChild(advertisementPin);
      window.pins.setAdverstismentData(advertisements[i], advertisementPin);
    }

    mapPinsList.appendChild(fragment);
  };

  /**
   * При успешной загрузки данных с сервера, отображает пины на карте
   * @param {Array} data - Массив объектов, полученных с сервера
   */
  var succesGettingHandler = function (data) {
    window.map.ads = data;
    var choosenAds = window.map.ads.slice(0, PINS_LIMIT);
    renderAdvertisements(choosenAds);
    window.card.openPopup();
  };

  /**
   * Показывает сообщение об успешной отправке формы
   */
  var showSuccessMsg = function () {
    var successBlock = successTemplate.cloneNode(true);

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
   * После успешной отправки данных, переводит карту в неактивное состояние и показывает сообщение об успешной отравке данных
   */
  var succesPostingHandler = function () {
    makeMapInactive();
    showSuccessMsg();
  };

  /**
   * При неуспешной загрузки данных с сервера, выводит сообщение об ошибке
   * @param {String} errorMessage - Текст сообщения
   */
  var errorHandler = function (errorMessage) {
    var errorBlock = errorTemplate.cloneNode(true);

    errorBlock.querySelector('.error__message').textContent = errorMessage;
    siteMain.appendChild(errorBlock);

    /**
     * Закрывает окно с сообщением об ошибке
     */
    var closeErrorPopup = function () {
      siteMain.removeChild(errorBlock);
      makeMapInactive();
    };

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
   * Переводит карту в неактивное состояние
   */
  var makeMapInactive = function () {
    window.pins.removePinsAndCard();
    window.form.toggle(false);
    window.form.advertisement.reset();
    window.images.reset();
    window.pins.setMainPinInCenter();
    map.classList.add('map--faded');
    window.form.advertisement.classList.add('ad-form--disabled');
    window.form.resetBtn.removeEventListener('click', makeMapInactive);
    window.pins.mainMapPin.addEventListener('keydown', window.pins.onMainMapPinEnterClick);
    window.pins.mainMapPin.addEventListener('mousedown', window.map.open);

  };

  /**
   * Активирует карту и формы
   */
  var openMap = function () {
    window.backend.load(succesGettingHandler, errorHandler);
    map.classList.remove('map--faded');
    window.form.toggle(true);
    window.pins.mainMapPin.removeEventListener('mousedown', window.map.open);
    window.pins.mainMapPin.removeEventListener('keydown', window.pins.onMainMapPinEnterClick);

  };

  window.map = {
    ads: ads,
    block: map,
    open: openMap,
    succesPostingHandler: succesPostingHandler,
    errorHandler: errorHandler,
    renderAdvertisements: renderAdvertisements,
    PINS_LIMIT: PINS_LIMIT,
    makeInactive: makeMapInactive,
  };
})();
