'use strict';

var map;
var placeMarker;
var htmlBlock;

ymaps.ready(init);

function init() {
  map = new ymaps.Map("ya-map", {
    center: [55.68697956906804, 37.52965449999998],
    zoom: 17,
    controls: []
  });

  map.behaviors.disable('scrollZoom');

  map.controls.add("zoomControl", {
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

