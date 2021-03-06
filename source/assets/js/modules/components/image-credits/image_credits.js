/*
    -------------------------------------------------------------
      imageCredits()

      Show image credits button
      fixed to the right of the screen (on desktop only)
    -------------------------------------------------------------
*/

function imageCredits() {

  if ($('.credits').length > 0) {

      //only show credits on desktop
      if ($('body').hasClass('gDesktop')) {
        $('.credits-btn').addClass("show");

        $('.show-credits').click(function(event) {
          event.preventDefault();

          var c = $(this);
          if (c.hasClass('active') ) {
            c.removeClass('active').attr('title','Show image credits');
            $('.credits').fadeOut();
          } else {
            c.addClass('active').attr('title','Hide image credits');
            $('.credits').fadeIn();
          }
        });
      }
  }

}
