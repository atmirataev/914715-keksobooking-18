'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('.select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberSelect = adForm.querySelector('#room_number');

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
  };

  roomNumberSelect.addEventListener('change', validateForm);

  window.form = {
    adForm: adForm,
    toggleEnableForms: toggleEnableForms,
    validateForm: validateForm,
  };

})();
