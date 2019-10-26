'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var NOT_FOR_GUESTS = '0';
  var A_LOT_OF_ROOMS = '100';
  var addressInput = adForm.querySelector('input[name="address"]');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('.select');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var houseType = adForm.querySelector('#type');
  var resetBtn = adForm.querySelector('.ad-form__reset');

  /**
   * Переключает поле в активное/неактивное состояние
   * @param {Arry} elems - Массив, содержащий интерактивные поля (input, select, fieldset)
   * @param {Boolean} isActive - Необходимое состояние (активное/неактивное)
   */
  var toggleEnableFormElems = function (elems, isActive) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = isActive;
    }
  };

  /**
   * Добавляет адрес пина в поле "адрес" и делает это поля только для чтения
   * @param {Boolean} isActive - Необходимое состояние (активное/неактивное)
   */
  var setAddressInInput = function (isActive) {
    addressInput.value = window.pins.getAddress(isActive);
  };

  /**
   * Переключает форму в активное/неактивное состояние
   * @param {Boolen} mapIsActive - Активное/неактивное состяние карты
   */
  var toggleEnableForms = function (mapIsActive) {
    if (mapIsActive) {
      adForm.classList.remove('ad-form--disabled');
    }

    [adFormFieldsets, mapFiltersFieldsets, mapFiltersSelects].forEach(function (item) {
      toggleEnableFormElems(item, !mapIsActive);
    });
  };

  /**
   * Проводит валидацию поля выбора количества гостей с учетом выбранной комнаты
   */
  var validateForm = function () {
    capacitySelect.querySelectorAll('option').forEach(function (item) {
      item.disabled = roomNumberSelect.value < item.value || item.value === NOT_FOR_GUESTS;
      if (roomNumberSelect.value === A_LOT_OF_ROOMS) {
        item.disabled = item.value > NOT_FOR_GUESTS;
      }

      if (!item.disabled) {
        item.selected = true;
      }

      if (item.selected > roomNumberSelect.value) {
        capacitySelect.setCustomValidity('Выберете доступный вариант');
      }
    });

    /**
     * @param {String} type - Тип гостиницы
     * @return {Number} - Минимальная сумма за номер
     */
    var setMinPriceForCurrentType = function (type) {
      var minPriceForCurrentType = {
        FLAT: 1000,
        BUNGALO: 0,
        HOUSE: 5000,
        PALACE: 10000,
      };

      return minPriceForCurrentType[type];
    };

    /**
     * Синхронизирует время заезда и выезда
     */
    var syncTime = function () {
      timeIn.addEventListener('change', function () {
        timeOut.value = timeIn.value;
      });

      timeOut.addEventListener('change', function () {
        timeIn.value = timeOut.value;
      });
    };

    /**
     * Выставляет минимальную сумму за ночь, в соответствии с типом выбранного номера
     */
    var validatePriceInput = function () {
      var currentType = houseType.options[houseType.selectedIndex].value.toUpperCase();
      var minPriceForCurrentType = setMinPriceForCurrentType(currentType);

      priceInput.setAttribute('min', minPriceForCurrentType);
      priceInput.placeholder = minPriceForCurrentType;

      houseType.addEventListener('change', validatePriceInput);
    };

    validatePriceInput();
    syncTime();

    roomNumberSelect.addEventListener('change', validateForm);
  };

  /**
   * Переключает форму в активное/неактивное состояние
   * @param {Boolen} isActive -  Состояние карты (активно/неактивно)
   */
  var toggleForm = function (isActive) {
    toggleEnableForms(isActive);
    validateForm();
    setAddressInInput(isActive);

    resetBtn.addEventListener('click', window.map.makeInactive);
    resetBtn.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.map.makeInactive);
    }, {
      once: true
    });
    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(adForm), window.map.succesPostingHandler, window.map.errorHandler);
    });
  };

  toggleForm(false);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.map.succesPostingHandler, window.map.errorHandler);
  });

  window.form = {
    advertisement: adForm,
    toggle: toggleForm,
    setAddressInInput: setAddressInInput,
    resetBtn: resetBtn,
  };
})();
