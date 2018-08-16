'use strict';

var menuDropdown = document.querySelector('.main-menu__dropdown');
var linksFocused = menuDropdown.querySelectorAll('.main-menu__dropdown-item a');

for (var i = 0; i < linksFocused.length; i++) {
  linksFocused[i].onfocus = function () {
    menuDropdown.setAttribute('style', 'visibility: visible; opacity: 1');
  }

  linksFocused[i].onblur = function () {
    menuDropdown.setAttribute('style', '');
  }
}
