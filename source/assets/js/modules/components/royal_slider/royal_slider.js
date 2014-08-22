// Generated by CoffeeScript 1.7.1
(function() {
  var initSlider;

  initSlider = function() {
    $.getScript("http://static.arts.ac.uk/assets/js/jquery.royalslider.min.js", function() {
      $.each($(".royalSlider"), function() {
        var _itemAutoPlay, _itemHeight, _itemWidth, _slider, _this;
        _this = $(this);
        _itemWidth = (_this.data("slider-item-width") > 0 ? _this.data("slider-item-width") : 930);
        _itemHeight = (_this.data("slider-item-height") > 0 ? _this.data("slider-item-height") : 465);
        _itemAutoPlay = (_this.data("slider-auto-play") === true ? _this.data("slider-auto-play") : false);
        _this.royalSlider({
          arrowsNav: true,
          fadeinLoadedSlide: false,
          arrowsNavAutoHide: false,
          controlNavigation: "none",
          loop: true,
          autoScaleSlider: true,
          autoScaleSliderWidth: _itemWidth,
          autoScaleSliderHeight: _itemHeight,
          imageScalePadding: 0,
          globalCaption: true,
          keyboardNavEnabled: true,
          autoPlay: {
            enabled: _itemAutoPlay,
            pauseOnHover: true,
            delay: 3000
          }
        }).data("royalSlider");
        _slider = _this.data('royalSlider');
        _slider.ev.on("rsBeforeAnimStart", function(event) {});
        return $("div.rsArrowIcn").attr("tabindex", "0");
      });
      return true;
    });
    return $(document).keyup(function(e) {
      var focusedElem, isArrowIcn, _p, _rSlider;
      focusedElem = $(document.activeElement);
      if (e.keyCode === 13) {
        isArrowIcn = focusedElem.hasClass("rsArrowIcn");
        _p = focusedElem.parent();
        _rSlider = _p.closest(".royalSlider").data("royalSlider");
        if (isArrowIcn && _p.hasClass("rsArrowRight")) {
          _rSlider.next();
        } else {
          _rSlider.prev();
        }
      }
      return true;
    });
  };

  $(document).ready(function() {
    if ($(".royalSlider").length > 0) {
      return initSlider();
    }
  });

}).call(this);
