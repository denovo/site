// Item Name : Responsive Mega Menu Complete Set
// Item URI : http://codecanyon.net/item/mega-menu-complete-set/152825
// Author URI : http://codecanyon.net/user/Pixelworkshop/
// Version : 3.3



(function ($) {

    var settings = {
        menu_effect:'click_fade', // Drop down effect, choose between 'hover_fade', 'hover_slide', 'click_fade', 'click_slide', 'open_close_fade', 'open_close_slide'
        menu_click_outside:0, // Clicks outside the drop down close it (1 = true, 0 = false)
        menu_show_onload:0, // Drop down to show on page load (type the number of the drop down, 0 for none)
        menu_responsive:1, // 1 = Responsive, 0 = Not responsive
        hoverIntentConfig:{ // HoverIntent Configuration
            sensitivity:2, // number = sensitivity threshold (must be 1 or higher)
            interval:100, // number = milliseconds for onMouseOver polling interval
            over:megaMenuOver, // function = onMouseOver callback (REQUIRED)
            timeout:200, // number = milliseconds delay before onMouseOut
            out:megaMenuOut // function = onMouseOut callback (REQUIRED)
        }
    };

    var methods = {
        
        init:function (options) {

            settings = $.extend(1, settings, options);


            return this.each(function () {


                var megaMenu = $(this),
                    menuItem = $(megaMenu).children('li'),
                    menuItemLink = $(menuItem).children('.megamenu_drop'),
                    menuDropDown = $(menuItem).find('.dropdown_container, .dropdown_fullwidth'),
                    menuItemFlyOut = $(menuItem).find('.dropdown_parent'),
                    menuItemFlyOutLink = $(menuItemFlyOut).children('a'),
                    menuItemFlyOutDropDown = $(menuItemFlyOut).find('.dropdown_flyout_level'),
                    menuButton = $('.megamenu_button');

                menuItemElement = $(menuItem).add(menuItemFlyOut);
                menuDropDownElement = $(menuDropDown).add(menuItemFlyOutDropDown);

                $(menuItemLink).click(function(event) {
                    event.preventDefault();
                    window.location.hash = this.hash;
    
                });    

                if (("ontouchstart" in document.documentElement) && (settings.menu_responsive === 1)) {


                    if ($(window).width() < 960) {
                        $(menuDropDown).css({'top':'auto'}).hide();
                        $(menuItemFlyOutDropDown).css({'left':'0', 'top':'0'}).hide();
                        $(menuItem).hide(0);
                        $(menuButton).show(0);

                    } else {
                        megaMenuDropDownPosition();
                    }

                    $(menuButton).children('a').hammer().on('tap', function () {
                        $(menuButton).toggleClass('megamenu_button_active')
                        $(menuItem).not(":eq(0)").toggle(0);
                    });

                    $(menuItemElement).toggleClass('noactive');

                    // Event attached to the link instead of the LI element
                    // to prevent the drop down from being closed if a touch
                    // event occurs within its area.

                    $(menuItemLink).hammer().on('tap', function () {
                        var $this = $(this);
                        $this.parent(menuItem).toggleClass('active noactive')
                            .find(menuDropDown).toggle(0);
                        confirm('test');
                        console.log('test');
                        // No chaining here, the horizontal and vertical
                        // versions don't use the exact same structure.
                        $this.parent(menuItem).siblings().addClass('noactive').removeClass('active')
                            .find(menuDropDown).hide(0);
                        return false;
                    });

                    $(menuItemFlyOutLink).hammer().on('tap', function () {
                        var $this = $(this);
                        $this.parent(menuItemFlyOut)
                            .toggleClass('active noactive')
                            .find(menuItemFlyOutDropDown).first()
                            .toggle(0);
                        $this.parent(menuItemFlyOut).siblings().addClass('noactive').removeClass('active')
                            .find(menuItemFlyOutDropDown).hide(0);
                        $this.parent(menuItemFlyOut).siblings()
                            .find(menuItemFlyOut).addClass('noactive').removeClass('active');
                        return false;
                    });

                    $(document).hammer().on('tap', function () {
                        $(menuItemElement).addClass('noactive');
                        $(menuDropDownElement).hide(0);
                    });
                    $(megaMenu).hammer().on('tap', function (event) {
                        event.stopPropagation();
                    });
                    $(window).bind('orientationchange', function () {
                        $(menuItemElement).addClass('noactive');
                        $(menuDropDownElement).hide(0);
                    });

                    return;


                } else {


                    megaMenuDropDownPosition();

                    $(window).resize(function() {
                        megaMenuDropDownPosition();
                    });

                    $(menuButton).children('a').click(function () {
                        $(menuButton).toggleClass('megamenu_button_active');
                        $(menuItem).not(":eq(0)").toggle(0);

                    });

                    if (settings.menu_click_outside === 1) {

                        $(document).click(function () {
                            $(menuItemElement).removeClass('active');
                            $(menuDropDownElement).hide(0);
                        });
                        $(megaMenu).click(function (event) {
                            event.stopPropagation();
                        });
                    }

                    switch (settings.menu_effect) {

                        case 'open_close_fade':
                        var menuEffectShow = 'fadeToggle',
                            menuEffectHide = 'fadeOut';
                            break;
                        case 'open_close_slide':
                        var menuEffectShow = 'slideDown',
                            menuEffectHide = 'fadeOut';
                            break;
                        case 'open_close_toggle':
                        var menuEffectShow = 'toggle',
                            menuEffectHide = 'fadeOut';
                            break;

                    }
                    
                    switch (settings.menu_effect) {

                        case 'hover_fade':
                        case 'hover_slide':
                        case 'hover_toggle':
                        case 'click_fade':
                        case 'click_slide':
                        case 'click_toggle':
                            $(menuItem).hoverIntent(settings.hoverIntentConfig);
                            $(menuItemFlyOut).hoverIntent(settings.hoverIntentConfig);
                            break;

                        case 'open_close_fade':
                        case 'open_close_slide':
                        case 'open_close_toggle':

                            // $('.megamenu > li:nth-child(' + settings.menu_show_onload + ')')
                            //     .find(menuDropDown).show()
                            //     .closest(menuItem).toggleClass('active');
                                

                            $(menuItem).unbind('mouseenter mouseleave').bind('click', function(event) {

                                var $this = $(this);
                                var dd = $this.find(menuDropDown);
                                var _clickedNode = event.target.nodeName;
  
                                // only handle the closing and hiding of dropdown menu if clicking a link
                                if (_clickedNode == 'A') {
                                    
                                    // check if another list item is already open
                                    if ($this.siblings().hasClass('active')) {
                                       
                                        // confirm("another menu item is already open");
                                        $this.siblings().removeClass('active');
                                        $this.siblings().find(menuDropDown).hide();
                                        $this.toggleClass('active');
                                        dd.show();
                                    }
                                    else {
                                        $this.siblings().removeClass('active');
                                        $this.toggleClass('active');
                                        
                                        if ($this.hasClass('active') ){
                                            dd.slideDown();
                                            $this.find('.js-mob-exp-icon').html('&#59235;');
                                        }
                                        else {
                                            $this.find('.js-mob-exp-icon').html('&#59232;');
                                            dd.slideUp();
                                        }
                                      
                                    }
                                }

                               

                                // $this.siblings().removeClass('active')
                                //     .find(menuDropDown)[menuEffectHide](settings);
                                // $this.toggleClass('active')
                                //     confirm("test")
                                //     .click(function (event) {
                                //         event.stopPropagation();
                                //     });
                            });

                            // $(menuItemFlyOut).unbind('mouseenter mouseleave').click(function () {

                            //     var $this = $(this);
                            //     $this.siblings().removeClass('active')
                            //         .find(menuItemFlyOutDropDown)[menuEffectHide](settings.menu_speed_hide);
                            //     $this.siblings().find('li').removeClass('active');
                            //     $this.toggleClass('active')
                            //         .find(menuItemFlyOutDropDown).first()
                            //         .delay(settings.menu_speed_delay)[menuEffectShow](settings.menu_speed_show)
                            //         .click(function (event) {
                            //             event.stopPropagation();
                            //         });

                            // });

                            break;


                    }
                

                }


            }); // End each

        },

        update:function (options) {
            settings = $.extend(1, settings, options);
        }
    };


    $.fn.megaMenuCompleteSet = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('No found method ' + method);
        }

    };


    function megaMenuOver() {

        var $this = $(this),
            dropDownMega = $('.dropdown_container, .dropdown_fullwidth', $this),
            dropDownFlyOutLevel = $this.children('.dropdown_flyout_level');

        dropDownMega = $(dropDownMega).add(dropDownFlyOutLevel);
        
        switch (settings.menu_effect) {
            case 'hover_fade':
                $(dropDownMega).fadeIn(settings.menu_speed_show);
                console.log('test');
                break;
            case 'hover_slide':
                $(dropDownMega).slideDown(settings.menu_speed_show);
                break;
            case 'hover_toggle':
                $(dropDownMega).show(settings.menu_speed_show);
                break;
            case 'click_fade':
                $this.click(function () {
                    $(dropDownMega).fadeIn(settings.menu_speed_show);
                });
                break;
            case 'click_slide':
                $this.click(function () {
                 $(dropDownMega).slideDown(settings.menu_speed_show);
                });
                break;
            case 'click_toggle':
                $this.click(function () {
                    $(dropDownMega).show(settings.menu_speed_show);
                });
                break;

        }

    }


    function megaMenuOut() {
    
        var $this = $(this),
            dropDownMega = $('.dropdown_container, .dropdown_fullwidth, .dropdown_flyout_level', $this);

        switch (settings.menu_effect) {
            case 'hover_fade':
            case 'click_fade':
                $(dropDownMega).fadeOut(settings.menu_speed_hide);
                break;
            case 'hover_slide':
            case 'click_slide':
                $(dropDownMega).slideUp(settings.menu_speed_hide);
                break;
            case 'hover_toggle':
            case 'click_toggle':
                $(dropDownMega).toggle(settings.menu_speed_hide);
                break;

        }

    }


    function megaMenuDropDownPosition() {

        // This part uses CSS so the drop downs remain opened when using the effects
        // 'open_close_fade', 'open_close_slide' and 'open_close_fade'.
        // Without those top and left values, the drop downs would be hidden
        // when not hovered.

        if (($(window).width() < 960) && (settings.menu_responsive === 1)) {
            $('.dropdown_container, .dropdown_fullwidth').css({'left':'-1px', 'top':'auto'}).hide();
            $('.dropdown_first').css({'left':'0'}).hide();
            $('.dropdown_flyout_level, .dropdown_flyout_level_left').css({'left':'0', 'top':'0'}).hide();
            $('.megamenu').children('li').hide(0);
            $('.megamenu_button').show(0);
        }

        else {
            $('.dropdown_container').css({'left':'auto', 'top':'auto'}).hide();
            $('.dropdown_fullwidth').css({'left':'-1px', 'top':'auto'}).hide();
            

            // //------ MEASURE THE SCROLLBAR WIDTH
            // // Create the measurement node
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "scrollbar-measure";
            document.body.appendChild(scrollDiv);

            // Get the scrollbar width
            var scrollbarWidth = (scrollDiv.offsetWidth - scrollDiv.clientWidth) - 3;

            // // Delete the DIV 
            document.body.removeChild(scrollDiv);
            // //----------------------------------

            var _winW = $(window).width();

            if (_winW > 1280) {
                // calculate width at the edge of the content
                var _spaceAroundContent = (_winW - 1280);
                var _marginCalc = ( (_spaceAroundContent / 2) - scrollbarWidth + 12);
                var _lMargin =  ("-" + _marginCalc + "px");
                console.log("window width: " + _winW);
                console.log("scrollbar width: " + scrollbarWidth);
                console.log("from left edge to content: " + _marginCalc);

                $('.dropdown_fullwidth').css({
                    'position':'absolute',
                    'left':'0',
                    'right':'0',
                    'width' : _winW,
                    'top':'47px',
                    'margin-left': _lMargin
                });

            }
            else {
                var _contentW = _winW;
                console.log("the content width is: " + _contentW);
                var _calcM = ( ((_contentW / 100) * 3.75) - scrollbarWidth + 12); // calculate left margin size
                console.log("the calculated left margin is: " + _calcM) ;
                var _leftMargin = ("-" + _calcM + "px");
                
                $('.dropdown_fullwidth').css({
                    'position':'absolute',
                    'left':'0',
                    'right':'0',
                    'width' : _winW,
                    'top':'47px',
                    'margin-left': _leftMargin
                });
            }  

            $('.dropdown_flyout_level').css({'left':'95%', 'top':'-21px'}).hide();
            $('.dropdown_flyout_level_left').css({'left':'-108%', 'right':'100%'}).hide();
            $('.megamenu').children('li').show(0);
            $('.megamenu_button').hide(0);
        }

        $('.megamenu_container_vertical').find('.dropdown_container, .dropdown_fullwidth').css({'top':'0'});

    }


})(jQuery);