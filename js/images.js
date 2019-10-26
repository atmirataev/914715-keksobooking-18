'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var roomPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var roomPhotoBlock = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  roomPhotoChooser.addEventListener('change', function () {
    var file = roomPhotoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var roomImg = document.createElement('img');
        roomPhotoBlock.append(roomImg);
        roomImg.src = reader.result;
        roomImg.width = '70';
        roomImg.height = '70';
        roomImg.alt = 'Фотография жилья';
      });

      reader.readAsDataURL(file);
    }
  });

  /**
   * Сбрасывает значения полей загрузки картинок
   */
  var resetImg = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    roomPhotoBlock.innerHTML = '';
  };

  window.images.reset = resetImg;
})();
