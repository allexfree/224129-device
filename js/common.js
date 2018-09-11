'use strict';

var ESC_KEYCODE = 27;
var target;

var map;
var placeMarker;
var htmlBlock;

var isStorageSupport = true;
var storage;
var empty = '';

var menuDropdown = document.querySelector('.main-menu__dropdown');
var linksFocused = menuDropdown.querySelectorAll('.main-menu__dropdown-item a');

var mapLink = document.querySelector('.contacts__map');
var contactLink = document.querySelector('.contacts__link');
var mapModalOverlay = document.querySelector('.map-popup-overlay');
var formModalOverlay = document.querySelector('.form-popup-overlay');
var contactForm = formModalOverlay.querySelector('.popup-form');
var inputUserName = formModalOverlay.querySelector('#name-user');
var inputUserMail = formModalOverlay.querySelector('#mail-user');
var formUserText = formModalOverlay.querySelector('#text-user');
var formSubmitBtn = formModalOverlay.querySelector('.popup-form__btn');
var btnCloseMap = mapModalOverlay.querySelector('.close-btn');
var btnCloseForm = formModalOverlay.querySelector('.close-btn');

for (var i = 0; i < linksFocused.length; i++) {
  linksFocused[i].onfocus = function () {
    menuDropdown.setAttribute('style', 'visibility: visible; opacity: 1');
  }

  linksFocused[i].onblur = function () {
    menuDropdown.setAttribute('style', '');
  }
}

try {
  storage = localStorage.getItem('userMail');
} catch (err) {
  isStorageSupport = false;
}

var isInputFocused = function () {

  isStorageTrue();

  inputUserName.onfocus = function () {
    inputUserName.setAttribute('style', '');
  }

  inputUserMail.onfocus = function () {
    inputUserMail.setAttribute('style', '');
  }
};

var isStorageTrue = function () {
  if (isStorageSupport) {
    localStorage.setItem('userMail', inputUserMail.value);
  }
};

var mapLinkClickHandler = function (evt) {
  evt.preventDefault();
  mapModalOverlay.classList.remove('hidden');
};

var contactLinkClickHandler = function (evt) {
  evt.preventDefault();
  formModalOverlay.classList.remove('hidden');
  if (storage) {
    inputUserMail.value = storage;
    inputUserName.focus();
  } else {
    inputUserMail.focus();
  }
};

var btnCloseClickHandler = function () {
  mapModalOverlay.classList.add('hidden');
  mapModalOverlay.removeAttribute('style');
  formModalOverlay.classList.add('hidden');
  formModalOverlay.removeAttribute('style');
  inputUserName.removeAttribute('style');
  inputUserName.value = '';
  inputUserMail.removeAttribute('style');
  inputUserMail.value = '';
  contactForm.classList.remove('popup-error');
};

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== inputUserName && evt.target !== inputUserMail && evt.target !== formUserText) {
    mapModalOverlay.classList.add('hidden');
    formModalOverlay.classList.add('hidden');
    inputUserName.removeAttribute('style');
    inputUserName.value = '';
    inputUserMail.removeAttribute('style');
    inputUserMail.value = '';
    contactForm.classList.remove('popup-error');
  }
};

var btnSubmitClickHandler = function (evt) {

  isInputFocused();

  if (inputUserName.value === empty || inputUserMail.value === empty) {
     evt.preventDefault();
     contactForm.classList.remove('popup-error');
     void contactForm.offsetWidth;
     contactForm.classList.add('popup-error');

     if (inputUserName.value === empty) {
      inputUserName.setAttribute('style', 'background-color: #f6dada; outline: none');
      return;
     }

     if (inputUserMail.value === empty) {
      inputUserMail.setAttribute('style', 'background-color: #f6dada; outline: none');
      return;
     }
  }
};

mapLink.addEventListener('click', mapLinkClickHandler);
contactLink.addEventListener('click', contactLinkClickHandler);
contactForm.addEventListener('submit', btnSubmitClickHandler);
btnCloseMap.addEventListener('click', btnCloseClickHandler);
btnCloseForm.addEventListener('click', btnCloseClickHandler);
document.addEventListener('keydown', escPressHandler);

ymaps.ready(init);

function init() {
  map = new ymaps.Map('ya-map', {
    center: [55.68697956906804, 37.52965449999998],
    zoom: 17,
    controls: []
  });

  map.behaviors.disable('scrollZoom');

  map.controls.add('zoomControl', {
    position: { top: 185, right: 35 }
  });

  placeMarker = new ymaps.Placemark([55.68697956906804, 37.52965449999998],
    {
      baloonContent: htmlBlock
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pointer.svg',
      iconImageSize: [100, 100],
      iconImageOffset: [-45, -90]
    });

  map.geoObjects.add(placeMarker);
}
