(function ($) {
  "use strict";

  $.fn.scrollingTo = function (opts) {
    var defaults = {
      animationTime: 1000,
      easing: "",
      callbackBeforeTransition: function () {},
      callbackAfterTransition: function () {},
    };

    var config = $.extend({}, defaults, opts);

    $(this).click(function (e) {
      var eventVal = e;
      e.preventDefault();

      var $section = $(document).find($(this).data("section"));
      if ($section.length < 1) {
        return false;
      }

      if ($("html, body").is(":animated")) {
        $("html, body").stop(true, true);
      }

      var scrollPos = $section.offset().top;
      if ($(window).scrollTop() == scrollPos) {
        return false;
      }

      config.callbackBeforeTransition(eventVal, $section);
      $("html, body").animate(
        {
          scrollTop: scrollPos + "px",
        },
        config.animationTime,
        config.easing,
        function () {
          config.callbackAfterTransition(eventVal, $section);
        }
      );
    });
  };

  jQuery(document).ready(function () {
    "use strict";
    new WOW().init();

    (function () {
      jQuery(".smooth-scroll").scrollingTo();
    })();
  });

  $(document).ready(function () {
    "use strict";
    $(window).scroll(function () {
      if ($(window).scrollTop() > 50) {
        $(".navbar-brand a").css("color", "#fff");
        $(".top-bar").removeClass("animated-header");
      } else {
        $(".navbar-brand a").css("color", "inherit");
        $(".top-bar").addClass("animated-header");
      }
    });

    $(".clients-logo-slider").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });

  // fancybox
  $(".fancybox").fancybox({
    padding: 0,
    openEffect: "elastic",
    openSpeed: 450,
    closeEffect: "elastic",
    closeSpeed: 350,
    closeClick: true,
    helpers: {
      title: {
        type: "inside",
      },
      overlay: {
        css: {
          background: "rgba(0,0,0,0.8)",
        },
      },
    },
  });
});






  $('#productDetailModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var image = button.data('image'); // Extract info from data-* attributes
    var description = button.data('description'); // Extract info from data-* attributes
    var modal = $(this);
    modal.find('#productImage').attr('src', image);
    modal.find('#productDescription').text(description);
    // Update the WhatsApp link with a message
    var phoneNumber = "6282324466933";
    var message = `Halo kak, Boleh jelaskan jasa ${description} ${image}`;
    var whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    modal.find('#whatsappLink').attr('href', whatsappLink);
  });




        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah pengiriman formulir standar

            var form = event.target;
            var data = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    document.getElementById('responseMessage').innerText = 'Message sent successfully.';
                    form.reset(); // Mengosongkan formulir
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            document.getElementById('responseMessage').innerText = data['errors'].map(error => error['message']).join(', ');
                        } else {
                            document.getElementById('responseMessage').innerText = 'Failed to send message.';
                        }
                    });
                }
            }).catch(error => {
                document.getElementById('responseMessage').innerText = 'Failed to send message.';
            });
        });
