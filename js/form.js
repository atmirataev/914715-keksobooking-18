'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('.select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var houseType = adForm.querySelector('#type');

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

  // Переключает форму в активное/неактивное состояние
  var toggleEnableForms = function (mapIsActive) {
    [adFormFieldsets, mapFiltersFieldsets, mapFiltersSelects].forEach(function (item) {
      toggleEnableFormElems(item, !mapIsActive);
    });
  };

  toggleEnableForms();

  /**
   * Проводит валидацию поля выбора количества гостей с учетом выбранной комнаты
   */
  var validateForm = function () {
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

    var setMinPriceForCurrentType = function (type) {
      var minPriceForCurrentType = {
        FLAT: 1000,
        BUNGALO: 0,
        HOUSE: 5000,
        PALACE: 10000,
      };

      return minPriceForCurrentType[type];
    };

    (function () {
      var timeIn = adForm.querySelector('#timein');
      var timeOut = adForm.querySelector('#timeout');

      timeIn.addEventListener('blur', function () {
        var timeInValue = timeIn.options[timeIn.selectedIndex].value;
        timeOut.querySelectorAll('option').forEach(function (item) {
          item.disabled = true;
          if (timeInValue === item.value) {
            item.selected = true;
            item.disabled = false;
          }
        });
      });
    })();

    var validatePriceInput = function () {
      var priceInput = adForm.querySelector('#price');
      var currentType = houseType.options[houseType.selectedIndex].value.toUpperCase();
      var minPriceForCurrentType = setMinPriceForCurrentType(currentType);

      priceInput.setAttribute('min', minPriceForCurrentType);
      priceInput.placeholder = minPriceForCurrentType;
    };

    validatePriceInput();

    houseType.addEventListener('blur', validatePriceInput);
  };

  roomNumberSelect.addEventListener('change', validateForm);

  window.form = {
    adForm: adForm,
    toggleEnableForms: toggleEnableForms,
    validateForm: validateForm,
  };
})();
