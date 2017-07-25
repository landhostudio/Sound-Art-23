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

  function initLog() {
    console.log('Sound Art 23');
  };

  function initAOS() {
    AOS.init();
  };

  init();

})(jQuery);
