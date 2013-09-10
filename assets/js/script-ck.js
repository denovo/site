// --------------------------------------------------
// function to allow scroll to an element on the page
//
// example:  $('some-div').scrollToMe();  
//
//
function checkWindowSize(){var e=$(window).width(),t=e>850?"gDesktop":e>600?"gTablet":e<600?"gMobile":e>1289?"gDesktop":"";$(document.body).removeClass("gDesktop gTablet gMobile").addClass(t)}function enableSelectBoxes(){$(".js-select-box").each(function(){var e=$(this).children("ul.js-select-box-list").children("li.select-box-option:first").children("a").html();$(this).children("div").children("h3.selected").html(e),$("input.js-select-box-value").attr("value",$(this).children("ul.js-select-box-list").children("li.select-box-option:first").attr("data-sb-value")),$(this).children("div").children("h3.selected,div.select-box-arrow").click(function(e){e.preventDefault(),$(this).parent().parent().children("ul.js-select-box-list").css("display")=="none"?$(this).parent().parent().children("ul.js-select-box-list").css("display","block"):$(this).parent().parent().children("ul.js-select-box-list").css("display","none")}),$(this).find("li.select-box-option").click(function(e){e.preventDefault(),$(this).parent().css("display","none"),$("input.js-select-box-value").attr("value",$(this).attr("data-sb-value"));var t="the select option is :"+$(this).attr("data-sb-value");$(this).parent().parent().children("div").children("h3.selected").html($(this).children("a").html()),$(this).parent().parent().scrollToMe()})})}jQuery.fn.extend({scrollToMe:function(){var e=jQuery(this).offset().top-100;jQuery("html,body").animate({scrollTop:e},500)}});var Link_col=$(".college-nav").find("li").slice(3,6),Link_study_1=$(".study-nav").find("li").slice(6,11),Link_study_2=$(".study-nav").find("li").slice(11,16),Link_study_3=$(".study-nav").find("li").slice(16,19),Link_student=$(".student-nav").find("li").slice(3,4),Link_alumni=$(".alumni-nav").find("li").slice(4,6),Link_about=$(".about-nav").find("li").slice(5,9),Link_about_1=$(".about-nav").find("li").slice(9,11);Link_col.remove(),Link_study_1.remove(),Link_study_2.remove(),Link_study_3.remove(),Link_student.remove(),Link_alumni.remove(),Link_about.remove(),Link_about_1.remove(),$(".college-nav").append('<ul class="subnav-2 region">'),$(".college-nav .subnav-2").prepend(Link_col),$(".study-nav").append('<ul class="subnav-2 pad-top-6x region">'),$(".study-nav .subnav-2").prepend(Link_study_1),$(".study-nav").append('<ul class="subnav-3 pad-top-6x region">'),$(".study-nav .subnav-3").prepend(Link_study_2),$(".study-nav").append('<ul class="subnav-4 pad-top-6x region">'),$(".study-nav .subnav-4").prepend(Link_study_3),$(".student-nav").append('<ul class="subnav-2 region pad-top-6x region">'),$(".student-nav .subnav-2").prepend(Link_student),$(".alumni-nav").append('<ul class="subnav-2 region pad-top-6x region">'),$(".alumni-nav .subnav-2").prepend(Link_alumni),$(".about-nav").append('<ul class="subnav-2 pad-top-6x region">'),$(".about-nav .subnav-2").prepend(Link_about),$(".about-nav").append('<ul class="subnav-3 pad-top-6x region">'),$(".about-nav .subnav-3").prepend(Link_about_1);var waitForFinalEvent=function(){var e={};return function(t,n,r){r||(r="Don't call this twice without a uniqueId"),e[r]&&clearTimeout(e[r]),e[r]=setTimeout(t,n)}}();$(document).ready(function(){function a(e){$(e).parent().addClass("loaded")}checkWindowSize();if($(".breadcrumbs").length>0){var e=$(".breadcrumbs").find("a");e.last().hide()}var t=$(".sidebar").length,n=$(".sidebar").find(".menu-heading").length;if(t>0){var r=$(".sidebar li").size();if(r>1){var i=$(".sidebar").html(),s=$(".sidebar li").first(),o="<div class='mob-sb-dd-title'>"+s.text()+"</div>"+'<a href="#" class="show-mob-sidebar icon"></a>',u;n>0?u=o+i:u=i,$('<div id="mobile-sidebar" class="mobile-sidebar"></div>').prependTo(".content"),$("#mobile-sidebar").html(u),$(".show-mob-sidebar").click(function(e){e.preventDefault(),_clicked=$(this),_clicked.hasClass("active")?(_clicked.closest($("#mobile-sidebar")).find($("ul")).slideUp(),_clicked.removeClass("active")):(_clicked.closest($("#mobile-sidebar")).find($("ul")).slideDown(),_clicked.addClass("active"))}),s.text().toLowerCase()=="in this section"?$("#mobile-sidebar li").first().remove():$("#mobile-sidebar li a").first().text("College Homepage")}}$(".resrc").length>0&&$.getScript("http://artslondon.github.io/beta/assets/js/libs/jquery.review-1.0.0.min.js",function(){$(".resrc").review({callback:function(){resrc.resrc(this)}})}),$(".select-box").length>0&&enableSelectBoxes(),$("blockquote").length>0&&$("blockquote").each(function(){$(this).prepend("<span></span>")}),$(".pull-quote").length>0&&$(".pull-quote").each(function(){$(this).prepend("<span></span>")}),$(".search-input-wrap").length>0&&$("#finder-search-input").focus(function(){$("#finder-search-input").parent().parent().addClass("search-gray-border")}),$("#container").length>0&&$.when($.getScript("http://artslondon.github.io/beta/assets/js/components/filtrify.min.js"),$.getScript("http://artslondon.github.io/beta/assets/js/components/jPages.min.js"),$.Deferred(function(e){$(e.resolve)})).done(function(){$(function(){function n(){t.jPages({containerID:"container",perPage:24,direction:"auto",animation:"fadeInUp"})}function r(){t.jPages("destroy")}var e=$("#container"),t=$("#pagination");n(),$.filtrify("container","placeHolder",{block:"data-original",callback:function(){r(),n()}})})}),$(window).scroll(function(){$("body").hasClass("gDesktop")&&($(this).scrollTop()>450?$(".back-to-top").fadeIn(200):$(".back-to-top").fadeOut(200))}),$(".back-to-top").click(function(e){e.preventDefault(),$("html, body").animate({scrollTop:0},300)}),$(".js-carousel").length>0&&$.getScript("http://artslondon.github.io/beta/assets/js/components/jquery.bxslider.min.js",function(){$.each($(".js-carousel"),function(){var e=$(this),t=e.closest(".bx-wrapper"),n=e.data("carousel-item-width")>0?e.data("carousel-item-width"):0,r=e.data("carousel-min-slides")>0?e.data("carousel-min-slides"):0,i=e.data("carousel-item-margin")>0?e.data("carousel-item-margin"):0,s=!0;s=e.data("controls");var o=e.data("pager")?e.data("pager"):!1;e.bxSlider({slideWidth:n,minSlides:r,maxSlides:10,slideMargin:i,moveSlides:1,controls:s,captions:!0,pager:o,video:!0,onSliderLoad:function(t){e.data("counter")&&$(e).closest(".bx-wrapper").find(".bx-controls").prepend('<div class="bx-counter"><span class="bx-index">'+(t+1)+'</span>/<span class="bx-total">'+e.getSlideCount()+"</span></div>")},onSlideAfter:function(t,n,r){e.data("counter")&&$(e).closest(".bx-wrapper").find(".bx-index").text(r+1)}})})}),$(".royalSlider").length>0&&$.getScript("http://artslondon.github.io/beta/assets/js/libs/jquery.royalslider.min.js",function(){$.each($(".royalSlider"),function(){var e=$(this),t=e.data("slider-item-width")>0?e.data("slider-item-width"):930,n=e.data("slider-item-height")>0?e.data("slider-item-height"):465,r=e.data("slider-auto-play")==1?e.data("slider-auto-play"):!1;e.royalSlider({arrowsNav:!0,fadeinLoadedSlide:!1,arrowsNavAutoHide:!1,controlNavigation:"none",loop:!0,autoScaleSlider:!0,autoScaleSliderWidth:t,autoScaleSliderHeight:n,imageScalePadding:0,globalCaption:!0,autoPlay:{enabled:r,pauseOnHover:!0}})})}),$(".credits").length>0&&$.when($.getScript("http://artslondon.github.io/beta/assets/js/libs/jquery-rotate.js"),$.Deferred(function(e){$(e.resolve)})).done(function(){$("body").hasClass("gMobile")||($(".credits-btn").addClass("show").rotate({angle:-90}),$(".show-credits").click(function(e){e.preventDefault();var t=$(this);t.hasClass("active")?(t.removeClass("active").html("Show Credits"),$(".credits").fadeOut()):(t.addClass("active").html("Hide Credits"),$(".credits").fadeIn())}))});if($(".accordion").length>0){$.when($.getScript("http://artslondon.github.io/beta/assets/js/components/jquery.accordion.js"),$.getScript("http://artslondon.github.io/beta/assets/js/components/jquery.easing.1.3.js"),$.getScript("http://artslondon.github.io/beta/assets/js/libs/jquery-rotate.js"),$.Deferred(function(e){$(e.resolve)})).done(function(){$("#st-accordion").accordion({oneOpenedItem:!0})});function f(){$(".accordion-list-item").each(function(e){var t=$(this);t.hasClass("st-open")&&t.find(".st-arrow").rotate({animateTo:0,center:["50%","50%"]})})}$(".accordion-list-anchor").on("click",".size-h4",function(e){e.preventDefault();var t=$(this).next(".st-arrow"),n=$(this).parent().parent(),r=$(this).parent().next(".st-content");f(),r.is(":visible")?t.rotate({animateTo:0,center:["50%","50%"]}):t.rotate({animateTo:135})}),$(".st-arrow").on("click",function(e){e.preventDefault(),f();var t=$(this),n=$(this).parent().parent();n.hasClass("st-open")?t.rotate({animateTo:0,center:["50%","50%"]}):t.rotate({animateTo:135})})}$(".dd-menu").length>0&&$(".js-dd-menu").click(function(e){e.preventDefault();var t=$(this),n=t.parent();n.hasClass("active")?n.find(".js-dd-menu-list").slideUp("fast",function(){n.removeClass("active")}):n.find(".js-dd-menu-list").slideDown("fast",function(){n.addClass("active")})}),$(".circles-component").length>0&&$("body").hasClass("gDesktop")&&$.when($.getScript("http://artslondon.github.io/beta/assets/js/libs/skrollr.min.js"),$.Deferred(function(e){$(e.resolve)})).done(function(){var e=skrollr.init()}),$(".search-filters").length>0&&$(".filter-heading").click(function(e){e.preventDefault();var t=$(this);t.hasClass("not-active")||(t.parent().hasClass("active")?t.parent().removeClass("active"):t.parent().addClass("active"))}),$("#showtime-json").length&&$.getScript("http://artslondon.github.io/beta/assets/js/libs/magnific-lightbox.js",function(){var e=$("#showtime-json").data("url"),t=$("#showtime-json").data("limit");$.getJSON(e+"&limit="+t+"&callback=?",function(e){var n=$("#showtime-json"),r="",i="",s=0;if(e.data.Student){var o=e.data.Student.Student.profileurl,u=e.data.Student.Student.firstName+" "+e.data.Student.Student.lastName;i=e.data.Student.Media}e.data.Profiles&&(i=e.data.Profiles),$.each(i,function(e,i){if(!(s<t))return!1;profileImg=i.thumb.split("gallery"),i.profileImg=profileImg[0]+"profile.jpg",i.zoomImg=profileImg[0]+"screen.jpg",r='<li><a class="zoom no-border" href= "'+i.zoomImg+'" title="'+i.fullName+'" data-profile-url="http://showtime.arts.ac.uk/'+i.profileName+'" style="background-image: url('+i.profileImg+')"></a></li>',n.append(r),s++}),$(".zoom").magnificPopup({type:"image",image:{titleSrc:function(e){return e.el.attr("title")+' - <a class="no-border" href="'+e.el.data("profile-url")+'">View profile</a>'}},gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]}})})}),$(".js-lightbox").length>0&&$.getScript("http://artslondon.github.io/beta/assets/js/libs/magnific-lightbox.js",function(){$(".js-lightbox").each(function(){$(this).magnificPopup({delegate:"a",type:"image",tLoading:"Loading image #%curr%...",mainClass:"mfp-img-mobile",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{tError:'<a href="%url%">The image #%curr%</a> could not be loaded.'}})})}),$(".expanded-content").hide(),$(".show-more").show(),$(".show-more").click(function(e){e.preventDefault();var t=$(this),n=t.closest(".expandable-content");$(".expanded-content",n).slideDown(),t.hide()}),$(".hide-content").click(function(e){e.preventDefault();var t=$(this),n=t.closest(".expandable-content");$(".expanded-content",n).hide(),$(n).find(".show-more").show(),n.scrollToMe()}),$(".tabs-container").length>0&&($(".tab_content").hide(),$(".tab_content:first").show(),$("ul.tabs li").click(function(){$(".tab_content").hide();var e=$(this).attr("rel");$("#"+e).show(),$("ul.tabs li").removeClass("active"),$(this).addClass("active"),$(".tab_drawer_heading").removeClass("d_active"),$(".tab_drawer_heading[rel^='"+e+"']").addClass("d_active")}),$(".tab_drawer_heading").click(function(){$(".tab_content").hide();var e=$(this).attr("rel");$("#"+e).show(),$(".tab_drawer_heading").removeClass("d_active"),$(this).addClass("d_active"),$("ul.tabs li").removeClass("active"),$("ul.tabs li[rel^='"+e+"']").addClass("active"),$(this).scrollToMe()})),$("video").length>0&&($(".__media").fitVids(),$.getScript("http://artslondon.github.io/beta/assets/js/libs/mediaelement-and-player.min.js",function(){$("video:not(.no-mejs)").mediaelementplayer({pluginPath:"http://beta.arts.ac.uk/media/beta/beta-assets/plugins/"})})),$('a[href$=".pdf"]').parent().addClass("download"),$.expr[":"].external=function(e){return e.hostname!=location.hostname},$("a:external.button-link").addClass("external").each(function(){$(this).attr("title",$(this).attr("title")+"(external link)")}),$(".content ul li a:external").parent().addClass("external").each(function(){$(this).attr("title",$(this).attr("title")+"(external link)")}),$("#debug").hide(),$(".debug-toggle").click(function(e){$("#debug").toggle(),e.preventDefault()}),$(".lcf.home").find("h2").wrapInner("<span />"),$(".lcf").find(".__media").find("h2").wrapInner("<span />")}),function(){$.fn.fitHeights=function(){function t(){var t=0;e.css({"min-height":t}),e.each(function(){$(this).height()>t&&(t=$(this).height())}),e.css({"min-height":t})}var e=$(this);return t(),$(window).on("resize",t),this}}(jQuery),$(window).load(function(){$(".related-content").length>0&&$(".related-content ul li").fitHeights(),$(".highlight-box-3").length>0&&$(".highlight-box-3 ul li").fitHeights(),$("body").is(".chelsea, .camberwell, .wimbledon")&&($(".two-up ul li").fitHeights(),$(".three-up ul li").fitHeights()),$("body").is(".ual")&&($(".cta .two-up-full ul li").fitHeights(),$(".st-cp .two-up-full ul li").fitHeights(),$(".news .four-up-full ul li").fitHeights(),$(".fe .four-up-full ul li").fitHeights()),$(".__gallery").length>0&&$(".__gallery").each(function(){$(this).find("li").fitHeights()})});