//=include ../../bower_components/jquery/dist/jquery.js
//=include ../../bower_components/swiper/dist/js/swiper.jquery.js
//=include ../../bower_components/aos/dist/aos.js
//=include ../../bower_components/fastclick/lib/fastclick.js

(function($) {

  'use strict';

  var init = function() {
    initNavigation();
    initLanguage();
    if ( $('.swiper-container').length ) {
      initSwiper();
    };
    if ( $('.hero-map').length ) {
      initMap();
    };
    initAOS();
    initLog();
  };

  function initNavigation() {
    $('.toggle-button').click(function() {
      $('.header').toggleClass('header--active');
    });
  };

  function initLanguage() {
    $('.dropdown-button').click(function() {
      $(this).closest('.dropdown').toggleClass('dropdown--active');
    });
  };

  function initSwiper() {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      slidesPerView: 2,
      spaceBetween: 32,
      paginationClickable: true,
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 24
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 16
        }
      }
    });
  };

  function initMap() {

    function new_map($el) {

      var $markers = $el.find('.hero-map-location');

      var color1 = '#393939',
          color2 = '#7cc3af',
          color3 = '#fbfbfb',
          color4 = '#fbfbfb',
          color5 = '#e4f9f3';

    	var args = {
        scrollwheel       : false,
        navigationControl : true,
        mapTypeControl    : true,
        scaleControl      : true,
        draggable         : true,
        zoom              : 16,
        zoomControl       : true,
        mapTypeControl    : false,
        scaleControl      : true,
        streetViewControl : false,
        rotateControl     : false,
        fullscreenControl : false,
    		center		        : new google.maps.LatLng(0, 0),
    		mapTypeId	        : google.maps.MapTypeId.ROADMAP
    	};

      // create map
      var map = new google.maps.Map($el[0], args);

      // add a markers reference
      map.markers = [];

      // add markers
      $markers.each(function() {
        add_marker($(this), map);
	    });

      // center map
      center_map(map);

      return map;
    }

    function add_marker($marker, map) {

      var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

    	// create marker
    	var marker = new google.maps.Marker({
    		position : latlng,
    		map      : map
    	});

    	// add to array
    	map.markers.push(marker);

    	// if marker contains HTML, add it to an infoWindow
    	if ($marker.html()) {

    		// create info window
    		var infowindow = new google.maps.InfoWindow({
          content: $marker.html()
    		});

    		// show info window when marker is clicked
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
    		});
    	}
    }

    function center_map(map) {

    	var bounds = new google.maps.LatLngBounds();

    	// loop through all markers and create bounds
    	$.each(map.markers, function(i, marker) {
    		
        var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    		bounds.extend(latlng);

    	});

    	// only 1 marker?
    	if (map.markers.length == 1) {
    	
      	// set center of map
  	    map.setCenter(bounds.getCenter());
  	    map.setZoom(4);

      } else {

    		// fit to bounds
    		// map.fitBounds(bounds);

        map.fitBounds(bounds);

    	}

    }

    var map = null;

    $(document).ready(function() {

      $('.hero-map-canvas').each(function() {
        
        // create map
        map = new_map($(this));

      });

      // resize the map when the viewport is changed
      google.maps.event.addDomListener(window, 'resize', function() {
        
        var center = map.getCenter();
        
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);

      });
      
    });

  };

  function initAOS() {
    AOS.init();
  };

  function initLog() {
    console.log('Sound Art 23');
  };

  init();

})(jQuery);
