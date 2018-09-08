'use strict';

var ESC_KEYCODE = 27;
var target;

var map;
var placeMarker;
var htmlBlock;

var isStorageSupport = true;
var storage;

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
  inputUserMail.removeAttribute('style');
  contactForm.classList.remove('popup-error');
};

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== inputUserName && evt.target !== inputUserMail && evt.target !== formUserText) {
    mapModalOverlay.classList.add('hidden');
    formModalOverlay.classList.add('hidden');
    inputUserMail.removeAttribute('style');
    contactForm.classList.remove('popup-error');
  }
};

var btnSubmitClickHandler = function (evt) {
  target = evt.target;
  if (target === formSubmitBtn && inputUserMail.value === '') {
    inputUserMail.setAttribute('style', 'background-color: #f6dada; outline: none');
    contactForm.classList.remove('popup-error');
    contactForm.offsetWidth = contactForm.offsetWidth;
    contactForm.classList.add('popup-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('userMail', inputUserMail.value);
    }
  }
};

mapLink.addEventListener('click', mapLinkClickHandler);
contactLink.addEventListener('click', contactLinkClickHandler);
formModalOverlay.addEventListener('click', btnSubmitClickHandler);
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
      iconImageHref: '../img/map-pointer.svg',
      iconImageSize: [100, 100],
      iconImageOffset: [-45, -90]
    });

  map.geoObjects.add(placeMarker);
}
