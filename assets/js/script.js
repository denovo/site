
//  Make loging safe for all browsers
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};


// This script is an IIFE (Immediately Invoked Function Expression) that passes 
// jQuery in to avoid conflict with other libraries.

// IMPORTANT - READ THIS FIRST
// This script is run as soon as it is loaded, so should only be included at the base of the required page.


(function($) 
{ 
  /***********************************************/
  //  CONSTANTS
  //  Use upper case variable names to declare
  //  constants such as configuration paths, scoped to this
  //  closure and available to all methods.
  //  Separate words with underscores.
  /***********************************************/
  
  var CONSTANT_NAME = 'A constant, available to all methods of this closure.';
  

  /***********************************************/
  //  VARS
  //  Use lower case variable names to declare
  //  variables that are scoped to this
  //  closure and available to all methods.
  //  Use camel case to separate words.
  /***********************************************/
  
  var instanceVariable = 'An instance variable, available to all methods of this closure.'; 
  
  
  /***********************************************/
  //  INIT
  //  This function will be called upon load, so call
  //  any initialastion functions here. 
  /***********************************************/
  
  this.init = function()
  { 
    getData();
  }();


  /***********************************************/
  //  EXAMPLE METHODS
  /***********************************************/ 
  
  // get some data
  function getData()
  {
    // define a local variable
    var localVariable = 'A local variable, scoped to this method.';
    console.log(localVariable);

    // access some instance variables
    console.log(CONSTANT_NAME);
    console.log(instanceVariable);

    // call a method - maybe an ajax call?
    onData('onData: I was called from on getData.');
  }
  
  // on data return
  function onData(data)
  {     
    // log out some data
    //console.log(data);
    
    // get the body with jQuery, do something with it.
    $('body').each(function (){
      log(this);
    })
  }
  
    
})(jQuery);


  function checkWindowSize() {
    var width = $(window).width(),
    new_class = width > 850 ? 'gDesktop' :
                width > 600 ? 'gTablet' :
                width < 600 ? 'gmobile' :
                width > 1289 ? 'gDesktop' : '';

    $(document.body).removeClass('gDesktop gTablet gmobile').addClass(new_class);
}

// function menuToggle() {
// $('.menu-toggle').toggle(function() {
//  $('.main-menu').slideDown(1000, 'swing', function() {
//     // Animation complete.
//   });

// }, function() {

//   $('.main-menu').slideUp(1000, 'swing', function() {
//     $(this).removeAttr("style");
//   });


// });

// }



// $('.top-bar .span').toggle(function() {
// var t = $(this).next('ul');
// t.css('visibility', 'visible');
// t.removeClass('is-removed-mobile');
// //l = t.find('li');
// //l.show();
// console.log("ive been clicked off");
// }, function() {
// var t = $(this).next('ul');
// t.css('visibility', 'hidden');
// t.addClass('is-removed-mobile');
// //l = t.find('li');
// l.hide();

// });



// $(function(){


//     var config = {    
//          sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
//          interval: 50,  // number = milliseconds for onMouseOver polling interval    
//          over: doOpen,   // function = onMouseOver callback (REQUIRED)    
//          timeout: 50,   // number = milliseconds delay before onMouseOut    
//          out: doClose    // function = onMouseOut callback (REQUIRED)    
//     };
    
//     function doOpen() {
//         if ($(window).width() > 850) {
//         $(this).addClass("hover");
//         $('ul:first',this).css('visibility', 'visible');
//         }
//     }
 
//     function doClose() {
//         if ($(window).width() > 850) {
//         $(this).removeClass("hover");
//         $('ul:first',this).css('visibility', 'hidden');
//         }
//     }

//     $("ul.dropdown li").hoverIntent(config);
    
//     $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");


// });


// Function to find the highest height of an element
// used to set all sizes the same for lists or divs with varying content
function highest(el) {
    var highest = 0;
    el.each(function() {
        var height = $(this).height();
        if(height > highest) {
          highest = height;
        }
    });
    return highest;   
}





var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();


// menuS = $('nav.sidebar').html();

// b = $('.secondary-menu-mobile');

// b.prepend(menuS);

// c = b.find('ul li:first-child');

// d = c.nextAll();

// d.hide();

// e = $('.secondary-menu-mobile span a');

// e.toggle(function() {
//  d.show();

// }, function() {

// d.hide();


// });


//menus = $('.submenu').each().find('li');

//console.log(menus);


// enquire

// .register("screen and (min-width: 1000px)", {

//   // REQUIRED
//   // Triggered when the media query transitions
//   // from *unmatched* to *matched*
//   match : function() {


  //desktop view menu - handle click event for main menu links in desktop view
$('.new-main-menu li a').click(function(event) {
  event.preventDefault();

  var _clicked = $(this);
  var j = $('.submenu > div.menu-active:visible');
  var y = _clicked.parent();

  if (j.length == 1 && y.hasClass("menu-active")) {

  // console.log(j.length + "length");
  var r = j.attr('data-menu');
  var l = $('li').find("[data-item='"+ r +"']");
  
  j.slideUp('slow', 'swing', function() { y.removeClass('menu-active');  j.removeAttr('style'); });
 
  // alert('one');
 

  // desktop view menu - if user clicks another top-level link once menu is already opened then do this:
} else if (!_clicked.parent().hasClass('menu-active') && j.length == 1 ) {
  //alert("it doesnt");
  var r = j.attr('data-menu');
  var l = $('li').find("[data-item='"+ r +"']");
  l.parent().removeClass('menu-active');
  j.hide();
  _clicked.parent('li').addClass('menu-active');
  var t = _clicked.attr('data-item');
  var g = $('div').find("[data-menu='"+ t +"']");
  g.addClass('menu-active');
  g.fadeIn();

  // desktop view menu - if no menu item already open then do this:
} else {
  _clicked.parent('li').addClass('menu-active');
  var t = _clicked.attr('data-item');
  var g = $('div').find("[data-menu='"+ t +"']");
  g.addClass('menu-active');
  g.slideDown('slow', 'swing', function() {});

};

});
  // },
  
  // // OPTIONAL   
  // // Triggered when the media query transitions 
  // // from a *matched* to *unmatched*                        
  // unmatch : function() {},    
                                
  // // OPTIONAL
  // // Triggered once immediately upon registration of handler
  // setup : function() {},      
                                
  // // OPTIONAL
  // // Defaults to false
  // // If true, defers execution of the setup function
  // // until the first media query is matched (still just once)
  // deferSetup : true    

  // })

// .register("screen and (max-width:60em)", function() {
       
      //
      // mobile view menu
      //

      // show/hide sub-menus
      $('.submenu span').click(function(event) { 
      event.preventDefault();
     
      var _clicked = $(this);
      var m = $('.sub-inner-menu:visible');
        
      // if not already open, but another menu is already expanded,
      // hide the sub menu that is already open first and then show the menu you just clicked
      if (m.length == 1 && !_clicked.hasClass('active')) {


        m.parent().find('h2 span').removeClass('active');
        m.parent().find('h2 span').removeClass('ui-icons-transparent-close');
        m.parent().find('h2 span').addClass('ui-icons-transparent-plus');
        m.hide().removeAttr("style");
        $(this).addClass('active');
        $(this).removeClass('ui-icons-transparent-plus');
        $(this).addClass('ui-icons-transparent-close');
        var h = $(this).parent().next('.sub-inner-menu');
        h.slideDown('fast', 'linear', function() {});

      
      // if already open, then close the sub menu
      } else if ($(this).hasClass("active")) { 

        var _menu_to_close = $(this);  
        var h = _menu_to_close.parent().next('.sub-inner-menu');
        h.slideUp('fast', 'linear', function() {
          h.removeAttr("style");
          _menu_to_close.removeClass('active'); 
          _menu_to_close.removeClass('ui-icons-transparent-close');
          _menu_to_close.addClass('ui-icons-transparent-plus');});

      
      // if sub menu not already visible, then show the menu
      } else {
        $(this).addClass('active');
        $(this).removeClass('ui-icons-transparent-plus');
        $(this).addClass('ui-icons-transparent-close');
        var h = $(this).parent().next('.sub-inner-menu');
        h.slideDown('fast', 'linear', function() {});
      };
    });      
// });

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

$(window).resize(function () {
    waitForFinalEvent(function(){
      //alert('Resize...');
      checkWindowSize();
      $('.sub-inner-menu').removeAttr("style");
      $('.submenu > div').removeAttr("style").removeClass('menu-active');
    }, 500, "some unique string");
});

    // mobile view - toggle menu show hide the menu
    $('a.menu').click(function(event) { 

      var t = $('#new-menu');

      if ($(this).hasClass("active")) {
        var _menu_to_toggle = $(this);
        t.slideUp('fast', 'linear', function() { 
          _menu_to_toggle.removeClass('active'); 
          $('submenu').css({'padding-top': '0', 'margin-top': '24px'});
          $('#menu-icon-indicator').html('≡');
          _menu_to_toggle.css({'background-color': '#f0f0f0', 'color': 'black'});
          
          t.find('#desktop-menu-wrap').addClass('content-wrapper');
          t.removeAttr('style');

          t.hide();
        });
        
        
      } else {

        t.find('#desktop-menu-wrap').removeClass('content-wrapper');
        $('#main-menu-btn').addClass('active').css({'background-color': '#333333', 'color': 'white'});
        $('#menu-icon-indicator').html('x');
        $('submenu').css({'padding-top': '24px', 'margin-top': '0'});
        t.slideDown('fast', 'linear', function() {  });
      };

      });
    






//console.log(c);
//checkWindowSize();
//dropMenu();
//menuToggle();





// jquery jpanel slide from left menu for docs page 

/**
  *
  * jPanelMenu 1.3.0 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */
(function(e){e.jPanelMenu=function(t){if(typeof t=="undefined"||t==null)t={};var n={options:e.extend({menu:"#menu",trigger:".menu-trigger",excludedPanelContent:"style, script",direction:"left",openPosition:"250px",animated:!0,closeOnContentClick:!0,keyboardShortcuts:[{code:27,open:!1,close:!0},{code:37,open:!1,close:!0},{code:39,open:!0,close:!0},{code:77,open:!0,close:!0}],duration:150,openDuration:t.duration||150,closeDuration:t.duration||150,easing:"ease-in-out",openEasing:t.easing||"ease-in-out",closeEasing:t.easing||"ease-in-out",before:function(){},beforeOpen:function(){},beforeClose:function(){},after:function(){},afterOpen:function(){},afterClose:function(){},beforeOn:function(){},afterOn:function(){},beforeOff:function(){},afterOff:function(){}},t),settings:{transitionsSupported:"WebkitTransition"in document.body.style||"MozTransition"in document.body.style||"msTransition"in document.body.style||"OTransition"in document.body.style||"Transition"in document.body.style,shiftFixedChildren:!1,panelPosition:"relative",positionUnits:"px"},menu:"#jPanelMenu-menu",panel:".jPanelMenu-panel",fixedChildren:[],timeouts:{},clearTimeouts:function(){clearTimeout(n.timeouts.open);clearTimeout(n.timeouts.afterOpen);clearTimeout(n.timeouts.afterClose)},setPositionUnits:function(){var e=!1,t=["%","px","em"];for(unitID in t){var r=t[unitID];if(n.options.openPosition.toString().substr(-r.length)==r){e=!0;n.settings.positionUnits=r}}e||(n.options.openPosition=parseInt(n.options.openPosition)+n.settings.positionUnits)},checkFixedChildren:function(){n.disableTransitions();var t={position:e(n.panel).css("position")};t[n.options.direction]=e(n.panel).css(n.options.direction)=="auto"?0:e(n.panel).css(n.options.direction);e(n.panel).find("> *").each(function(){e(this).css("position")=="fixed"&&e(this).css(n.options.direction)=="auto"&&n.fixedChildren.push(this)});if(n.fixedChildren.length>0){var r={position:"relative"};r[n.options.direction]="1px";n.setPanelStyle(r);parseInt(e(n.fixedChildren[0]).offset().left)==0&&(n.settings.shiftFixedChildren=!0)}n.setPanelStyle(t)},setjPanelMenuStyles:function(){var t="#fff",r=e("html").css("background-color"),i=e("body").css("background-color");i!="transparent"&&i!="rgba(0, 0, 0, 0)"?t=i:r!="transparent"&&r!="rgba(0, 0, 0, 0)"?t=r:t="#fff";e("#jPanelMenu-style-master").length==0&&e("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;'+n.options.direction+":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;"+n.options.direction+":0;top:0;z-index:2;width:100%;min-height:100%;background:"+t+"}</style>")},setMenuState:function(t){var n=t?"open":"closed";e("body").attr("data-menu-position",n)},getMenuState:function(){return e("body").attr("data-menu-position")},menuIsOpen:function(){return n.getMenuState()=="open"?!0:!1},setMenuStyle:function(t){e(n.menu).css(t)},setPanelStyle:function(t){e(n.panel).css(t)},showMenu:function(){n.setMenuStyle({display:"block"});n.setMenuStyle({"z-index":"1"})},hideMenu:function(){n.setMenuStyle({"z-index":"-1"});n.setMenuStyle({display:"none"})},enableTransitions:function(t,r){var i=t/1e3,s=n.getCSSEasingFunction(r);n.disableTransitions();e("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all '+i+"s "+s+"; -moz-transition: all "+i+"s "+s+"; -o-transition: all "+i+"s "+s+"; transition: all "+i+"s "+s+";}</style>")},disableTransitions:function(){e("#jPanelMenu-style-transitions").remove()},enableFixedTransitions:function(t,r,i,s){var o=i/1e3,u=n.getCSSEasingFunction(s);n.disableFixedTransitions(r);e("body").append('<style id="jPanelMenu-style-fixed-'+r+'">'+t+"{-webkit-transition: all "+o+"s "+u+"; -moz-transition: all "+o+"s "+u+"; -o-transition: all "+o+"s "+u+"; transition: all "+o+"s "+u+";}</style>")},disableFixedTransitions:function(t){e("#jPanelMenu-style-fixed-"+t).remove()},getCSSEasingFunction:function(e){switch(e){case"linear":return e;case"ease":return e;case"ease-in":return e;case"ease-out":return e;case"ease-in-out":return e;default:return"ease-in-out"}},getJSEasingFunction:function(e){switch(e){case"linear":return e;default:return"swing"}},openMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeOpen();n.setMenuState(!0);n.setPanelStyle({position:"relative"});n.showMenu();var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.openDuration,n.options.openEasing);var i={};i[n.options.direction]=n.options.openPosition;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.openDuration,n.options.openEasing);var s={};s[n.options.direction]=n.options.openPosition;e(this).css(s)});n.timeouts.afterOpen=setTimeout(function(){n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.options.after();n.options.afterOpen();n.initiateContentClickListeners()},n.options.openDuration)}else{var s=n.getJSEasingFunction(n.options.openEasing),o={};o[n.options.direction]=n.options.openPosition;e(n.panel).stop().animate(o,n.options.openDuration,s,function(){n.options.after();n.options.afterOpen();n.initiateContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=n.options.openPosition;e(this).stop().animate(t,n.options.openDuration,s)})}},closeMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeClose();n.setMenuState(!1);var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.closeDuration,n.options.closeEasing);var i={};i[n.options.direction]=0+n.settings.positionUnits;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.closeDuration,n.options.closeEasing);var s={};s[n.options.direction]=0+n.settings.positionUnits;e(this).css(s)});n.timeouts.afterClose=setTimeout(function(){n.setPanelStyle({position:n.settings.panelPosition});n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()},n.options.closeDuration)}else{var s=n.getJSEasingFunction(n.options.closeEasing),o={};o[n.options.direction]=0+n.settings.positionUnits;e(n.panel).stop().animate(o,n.options.closeDuration,s,function(){n.setPanelStyle({position:n.settings.panelPosition});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=0+n.settings.positionUnits;e(this).stop().animate(t,n.options.closeDuration,s)})}},triggerMenu:function(e){n.menuIsOpen()?n.closeMenu(e):n.openMenu(e)},initiateClickListeners:function(){e(document).on("click",n.options.trigger,function(){n.triggerMenu(n.options.animated);return!1})},destroyClickListeners:function(){e(document).off("click",n.options.trigger,null)},initiateContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).on("click",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)});e(document).on("touchend",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)})},destroyContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).off("click",n.panel,null);e(document).off("touchend",n.panel,null)},initiateKeyboardListeners:function(){var t=["input","textarea"];e(document).on("keydown",function(r){var i=e(r.target),s=!1;e.each(t,function(){i.is(this.toString())&&(s=!0)});if(s)return!0;for(mapping in n.options.keyboardShortcuts)if(r.which==n.options.keyboardShortcuts[mapping].code){var o=n.options.keyboardShortcuts[mapping];o.open&&o.close?n.triggerMenu(n.options.animated):o.open&&!o.close&&!n.menuIsOpen()?n.openMenu(n.options.animated):!o.open&&o.close&&n.menuIsOpen()&&n.closeMenu(n.options.animated);return!1}})},destroyKeyboardListeners:function(){e(document).off("keydown",null)},setupMarkup:function(){e("html").addClass("jPanelMenu");e("body > *").not(n.menu+", "+n.options.excludedPanelContent).wrapAll('<div class="'+n.panel.replace(".","")+'"/>');e(n.options.menu).clone().attr("id",n.menu.replace("#","")).insertAfter("body > "+n.panel)},resetMarkup:function(){e("html").removeClass("jPanelMenu");e("body > "+n.panel+" > *").unwrap();e(n.menu).remove()},init:function(){n.options.beforeOn();n.initiateClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.initiateKeyboardListeners();n.setjPanelMenuStyles();n.setMenuState(!1);n.setupMarkup();n.setMenuStyle({width:n.options.openPosition});n.checkFixedChildren();n.setPositionUnits();n.closeMenu(!1);n.options.afterOn()},destroy:function(){n.options.beforeOff();n.closeMenu();n.destroyClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.destroyKeyboardListeners();n.resetMarkup();var t={};t[n.options.direction]="auto";e(n.fixedChildren).each(function(){e(this).css(t)});n.fixedChildren=[];n.options.afterOff()}};return{on:n.init,off:n.destroy,trigger:n.triggerMenu,open:n.openMenu,close:n.closeMenu,isOpen:n.menuIsOpen,menu:n.menu,getMenu:function(){return e(n.menu)},panel:n.panel,getPanel:function(){return e(n.panel)}}}})(jQuery);
