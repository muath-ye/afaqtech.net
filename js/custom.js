(function($) {

    var $window = $(window),
        $doc = $(document),
        $tarikzhero = $('#tarikzhero'),
        $tarikzteam = $('#tarikzteam'),
        $tarikztestimonial = $('#tarikztestimonial'),
        $tarikzclients = $('#tarikzclients'),
        $container = $('#portfolio-container');

    "use strict";
    $window.on("load", function() {

        $(".preloader").fadeOut("slow", function() {
            $(".preloader-top").addClass("slide-top");
        });

        $tarikzhero.owlCarousel({
            nav: true,
            navText: [
                "PREV",
                "NEXT"
            ],
            items: 1,
            navSpeed: 400,
            video: true,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
        });

        $tarikzteam.each(function(index) {
            var items_no = $(this).data('slides');
            $(this).owlCarousel({
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left"></i>',
                    '<i class="fa fa-angle-right"></i>'
                ],
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                responsive: {
                    1024: {
                        items: items_no
                    },
                    600: {
                        items: 2
                    }
                }
            });
        });

        $tarikztestimonial.each(function(index) {
            var items_no = $(this).data('slides');
            $(this).owlCarousel({
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left"></i>',
                    '<i class="fa fa-angle-right"></i>'
                ],
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                navSpeed: 400,
                responsive: {
                    1024: {
                        items: items_no
                    },
                    600: {
                        items: 1
                    }
                }
            });
        });

        $tarikzclients.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            responsive: {
                1024: {
                    items: 5
                },
                600: {
                    items: 3
                }
            }
        });

        // Portfolio Masonry 
        $container.isotope({
            masonry: {
                columnWidth: '.portfolio-item'
            },
            itemSelector: '.portfolio-item'
        });
        $('#filters').on('click', 'li', function() {
            $('#filters li').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
        });



    });

    //Initiat WOW JS
    new WOW().init();

    //Topnav transition
    $window.scroll(function(event) {
        if ($doc.scrollTop() >= $('.background-area').height() / 6) {
            $('#home').addClass('scrolled');
        } else {
            $('#home').removeClass('scrolled');
        }
    }).trigger('scroll');

    // Mobile Menu
    $(".menu-open").on("click", function() {
        $(".menu-open").fadeToggle(200);
        $(".menu-close").fadeToggle(200);
        $(".main-menu").fadeToggle(500);
    });

    $(".menu-close").on("click", function() {
        $(".menu-open").fadeToggle(200);
        $(".menu-close").fadeToggle(200);
        $(".main-menu").fadeToggle(500);
    });

    //Navigation Scrolling
    $('.one-page a').on('click', function() {
        $(".menu-open").fadeToggle(200);
        $(".menu-close").fadeToggle(200);
        $(".main-menu").fadeToggle(500);
        
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 700);
                return false;
            }
        }
    });


    // Intialize Map
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            scrollwheel: false,


            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                featureType: 'all',
                stylers: [{
                    saturation: -65
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{
                    hue: '#00ffee'
                }, {
                    saturation: 80
                }]
            }, {
                featureType: 'poi.business',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        var image = 'images/map-marker.png';
        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            icon: image,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', toggleBounce);

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    }


})(jQuery);