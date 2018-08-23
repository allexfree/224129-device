'use strict';

var ESC_KEYCODE = 27;

var menuDropdown = document.querySelector('.main-menu__dropdown');
var linksFocused = menuDropdown.querySelectorAll('.main-menu__dropdown-item a');

var mapLink = document.querySelector('.contacts__map');
var contactLink = document.querySelector('.contacts__link');
var mapModalOverlay = document.querySelector('.map-popup-overlay');
var formModalOverlay = document.querySelector('.form-popup-overlay');
var inputUserName = formModalOverlay.querySelector('#name-user');
var inputUserMail = formModalOverlay.querySelector('#mail-user');
var formUserText = formModalOverlay.querySelector('#text-user');
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

var mapLinkClickHandler = function (evt) {
  evt.preventDefault();
  mapModalOverlay.classList.remove('hidden');
}

var contactLinkClickHandler = function (evt) {
  evt.preventDefault();
  formModalOverlay.classList.remove('hidden');
}

var btnCloseClickHandler = function () {
  mapModalOverlay.classList.add('hidden');
  formModalOverlay.classList.add('hidden');
}

var escPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== inputUserName && evt.target !== inputUserMail && evt.target !== formUserText) {
    mapModalOverlay.classList.add('hidden');
    formModalOverlay.classList.add('hidden');
  }
}

mapLink.addEventListener('click', mapLinkClickHandler);
contactLink.addEventListener('click', contactLinkClickHandler);
btnCloseMap.addEventListener('click', btnCloseClickHandler);
btnCloseForm.addEventListener('click', btnCloseClickHandler);
document.addEventListener('keydown', escPressHandler);
