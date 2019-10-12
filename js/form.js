'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  /**
   * Переключает поле в активное/неактивное состояние
   * @param {Arry} elems - Массив, содержащий интерактивные поля (input, select, fieldset)
   * @param {Boolean} mapIsActive - Необходимый вид карты (активный/неактивный)
   */
  var toggleEnableFormElems = function (elems, mapIsActive) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = mapIsActive;
    }
  };

  /**
   * Добавляет адрес пина в поле "адрес" и делает это поля только для чтения
   * @param {Boolean} mapIsActive - Активна карта или нет
   */
  var setAddressInInput = function (mapIsActive) {
    var addressInput = adForm.querySelector('input[name="address"]');
    addressInput.value = window.pins.getAdrress(mapIsActive);
  };

  // Переключает форму в активное/неактивное состояние
  var toggleEnableForms = function (mapIsActive) {
    var mapFilters = document.querySelector('.map__filters');
    var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
    var mapFiltersSelects = mapFilters.querySelectorAll('.select');
    var adFormFieldsets = adForm.querySelectorAll('fieldset');

    if (mapIsActive) {
      adForm.classList.remove('ad-form--disabled');
    }

    [adFormFieldsets, mapFiltersFieldsets, mapFiltersSelects].forEach(function (item) {
      toggleEnableFormElems(item, !mapIsActive);
    });

  };

  toggleEnableForms();

  /**
   * Проводит валидацию поля выбора количества гостей с учетом выбранной комнаты
   */
  var validateForm = function () {
    var capacitySelect = adForm.querySelector('#capacity');
    var roomNumberSelect = adForm.querySelector('#room_number');

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
      var timeIn = adForm.querySelector('#timein');
      var timeOut = adForm.querySelector('#timeout');

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
      var priceInput = adForm.querySelector('#price');
      var houseType = adForm.querySelector('#type');
      var currentType = houseType.options[houseType.selectedIndex].value.toUpperCase();
      var minPriceForCurrentType = setMinPriceForCurrentType(currentType);

      priceInput.setAttribute('min', minPriceForCurrentType);
      priceInput.placeholder = minPriceForCurrentType;

      houseType.addEventListener('blur', validatePriceInput);
    };

    validatePriceInput();
    syncTime();

    roomNumberSelect.addEventListener('change', validateForm);
  };

  validateForm();
  setAddressInInput(false);

  window.form = {
    adForm: adForm,
    toggleEnableForms: toggleEnableForms,
    validateForm: validateForm,
    setAddressInInput: setAddressInInput,
  };
})();
