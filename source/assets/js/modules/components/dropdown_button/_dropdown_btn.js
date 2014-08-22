// Generated by CoffeeScript 1.7.1
(function() {
  this.ualDropdownBtn = function() {
    if ($(".dd-menu").length > 0) {
      $(".js-dd-menu").click(function(event) {
        var _d, _d_menu;
        event.preventDefault();
        _d = $(this);
        _d_menu = _d.parent();
        if (_d_menu.hasClass("active")) {
          _d_menu.find(".js-dd-menu-icon");
          _d_menu.find(".js-dd-menu-list").slideUp("fast", function() {
            _d_menu.removeClass("active");
          });
        } else {
          _d_menu.find(".js-dd-menu-icon");
          _d_menu.find(".js-dd-menu-list").slideDown("fast", function() {
            _d_menu.addClass("active");
          });
        }
      });
    }
  };

}).call(this);