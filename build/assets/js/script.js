/*!Updated: 02-06-2014, 12:13:34 PM */

/*! Hammer.JS - v1.0.2 - 2013-02-27
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(t){"use strict";function e(){if(!n.READY){n.event.determineEventTypes();for(var t in n.gestures)n.gestures.hasOwnProperty(t)&&n.detection.register(n.gestures[t]);n.event.onTouch(document,n.EVENT_MOVE,n.detection.detect),n.event.onTouch(document,n.EVENT_END,n.detection.endDetect),n.READY=!0}}var n=function(t,e){return new n.Instance(t,e||{})};n.defaults={stop_browser_behavior:{userSelect:"none",touchCallout:"none",touchAction:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},n.HAS_POINTEREVENTS=navigator.msPointerEnabled,n.HAS_TOUCHEVENTS="ontouchstart"in t,n.EVENT_TYPES={},n.DIRECTION_DOWN="down",n.DIRECTION_LEFT="left",n.DIRECTION_UP="up",n.DIRECTION_RIGHT="right",n.POINTER_MOUSE="mouse",n.POINTER_TOUCH="touch",n.EVENT_START="start",n.EVENT_MOVE="move",n.EVENT_END="end";var i=navigator.userAgent;n.STOP_MOUSEEVENTS=n.HAS_TOUCHEVENTS&&i.match(/(like mac os x.*mobile.*safari)|android|blackberry/i),n.plugins={},n.READY=!1,n.Instance=function(t,i){var r=this;return e(),this.element=t,this.enabled=!0,this.options=n.utils.extend(n.utils.extend({},n.defaults),i||{}),this.options.stop_browser_behavior&&n.utils.stopDefaultBrowserBehavior(this),n.event.onTouch(t,n.EVENT_START,function(t){r.enabled&&n.detection.startDetect(r,t)}),this},n.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=document.createEvent("Event");return n.initEvent(t,!0,!0),n.gesture=e,this.element.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var r=null,s=!1,o=!1;n.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,i){var a=this;this.bindDom(t,n.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();u.match(/mouse/)&&n.STOP_MOUSEEVENTS||(u.match(/start|down|move/)&&(1===c.which||u.match(/touch/)||c.pointerType&&c.pointerType==c.MSPOINTER_TYPE_TOUCH)&&(s=!0),u.match(/touch|pointer/)&&(o=!0),!s||o&&u.match(/mouse/)||(n.HAS_POINTEREVENTS&&e!=n.EVENT_END&&n.PointerEvent.updatePointer(e,c),e===n.EVENT_END&&null!==r?c=r:r=c,i.call(n.detection,a.collectEventData(t,e,c)),n.HAS_POINTEREVENTS&&e==n.EVENT_END&&n.PointerEvent.updatePointer(e,c)),u.match(/up|cancel|end/)&&(s=!1,o=!1,r=null,n.PointerEvent.reset()))})},determineEventTypes:function(){var t;t=n.HAS_POINTEREVENTS?["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],n.EVENT_TYPES[n.EVENT_START]=t[0],n.EVENT_TYPES[n.EVENT_MOVE]=t[1],n.EVENT_TYPES[n.EVENT_END]=t[2]},getTouchList:function(t){return n.HAS_POINTEREVENTS?n.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,i){var r=this.getTouchList(i,e),s=n.POINTER_TOUCH;return(i.type.match(/mouse/)||i.poinerType&&i.pointerType===i.MSPOINTER_TYPE_MOUSE)&&(s=n.POINTER_MOUSE),{center:n.utils.getCenter(r),timestamp:i.timestamp||(new Date).getTime(),target:i.target,touches:r,eventType:e,pointerType:s,srcEvent:i,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return n.detection.stopDetect()}}}},n.PointerEvent={pointers:{},getTouchList:function(){var t=this.pointers,e=[];return Object.keys(t).sort().forEach(function(n){e.push(t[n])}),e},updatePointer:function(t,e){t==n.EVENT_END?delete this.pointers[e.pointerId]:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e)},reset:function(){this.pointers={}}},n.utils={extend:function(t,e){for(var n in e)t[n]=e[n];return t},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var i=Math.abs(t.pageX-e.pageX),r=Math.abs(t.pageY-e.pageY);return i>=r?t.pageX-e.pageX>0?n.DIRECTION_LEFT:n.DIRECTION_RIGHT:t.pageY-e.pageY>0?n.DIRECTION_UP:n.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==n.DIRECTION_UP||t==n.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t){var e,n=["webkit","khtml","moz","ms","o",""],i=t.options.stop_browser_behavior,r=t.element;if(i&&r.style){for(var s=0;n.length>s;s++)for(var o in i)i.hasOwnProperty(o)&&(e=o,n[s]&&(e=n[s]+e.substring(0,1).toUpperCase()+e.substring(1)),r.style[e]=i[o]);"none"==i.userSelect&&(r.onselectstart=function(){return!1})}}},n.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:n.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,i=this.gestures.length;i>n;n++){var r=this.gestures[n];if(!this.stopped&&e[r.name]!==!1&&r.handler.call(r,t,this.current.inst)===!1){this.stopDetect();break}}this.current&&(this.current.lastEvent=t)}},endDetect:function(t){this.detect(t),this.stopDetect()},stopDetect:function(){this.previous=n.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var i=0,r=t.touches.length;r>i;i++)e.touches.push(n.utils.extend({},t.touches[i]))}var s=t.timestamp-e.timestamp,o=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=n.utils.getVelocity(s,o,a);return n.utils.extend(t,{deltaTime:s,deltaX:o,deltaY:a,velocityX:c.x,velocityY:c.y,distance:n.utils.getDistance(e.center,t.center),angle:n.utils.getAngle(e.center,t.center),direction:n.utils.getDirection(e.center,t.center),scale:n.utils.getScale(e.touches,t.touches),rotation:n.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var e=t.defaults||{};return e[t.name]===void 0&&(e[t.name]=!0),n.utils.extend(n.defaults,e),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},n.gestures=n.gestures||{},n.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case n.EVENT_START:clearTimeout(this.timer),n.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==n.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case n.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case n.EVENT_END:clearTimeout(this.timer)}}},n.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==n.EVENT_END){var i=n.detection.previous;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n.detection.current.name=i&&"tap"==i.name&&t.timestamp-i.lastEvent.timestamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance?"doubletap":"tap",e.trigger(n.detection.current.name,t)}}},n.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==n.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},n.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1},triggered:!1,handler:function(t,e){if(n.detection.current.name!=this.name&&this.triggered)return e.trigger(this.name+"end",t),this.triggered=!1,void 0;if(!(e.options.drag_max_touches>0&&t.touches.length>e.options.drag_max_touches))switch(t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:if(t.distance<e.options.drag_min_distance&&n.detection.current.name!=this.name)return;n.detection.current.name=this.name;var i=n.detection.current.lastEvent.direction;e.options.drag_lock_to_axis&&i!==t.direction&&(t.direction=n.utils.isVertical(i)?0>t.deltaY?n.DIRECTION_UP:n.DIRECTION_DOWN:0>t.deltaX?n.DIRECTION_LEFT:n.DIRECTION_RIGHT),this.triggered||(e.trigger(this.name+"start",t),this.triggered=!0),e.trigger(this.name,t),e.trigger(this.name+t.direction,t),(e.options.drag_block_vertical&&n.utils.isVertical(t.direction)||e.options.drag_block_horizontal&&!n.utils.isVertical(t.direction))&&t.preventDefault();break;case n.EVENT_END:this.triggered&&e.trigger(this.name+"end",t),this.triggered=!1}}},n.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,e){if(n.detection.current.name!=this.name&&this.triggered)return e.trigger(this.name+"end",t),this.triggered=!1,void 0;if(!(2>t.touches.length))switch(e.options.transform_always_block&&t.preventDefault(),t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:var i=Math.abs(1-t.scale),r=Math.abs(t.rotation);if(e.options.transform_min_scale>i&&e.options.transform_min_rotation>r)return;n.detection.current.name=this.name,this.triggered||(e.trigger(this.name+"start",t),this.triggered=!0),e.trigger(this.name,t),r>e.options.transform_min_rotation&&e.trigger("rotate",t),i>e.options.transform_min_scale&&(e.trigger("pinch",t),e.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case n.EVENT_END:this.triggered&&e.trigger(this.name+"end",t),this.triggered=!1}}},n.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1},handler:function(t,e){e.options.prevent_default&&t.preventDefault(),t.eventType==n.EVENT_START&&e.trigger(this.name,t)}},n.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==n.EVENT_END&&e.trigger(this.name,t)}},t.Hammer=n,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return n})})(window),function(t){Hammer.event.bindDom=function(e,n,i){t(e).on(n,function(t){var e=t.originalEvent;e.pageX||(e.pageX=t.pageX,e.pageY=t.pageY),e.target||(e.target=t.target),e.button&&(e.which=e.button),e.preventDefault||(e.preventDefault=t.preventDefault),e.stopPropagation||(e.stopPropagation=t.stopPropagation),i.call(this,e)})},Hammer.Instance.prototype.on=function(e,n){return t(this.element).on(e,n)},Hammer.Instance.prototype.off=function(e,n){return t(this.element).off(e,n)},Hammer.Instance.prototype.trigger=function(e,n){return t(n.srcEvent.target).trigger({type:e,gesture:n})},t.fn.hammer=function(e){return this.each(function(){var n=t(this),i=n.data("hammer");i?i&&e&&Hammer.utils.extend(i.options,e):n.data("hammer",Hammer(this,e||{}))})}}(jQuery);
/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
	case 'select':
		return true;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	if (this.deviceIsIOS && targetElement.setSelectionRange) {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	// If the touch has moved, cancel the click tracking
	if (this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	if ((/Chrome\/[0-9]+/).test(navigator.userAgent)) {

		// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && metaViewport.content.indexOf('user-scalable=no') !== -1) {
				return true;
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}
(function ($) {
    $.fn.review = function () {
        var options = $.extend({threshold: 0, callback: function () {
            }}, arguments[0] || {}),
            $w = $(window),
            th = options.threshold,
            element = this,
            inView,
            isElementInView;
        this.one("reviewElement", function () {
            options.callback.call(this);
        });
        function reviewElement() {
            isElementInView = element.filter(function () {

                /**
                 * Hat tip to https://github.com/luis-almeida/unveil
                 * for adapting his inview window calculations
                 */

                var $e = $(this),
                    wo = $w.offset() ? $w.offset().top : 0,
                    wlo = $w.offset() ? $w.offset().left : 0,
                    wt = $w.scrollTop() + wo,
                    wlt = $w.scrollLeft() + wlo,
                    wb = wt + $w.height(),
                    wlb = wlt + $w.width(),
                    et = $e.offset().top,
                    el = $e.offset().left,
                    eb = et + $e.height(),
                    elb = el + $e.width();
                return eb >= wt - th && et <= wb + th && elb >= wlt - th && el <= wlb + th;
            });
            inView = isElementInView.trigger("reviewElement");
            element = element.not(inView);
        }

        $w.scroll(reviewElement);
        $w.resize(reviewElement);
        reviewElement();
        return this;
    };
})(window.jQuery || window.Zepto); (function(){
  
  $.fn.fitHeights = function() {
    
    var items = $(this);
    function setHeights() {
      
      var currentTallest = 0;
  
      items.css({ 'min-height' : currentTallest });  // unset min-height to get actual new height

      // right now this causes a noticeable shift in height on resize. workarounds?
      
      items.each(function(){
        
        if( $(this).height() > currentTallest ) { currentTallest = $(this).height(); }
      });

      items.css({ 'min-height' : currentTallest });
    
    }
    
    setHeights();
    $(window).on('resize', setHeights);
    return this;
  };
})(jQuery);// Item Name : Responsive Mega Menu Complete Set
// Item URI : http://codecanyon.net/item/mega-menu-complete-set/152825
// Author URI : http://codecanyon.net/user/Pixelworkshop/
// Version : 3.3


/* Megamenu Code - 21 Feb 2014 */

(function ($) {

    var settings = {
        menu_speed_show:200, // Time (in milliseconds) to show a drop down
        menu_speed_hide:100, // Time (in milliseconds) to hide a drop down
        menu_speed_delay:0, // Time (in milliseconds) before showing a drop down
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

                // fix to be able to remove the #_ at the end of each link URL (found in the forum for the megaMenu)
                // this should fix the jump to top of page when search icon is clicked on the menu in mobile view
                $(menuItemLink).click(function(event) {
                    event.preventDefault();
                    window.location.hash = this.hash;
                });

                if (("ontouchstart" in document.documentElement) && (settings.menu_responsive === 1)) {

                    if ($(window).innerWidth() < 960) {
                        $(menuDropDown).css({'top':'auto'}).hide();
                        $(menuItemFlyOutDropDown).css({'left':'0', 'top':'0'}).hide();
                        $(menuItem).hide(0);
                        $(menuButton).show(0);

                    } else {
                        megaMenuDropDownPosition();
                    }

                    $(menuButton).children('a').hammer().on('tap', function (event) {
                        $(menuItem).not(":eq(0)").toggle(0);
                    });

                    $(menuItemElement).toggleClass('noactive');

                    // Event attached to the link instead of the LI element
                    // to prevent the drop down from being closed if a touch
                    // event occurs within its area.

                    //mobile and tablet handler when top level menu items are clicked
                    $(menuItemLink).hammer().on('tap', function (event) {
                        event.preventDefault();
                        var $this = $(this);
                        var $thisParentItem = $this.closest(menuItem);
                        $thisParentItem.toggleClass('active noactive')
                            .find(menuDropDown).toggle(0);

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
                    // mobile menu icon show hide menu
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

                        // case 'open_close_fade':
                        // var menuEffectShow = 'fadeToggle',
                        //     menuEffectHide = 'fadeOut';
                        //     break;
                        case 'open_close_slide':
                        var menuEffectShow = 'slideDown',
                            menuEffectHide = 'fadeOut';
                            break;
                        // case 'open_close_toggle':
                        // var menuEffectShow = 'toggle',
                        //     menuEffectHide = 'fadeOut';
                        //     break;

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

                            $('.megamenu > li:nth-child(' + settings.menu_show_onload + ')')
                                .find(menuDropDown).show()
                                .closest(menuItem).toggleClass('active');


                            $(menuItem).unbind('mouseenter mouseleave').bind('click', function(event) {
                                //event.preventDefault();
                                var $this = $(this);
                                var dd = $this.find(menuDropDown);
                                var _clickedNode = event.target.nodeName;

                                // confirm("clicked node was:" + _clickedNode);
                                // only handle the closing and hiding of dropdown menu if clicking a link
                                if ($(event.target).hasClass("megamenu_drop"))  {

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
                                        }
                                        else {
                                            dd.slideUp();
                                        }

                                    }
                                }


                            });

                            $(menuItemFlyOut).unbind('mouseenter mouseleave').click(function () {

                                var $this = $(this);
                                $this.siblings().removeClass('active')
                                    .find(menuItemFlyOutDropDown)[menuEffectHide](settings.menu_speed_hide);
                                $this.siblings().find('li').removeClass('active');
                                $this.toggleClass('active')
                                    .find(menuItemFlyOutDropDown).first()
                                    .delay(settings.menu_speed_delay)[menuEffectShow](settings.menu_speed_show)
                                    .click(function (event) {
                                        event.stopPropagation();
                                    });

                            });

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
                // console.log('test');
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

        // get width of page -- used to set the width of the menu dropdowns a
        var _innerW = $('body').innerWidth();

        if ((_innerW < 960) && (settings.menu_responsive === 1)) {
            $('.megamenu').children('li').hide(0);
            $('.dropdown_container, .dropdown_fullwidth').css({
                'left':'0',
                'top':'auto',
                'width': _innerW
                }).hide();
            $('.dropdown_first').css({'left':'0'}).hide();
            $('.dropdown_flyout_level, .dropdown_flyout_level_left').css({'left':'0', 'top':'0'}).hide();
            $('.megamenu_button').show(0);
        }

        else {
            $('.dropdown_container').css({'left':'auto', 'top':'auto'}).hide();
            $('.dropdown_fullwidth').css({'left':'-1px', 'top':'auto'}).hide();

            var _nav_wrap = document.getElementById('global-nav'),
                x_pos;

            // get x-position (distance from left side of screen) of navigation
            x_pos = _nav_wrap.getBoundingClientRect().left;

            // set negative left margin to push the menu dropdown to the left edge of the screen
            var _l_margin = ("-" + x_pos + "px");

            $('.dropdown_fullwidth').css({
                    'position':'absolute',
                    'left':'0',
                    'right':'0',
                    'width' : _innerW, // set dropdown to full screen width
                    'top':'36px',
                    'margin-left': _l_margin // push dropdown to the left side of screen
            });

            $('.dropdown_flyout_level').css({'left':'95%', 'top':'-21px'}).hide();
            $('.dropdown_flyout_level_left').css({'left':'-108%', 'right':'100%'}).hide();
            $('.megamenu').children('li').show(0);
            $('.megamenu_button').hide(0);
        }

        $('.megamenu_container_vertical').find('.dropdown_container, .dropdown_fullwidth').css({'top':'0'});

    }


})(jQuery);
;(function ($, window, document) {

	var pluginName = "tooltipster",
		defaults = {
			animation: 'fade',
			arrow: true,
			arrowColor: '',
			autoClose: true,
			content: null,
			contentAsHTML: false,
			contentCloning: true,
			delay: 200,
			minWidth: 0,
			maxWidth: null,
			functionInit: function(origin, content) {},
			functionBefore: function(origin, continueTooltip) {
				continueTooltip();
			},
			functionReady: function(origin, tooltip) {},
			functionAfter: function(origin) {},
			icon: '(?)',
			iconCloning: true,
			iconDesktop: false,
			iconTouch: false,
			iconTheme: 'tooltipster-icon',
			interactive: false,
			interactiveTolerance: 350,
			multiple: false,
			offsetX: 0,
			offsetY: 0,
			onlyOne: false,
			position: 'top',
			positionTracker: false,
			speed: 350,
			timer: 0,
			theme: 'tooltipster-default',
			touchDevices: true,
			trigger: 'hover',
			updateAnimation: true
		};

	function Plugin(element, options) {

		// list of instance variables

		this.bodyOverflowX;
		// stack of custom callbacks provided as parameters to API methods
		this.callbacks = {
			hide: [],
			show: []
		};
		this.checkInterval = null;
		// this will be the user content shown in the tooltip. A capital "C" is used because there is also a method called content()
		this.Content;
		// this is the original element which is being applied the tooltipster plugin
		this.$el = $(element);
		// this will be the element which triggers the appearance of the tooltip on hover/click/custom events.
		// it will be the same as this.$el if icons are not used (see in the options), otherwise it will correspond to the created icon
		this.$elProxy;
		this.elProxyPosition;
		this.enabled = true;
		this.options = $.extend({}, defaults, options);
		this.mouseIsOverProxy = false;
		// a unique namespace per instance, for easy selective unbinding
		this.namespace = 'tooltipster-'+ Math.round(Math.random()*100000);
		// Status (capital S) can be either : appearing, shown, disappearing, hidden
		this.Status = 'hidden';
		this.timerHide = null;
		this.timerShow = null;
		// this will be the tooltip element (jQuery wrapped HTML element)
		this.$tooltip;

		// for backward compatibility
		this.options.iconTheme = this.options.iconTheme.replace('.', '');
		this.options.theme = this.options.theme.replace('.', '');

		// launch

		this._init();
	}

	Plugin.prototype = {

		_init: function() {

			var self = this;

			// disable the plugin on old browsers (including IE7 and lower)
			if (document.querySelector) {

				// note : the content is null (empty) by default and can stay that way if the plugin remains initialized but not fed any content. The tooltip will just not appear.

				// if content is provided in the options, its has precedence over the title attribute. Remark : an empty string is considered content, only 'null' represents the absence of content.
				if (self.options.content !== null){
					self._content_set(self.options.content);
				}
				else {
					// the same remark as above applies : empty strings (like title="") are considered content and will be shown. Do not define any attribute at all if you want to initialize the plugin without content at start.
					var t = self.$el.attr('title');
					if(typeof t === 'undefined') t = null;

					self._content_set(t);
				}

				var c = self.options.functionInit.call(self.$el, self.$el, self.Content);
				if(typeof c !== 'undefined') self._content_set(c);

				self.$el
					// strip the title off of the element to prevent the default tooltips from popping up
					.removeAttr('title')
					// to be able to find all instances on the page later (upon window events in particular)
					.addClass('tooltipstered');

				// detect if we're changing the tooltip origin to an icon
				// note about this condition : if the device has touch capability and self.options.iconTouch is false, you'll have no icons event though you may consider your device as a desktop if it also has a mouse. Not sure why someone would have this use case though.
				if ((!deviceHasTouchCapability && self.options.iconDesktop) || (deviceHasTouchCapability && self.options.iconTouch)) {

					// TODO : the tooltip should be automatically be given an absolute position to be near the origin. Otherwise, when the origin is floating or what, it's going to be nowhere near it and disturb the position flow of the page elements. It will imply that the icon also detects when its origin moves, to follow it : not trivial.
					// Until it's done, the icon feature does not really make sense since the user still has most of the work to do by himself

					// if the icon provided is in the form of a string
					if(typeof self.options.icon === 'string'){
						// wrap it in a span with the icon class
						self.$elProxy = $('<span class="'+ self.options.iconTheme +'"></span>');
						self.$elProxy.text(self.options.icon);
					}
					// if it is an object (sensible choice)
					else {
						// (deep) clone the object if iconCloning == true, to make sure every instance has its own proxy. We use the icon without wrapping, no need to. We do not give it a class either, as the user will undoubtedly style the object on his own and since our css properties may conflict with his own
						if (self.options.iconCloning) self.$elProxy = self.options.icon.clone(true);
						else self.$elProxy = self.options.icon;
					}

					self.$elProxy.insertAfter(self.$el);
				}
				else {
					self.$elProxy = self.$el;
				}

				// for 'click' and 'hover' triggers : bind on events to open the tooltip. Closing is now handled in _showNow() because of its bindings.
				// Notes about touch events :
					// - mouseenter, mouseleave and clicks happen even on pure touch devices because they are emulated. deviceIsPureTouch() is a simple attempt to detect them.
					// - on hybrid devices, we do not prevent touch gesture from opening tooltips. It would be too complex to differentiate real mouse events from emulated ones.
					// - we check deviceIsPureTouch() at each event rather than prior to binding because the situation may change during browsing
				if (self.options.trigger == 'hover') {

					// these binding are for mouse interaction only
					self.$elProxy
						.on('mouseenter.'+ self.namespace, function() {
							if (!deviceIsPureTouch() || self.options.touchDevices) {
								self.mouseIsOverProxy = true;
								self._show();
							}
						})
						.on('mouseleave.'+ self.namespace, function() {
							if (!deviceIsPureTouch() || self.options.touchDevices) {
								self.mouseIsOverProxy = false;
							}
						});

					// for touch interaction only
					if (deviceHasTouchCapability && self.options.touchDevices) {

						// for touch devices, we immediately display the tooltip because we cannot rely on mouseleave to handle the delay
						self.$elProxy.on('touchstart.'+ self.namespace, function() {
							self._showNow();
						});
					}
				}
				else if (self.options.trigger == 'click') {

					// note : for touch devices, we do not bind on touchstart, we only rely on the emulated clicks (triggered by taps)
					self.$elProxy.on('click.'+ self.namespace, function() {
						if (!deviceIsPureTouch() || self.options.touchDevices) {
							self._show();
						}
					});
				}
			}
		},

		// this function will schedule the opening of the tooltip after the delay, if there is one
		_show: function() {

			var self = this;

			if (self.Status != 'shown' && self.Status != 'appearing') {

				if (self.options.delay) {
					self.timerShow = setTimeout(function(){

						// for hover trigger, we check if the mouse is still over the proxy, otherwise we do not show anything
						if (self.options.trigger == 'click' || (self.options.trigger == 'hover' && self.mouseIsOverProxy)) {
							self._showNow();
						}
					}, self.options.delay);
				}
				else self._showNow();
			}
		},

		// this function will open the tooltip right away
		_showNow: function(callback) {

			var self = this;

			// call our constructor custom function before continuing
			self.options.functionBefore.call(self.$el, self.$el, function() {

				// continue only if the tooltip is enabled and has any content
				if (self.enabled && self.Content !== null) {

					// save the method callback and cancel hide method callbacks
					if (callback) self.callbacks.show.push(callback);
					self.callbacks.hide = [];

					//get rid of any appearance timer
					clearTimeout(self.timerShow);
					self.timerShow = null;
					clearTimeout(self.timerHide);
					self.timerHide = null;

					// if we only want one tooltip open at a time, close all auto-closing tooltips currently open and not already disappearing
					if (self.options.onlyOne) {
						$('.tooltipstered').not(self.$el).each(function(i,el) {

							var $el = $(el),
								nss = $el.data('tooltipster-ns');

							// iterate on all tooltips of the element
							$.each(nss, function(i, ns){
								var instance = $el.data(ns),
									// we have to use the public methods here
									s = instance.status(),
									ac = instance.option('autoClose');

								if (s !== 'hidden' && s !== 'disappearing' && ac) {
									instance.hide();
								}
							});
						});
					}

					var finish = function() {
						self.Status = 'shown';

						// trigger any show method custom callbacks and reset them
						$.each(self.callbacks.show, function(i,c) { c.call(self.$el); });
						self.callbacks.show = [];
					};

					// if this origin already has its tooltip open
					if (self.Status !== 'hidden') {

						// the timer (if any) will start (or restart) right now
						var extraTime = 0;

						// if it was disappearing, cancel that
						if (self.Status === 'disappearing') {

							self.Status = 'appearing';

							if (supportsTransitions()) {

								self.$tooltip
									.clearQueue()
									.removeClass('tooltipster-dying')
									.addClass('tooltipster-'+ self.options.animation +'-show');

								if (self.options.speed > 0) self.$tooltip.delay(self.options.speed);

								self.$tooltip.queue(finish);
							}
							else {
								// in case the tooltip was currently fading out, bring it back to life
								self.$tooltip
									.stop()
									.fadeIn(finish);
							}
						}
						// if the tooltip is already open, we still need to trigger the method custom callback
						else if(self.Status === 'shown') {
							finish();
						}
					}
					// if the tooltip isn't already open, open that sucker up!
					else {

						self.Status = 'appearing';

						// the timer (if any) will start when the tooltip has fully appeared after its transition
						var extraTime = self.options.speed;

						// disable horizontal scrollbar to keep overflowing tooltips from jacking with it and then restore it to its previous value
						self.bodyOverflowX = $('body').css('overflow-x');
						$('body').css('overflow-x', 'hidden');

						// get some other settings related to building the tooltip
						var animation = 'tooltipster-' + self.options.animation,
							animationSpeed = '-webkit-transition-duration: '+ self.options.speed +'ms; -webkit-animation-duration: '+ self.options.speed +'ms; -moz-transition-duration: '+ self.options.speed +'ms; -moz-animation-duration: '+ self.options.speed +'ms; -o-transition-duration: '+ self.options.speed +'ms; -o-animation-duration: '+ self.options.speed +'ms; -ms-transition-duration: '+ self.options.speed +'ms; -ms-animation-duration: '+ self.options.speed +'ms; transition-duration: '+ self.options.speed +'ms; animation-duration: '+ self.options.speed +'ms;',
							minWidth = self.options.minWidth ? 'min-width:'+ Math.round(self.options.minWidth) +'px;' : '',
							maxWidth = self.options.maxWidth ? 'max-width:'+ Math.round(self.options.maxWidth) +'px;' : '',
							pointerEvents = self.options.interactive ? 'pointer-events: auto;' : '';

						// build the base of our tooltip
						self.$tooltip = $('<div class="tooltipster-base '+ self.options.theme +'" style="'+ minWidth +' '+ maxWidth +' '+ pointerEvents +' '+ animationSpeed +'"><div class="tooltipster-content"></div></div>');

						// only add the animation class if the user has a browser that supports animations
						if (supportsTransitions()) self.$tooltip.addClass(animation);

						// insert the content
						self._content_insert();

						// attach
						self.$tooltip.appendTo('body');

						// do all the crazy calculations and positioning
						self.reposition();

						// call our custom callback since the content of the tooltip is now part of the DOM
						self.options.functionReady.call(self.$el, self.$el, self.$tooltip);

						// animate in the tooltip
						if (supportsTransitions()) {

							self.$tooltip.addClass(animation + '-show');

							if(self.options.speed > 0) self.$tooltip.delay(self.options.speed);

							self.$tooltip.queue(finish);
						}
						else {
							self.$tooltip.css('display', 'none').fadeIn(self.options.speed, finish);
						}

						// will check if our tooltip origin is removed while the tooltip is shown
						self._interval_set();

						// reposition on scroll (otherwise position:fixed element's tooltips will move away form their origin) and on resize (in case position can/has to be changed)
						$(window).on('scroll.'+ self.namespace +' resize.'+ self.namespace, function() {
							self.reposition();
						});

						// auto-close bindings
						if (self.options.autoClose) {

							// in case a listener is already bound for autoclosing (mouse or touch, hover or click), unbind it first
							$('body').off('.'+ self.namespace);

							// here we'll have to set different sets of bindings for both touch and mouse
							if (self.options.trigger == 'hover') {

								// if the user touches the body, hide
								if (deviceHasTouchCapability) {
									// timeout 0 : explanation below in click section
									setTimeout(function() {
										// we don't want to bind on click here because the initial touchstart event has not yet triggered its click event, which is thus about to happen
										$('body').on('touchstart.'+ self.namespace, function() {
											self.hide();
										});
									}, 0);
								}

								// if we have to allow interaction
								if (self.options.interactive) {

									// touch events inside the tooltip must not close it
									if (deviceHasTouchCapability) {
										self.$tooltip.on('touchstart.'+ self.namespace, function(event) {
											event.stopPropagation();
										});
									}

									// as for mouse interaction, we get rid of the tooltip only after the mouse has spent some time out of it
									var tolerance = null;

									self.$elProxy.add(self.$tooltip)
										// hide after some time out of the proxy and the tooltip
										.on('mouseleave.'+ self.namespace + '-autoClose', function() {
											clearTimeout(tolerance);
											tolerance = setTimeout(function(){
												self.hide();
											}, self.options.interactiveTolerance);
										})
										// suspend timeout when the mouse is over the proxy or the tooltip
										.on('mouseenter.'+ self.namespace + '-autoClose', function() {
											clearTimeout(tolerance);
										});
								}
								// if this is a non-interactive tooltip, get rid of it if the mouse leaves
								else {
									self.$elProxy.on('mouseleave.'+ self.namespace + '-autoClose', function() {
										self.hide();
									});
								}
							}
							// here we'll set the same bindings for both clicks and touch on the body to hide the tooltip
							else if(self.options.trigger == 'click'){

								// use a timeout to prevent immediate closing if the method was called on a click event and if options.delay == 0 (because of bubbling)
								setTimeout(function() {
									$('body').on('click.'+ self.namespace +' touchstart.'+ self.namespace, function() {
										self.hide();
									});
								}, 0);

								// if interactive, we'll stop the events that were emitted from inside the tooltip to stop autoClosing
								if (self.options.interactive) {

									// note : the touch events will just not be used if the plugin is not enabled on touch devices
									self.$tooltip.on('click.'+ self.namespace +' touchstart.'+ self.namespace, function(event) {
										event.stopPropagation();
									});
								}
							}
						}
					}

					// if we have a timer set, let the countdown begin
					if (self.options.timer > 0) {

						self.timerHide = setTimeout(function() {
							self.timerHide = null;
							self.hide();
						}, self.options.timer + extraTime);
					}
				}
			});
		},

		_interval_set: function() {

			var self = this;

			self.checkInterval = setInterval(function() {

				// if the tooltip and/or its interval should be stopped
				if (
						// if the origin has been removed
						$('body').find(self.$el).length === 0
						// if the elProxy has been removed
					||	$('body').find(self.$elProxy).length === 0
						// if the tooltip has been closed
					||	self.Status == 'hidden'
						// if the tooltip has somehow been removed
					||	$('body').find(self.$tooltip).length === 0
				) {
					// remove the tooltip if it's still here
					if (self.Status == 'shown' || self.Status == 'appearing') self.hide();

					// clear this interval as it is no longer necessary
					self._interval_cancel();
				}
				// if everything is alright
				else {
					// compare the former and current positions of the elProxy to reposition the tooltip if need be
					if(self.options.positionTracker){

						var p = self._repositionInfo(self.$elProxy),
							identical = false;

						// compare size first (a change requires repositioning too)
						if(areEqual(p.dimension, self.elProxyPosition.dimension)){

							// for elements with a fixed position, we track the top and left properties (relative to window)
							if(self.$elProxy.css('position') === 'fixed'){
								if(areEqual(p.position, self.elProxyPosition.position)) identical = true;
							}
							// otherwise, track total offset (relative to document)
							else {
								if(areEqual(p.offset, self.elProxyPosition.offset)) identical = true;
							}
						}

						if(!identical){
							self.reposition();
						}
					}
				}
			}, 200);
		},

		_interval_cancel: function() {
			clearInterval(this.checkInterval);
			// clean delete
			this.checkInterval = null;
		},

		_content_set: function(content) {
			// clone if asked. Cloning the object makes sure that each instance has its own version of the content (in case a same object were provided for several instances)
			// reminder : typeof null === object
			if (typeof content === 'object' && content !== null && this.options.contentCloning) {
				content = content.clone(true);
			}
			this.Content = content;
		},

		_content_insert: function() {

			var self = this,
				$d = this.$tooltip.find('.tooltipster-content');

			if (typeof self.Content === 'string' && !self.options.contentAsHTML) {
				$d.text(self.Content);
			}
			else {
				$d
					.empty()
					.append(self.Content);
			}
		},

		_update: function(content) {

			var self = this;

			// change the content
			self._content_set(content);

			if (self.Content !== null) {

				// update the tooltip if it is open
				if (self.Status !== 'hidden') {

					// reset the content in the tooltip
					self._content_insert();

					// reposition and resize the tooltip
					self.reposition();

					// if we want to play a little animation showing the content changed
					if (self.options.updateAnimation) {

						if (supportsTransitions()) {

							self.$tooltip.css({
								'width': '',
								'-webkit-transition': 'all ' + self.options.speed + 'ms, width 0ms, height 0ms, left 0ms, top 0ms',
								'-moz-transition': 'all ' + self.options.speed + 'ms, width 0ms, height 0ms, left 0ms, top 0ms',
								'-o-transition': 'all ' + self.options.speed + 'ms, width 0ms, height 0ms, left 0ms, top 0ms',
								'-ms-transition': 'all ' + self.options.speed + 'ms, width 0ms, height 0ms, left 0ms, top 0ms',
								'transition': 'all ' + self.options.speed + 'ms, width 0ms, height 0ms, left 0ms, top 0ms'
							}).addClass('tooltipster-content-changing');

							// reset the CSS transitions and finish the change animation
							setTimeout(function() {

								if(self.Status != 'hidden'){

									self.$tooltip.removeClass('tooltipster-content-changing');

									// after the changing animation has completed, reset the CSS transitions
									setTimeout(function() {

										if(self.Status !== 'hidden'){
											self.$tooltip.css({
												'-webkit-transition': self.options.speed + 'ms',
												'-moz-transition': self.options.speed + 'ms',
												'-o-transition': self.options.speed + 'ms',
												'-ms-transition': self.options.speed + 'ms',
												'transition': self.options.speed + 'ms'
											});
										}
									}, self.options.speed);
								}
							}, self.options.speed);
						}
						else {
							self.$tooltip.fadeTo(self.options.speed, 0.5, function() {
								if(self.Status != 'hidden'){
									self.$tooltip.fadeTo(self.options.speed, 1);
								}
							});
						}
					}
				}
			}
			else {
				self.hide();
			}
		},

		_repositionInfo: function($el) {
			return {
				dimension: {
					height: $el.outerHeight(false),
					width: $el.outerWidth(false)
				},
				offset: $el.offset(),
				position: {
					left: parseInt($el.css('left')),
					top: parseInt($el.css('top'))
				}
			};
		},

		hide: function(callback) {

			var self = this;

			// save the method custom callback and cancel any show method custom callbacks
			if (callback) self.callbacks.hide.push(callback);
			self.callbacks.show = [];

			// get rid of any appearance timeout
			clearTimeout(self.timerShow);
			self.timerShow = null;
			clearTimeout(self.timerHide);
			self.timerHide = null;

			var finishCallbacks = function() {
				// trigger any hide method custom callbacks and reset them
				$.each(self.callbacks.hide, function(i,c) { c.call(self.$el); });
				self.callbacks.hide = [];
			};

			// hide
			if (self.Status == 'shown' || self.Status == 'appearing') {

				self.Status = 'disappearing';

				var finish = function() {

					self.Status = 'hidden';

					// detach our content object first, so the next jQuery's remove() call does not unbind its event handlers
					if (typeof self.Content == 'object' && self.Content !== null) {
						self.Content.detach();
					}

					self.$tooltip.remove();
					self.$tooltip = null;

					// unbind orientationchange, scroll and resize listeners
					$(window).off('.'+ self.namespace);

					$('body')
						// unbind any auto-closing click/touch listeners
						.off('.'+ self.namespace)
						.css('overflow-x', self.bodyOverflowX);

					// unbind any auto-closing click/touch listeners
					$('body').off('.'+ self.namespace);

					// unbind any auto-closing hover listeners
					self.$elProxy.off('.'+ self.namespace + '-autoClose');

					// call our constructor custom callback function
					self.options.functionAfter.call(self.$el, self.$el);

					// call our method custom callbacks functions
					finishCallbacks();
				};

				if (supportsTransitions()) {

					self.$tooltip
						.clearQueue()
						.removeClass('tooltipster-' + self.options.animation + '-show')
						// for transitions only
						.addClass('tooltipster-dying');

					if(self.options.speed > 0) self.$tooltip.delay(self.options.speed);

					self.$tooltip.queue(finish);
				}
				else {
					self.$tooltip
						.stop()
						.fadeOut(self.options.speed, finish);
				}
			}
			// if the tooltip is already hidden, we still need to trigger the method custom callback
			else if(self.Status == 'hidden') {
				finishCallbacks();
			}

			return self;
		},

		// the public show() method is actually an alias for the private showNow() method
		show: function(callback) {
			this._showNow(callback);
			return this;
		},

		// 'update' is deprecated in favor of 'content' but is kept for backward compatibility
		update: function(c) {
			return this.content(c);
		},
		content: function(c) {
			// getter method
			if(typeof c === 'undefined'){
				return this.Content;
			}
			// setter method
			else {
				this._update(c);
				return this;
			}
		},

		reposition: function() {

			var self = this;

			// in case the tooltip has been removed from DOM manually
			if ($('body').find(self.$tooltip).length !== 0) {

				// reset width
				self.$tooltip.css('width', '');

				// find variables to determine placement
				self.elProxyPosition = self._repositionInfo(self.$elProxy);
				var arrowReposition = null,
					windowWidth = $(window).width(),
					// shorthand
					proxy = self.elProxyPosition,
					tooltipWidth = self.$tooltip.outerWidth(false),
					tooltipInnerWidth = self.$tooltip.innerWidth() + 1, // this +1 stops FireFox from sometimes forcing an additional text line
					tooltipHeight = self.$tooltip.outerHeight(false);

				// if this is an <area> tag inside a <map>, all hell breaks loose. Recalculate all the measurements based on coordinates
				if (self.$elProxy.is('area')) {
					var areaShape = self.$elProxy.attr('shape'),
						mapName = self.$elProxy.parent().attr('name'),
						map = $('img[usemap="#'+ mapName +'"]'),
						mapOffsetLeft = map.offset().left,
						mapOffsetTop = map.offset().top,
						areaMeasurements = self.$elProxy.attr('coords') !== undefined ? self.$elProxy.attr('coords').split(',') : undefined;

					if (areaShape == 'circle') {
						var areaLeft = parseInt(areaMeasurements[0]),
							areaTop = parseInt(areaMeasurements[1]),
							areaWidth = parseInt(areaMeasurements[2]);
						proxy.dimension.height = areaWidth * 2;
						proxy.dimension.width = areaWidth * 2;
						proxy.offset.top = mapOffsetTop + areaTop - areaWidth;
						proxy.offset.left = mapOffsetLeft + areaLeft - areaWidth;
					}
					else if (areaShape == 'rect') {
						var areaLeft = parseInt(areaMeasurements[0]),
							areaTop = parseInt(areaMeasurements[1]),
							areaRight = parseInt(areaMeasurements[2]),
							areaBottom = parseInt(areaMeasurements[3]);
						proxy.dimension.height = areaBottom - areaTop;
						proxy.dimension.width = areaRight - areaLeft;
						proxy.offset.top = mapOffsetTop + areaTop;
						proxy.offset.left = mapOffsetLeft + areaLeft;
					}
					else if (areaShape == 'poly') {
						var areaXs = [],
							areaYs = [],
							areaSmallestX = 0,
							areaSmallestY = 0,
							areaGreatestX = 0,
							areaGreatestY = 0,
							arrayAlternate = 'even';

						for (var i = 0; i < areaMeasurements.length; i++) {
							var areaNumber = parseInt(areaMeasurements[i]);

							if (arrayAlternate == 'even') {
								if (areaNumber > areaGreatestX) {
									areaGreatestX = areaNumber;
									if (i === 0) {
										areaSmallestX = areaGreatestX;
									}
								}

								if (areaNumber < areaSmallestX) {
									areaSmallestX = areaNumber;
								}

								arrayAlternate = 'odd';
							}
							else {
								if (areaNumber > areaGreatestY) {
									areaGreatestY = areaNumber;
									if (i == 1) {
										areaSmallestY = areaGreatestY;
									}
								}

								if (areaNumber < areaSmallestY) {
									areaSmallestY = areaNumber;
								}

								arrayAlternate = 'even';
							}
						}

						proxy.dimension.height = areaGreatestY - areaSmallestY;
						proxy.dimension.width = areaGreatestX - areaSmallestX;
						proxy.offset.top = mapOffsetTop + areaSmallestY;
						proxy.offset.left = mapOffsetLeft + areaSmallestX;
					}
					else {
						proxy.dimension.height = map.outerHeight(false);
						proxy.dimension.width = map.outerWidth(false);
						proxy.offset.top = mapOffsetTop;
						proxy.offset.left = mapOffsetLeft;
					}
				}

				// our function and global vars for positioning our tooltip
				var myLeft = 0,
					myLeftMirror = 0,
					myTop = 0,
					offsetY = parseInt(self.options.offsetY),
					offsetX = parseInt(self.options.offsetX),
					// this is the arrow position that will eventually be used. It may differ from the position option if the tooltip cannot be displayed in this position
					practicalPosition = self.options.position;

				// a function to detect if the tooltip is going off the screen horizontally. If so, reposition the crap out of it!
				function dontGoOffScreenX() {

					var windowLeft = $(window).scrollLeft();

					// if the tooltip goes off the left side of the screen, line it up with the left side of the window
					if((myLeft - windowLeft) < 0) {
						arrowReposition = myLeft - windowLeft;
						myLeft = windowLeft;
					}

					// if the tooltip goes off the right of the screen, line it up with the right side of the window
					if (((myLeft + tooltipWidth) - windowLeft) > windowWidth) {
						arrowReposition = myLeft - ((windowWidth + windowLeft) - tooltipWidth);
						myLeft = (windowWidth + windowLeft) - tooltipWidth;
					}
				}

				// a function to detect if the tooltip is going off the screen vertically. If so, switch to the opposite!
				function dontGoOffScreenY(switchTo, switchFrom) {
					// if it goes off the top off the page
					if(((proxy.offset.top - $(window).scrollTop() - tooltipHeight - offsetY - 12) < 0) && (switchFrom.indexOf('top') > -1)) {
						practicalPosition = switchTo;
					}

					// if it goes off the bottom of the page
					if (((proxy.offset.top + proxy.dimension.height + tooltipHeight + 12 + offsetY) > ($(window).scrollTop() + $(window).height())) && (switchFrom.indexOf('bottom') > -1)) {
						practicalPosition = switchTo;
						myTop = (proxy.offset.top - tooltipHeight) - offsetY - 12;
					}
				}

				if(practicalPosition == 'top') {
					var leftDifference = (proxy.offset.left + tooltipWidth) - (proxy.offset.left + proxy.dimension.width);
					myLeft = (proxy.offset.left + offsetX) - (leftDifference / 2);
					myTop = (proxy.offset.top - tooltipHeight) - offsetY - 12;
					dontGoOffScreenX();
					dontGoOffScreenY('bottom', 'top');
				}

				if(practicalPosition == 'top-left') {
					myLeft = proxy.offset.left + offsetX;
					myTop = (proxy.offset.top - tooltipHeight) - offsetY - 12;
					dontGoOffScreenX();
					dontGoOffScreenY('bottom-left', 'top-left');
				}

				if(practicalPosition == 'top-right') {
					myLeft = (proxy.offset.left + proxy.dimension.width + offsetX) - tooltipWidth;
					myTop = (proxy.offset.top - tooltipHeight) - offsetY - 12;
					dontGoOffScreenX();
					dontGoOffScreenY('bottom-right', 'top-right');
				}

				if(practicalPosition == 'bottom') {
					var leftDifference = (proxy.offset.left + tooltipWidth) - (proxy.offset.left + proxy.dimension.width);
					myLeft = proxy.offset.left - (leftDifference / 2) + offsetX;
					myTop = (proxy.offset.top + proxy.dimension.height) + offsetY + 12;
					dontGoOffScreenX();
					dontGoOffScreenY('top', 'bottom');
				}

				if(practicalPosition == 'bottom-left') {
					myLeft = proxy.offset.left + offsetX;
					myTop = (proxy.offset.top + proxy.dimension.height) + offsetY + 12;
					dontGoOffScreenX();
					dontGoOffScreenY('top-left', 'bottom-left');
				}

				if(practicalPosition == 'bottom-right') {
					myLeft = (proxy.offset.left + proxy.dimension.width + offsetX) - tooltipWidth;
					myTop = (proxy.offset.top + proxy.dimension.height) + offsetY + 12;
					dontGoOffScreenX();
					dontGoOffScreenY('top-right', 'bottom-right');
				}

				if(practicalPosition == 'left') {
					myLeft = proxy.offset.left - offsetX - tooltipWidth - 12;
					myLeftMirror = proxy.offset.left + offsetX + proxy.dimension.width + 12;
					var topDifference = (proxy.offset.top + tooltipHeight) - (proxy.offset.top + proxy.dimension.height);
					myTop = proxy.offset.top - (topDifference / 2) - offsetY;

					// if the tooltip goes off boths sides of the page
					if((myLeft < 0) && ((myLeftMirror + tooltipWidth) > windowWidth)) {
						var borderWidth = parseFloat(self.$tooltip.css('border-width')) * 2,
							newWidth = (tooltipWidth + myLeft) - borderWidth;
						self.$tooltip.css('width', newWidth + 'px');

						tooltipHeight = self.$tooltip.outerHeight(false);
						myLeft = proxy.offset.left - offsetX - newWidth - 12 - borderWidth;
						topDifference = (proxy.offset.top + tooltipHeight) - (proxy.offset.top + proxy.dimension.height);
						myTop = proxy.offset.top - (topDifference / 2) - offsetY;
					}

					// if it only goes off one side, flip it to the other side
					else if(myLeft < 0) {
						myLeft = proxy.offset.left + offsetX + proxy.dimension.width + 12;
						arrowReposition = 'left';
					}
				}

				if(practicalPosition == 'right') {
					myLeft = proxy.offset.left + offsetX + proxy.dimension.width + 12;
					myLeftMirror = proxy.offset.left - offsetX - tooltipWidth - 12;
					var topDifference = (proxy.offset.top + tooltipHeight) - (proxy.offset.top + proxy.dimension.height);
					myTop = proxy.offset.top - (topDifference / 2) - offsetY;

					// if the tooltip goes off boths sides of the page
					if(((myLeft + tooltipWidth) > windowWidth) && (myLeftMirror < 0)) {
						var borderWidth = parseFloat(self.$tooltip.css('border-width')) * 2,
							newWidth = (windowWidth - myLeft) - borderWidth;
						self.$tooltip.css('width', newWidth + 'px');

						tooltipHeight = self.$tooltip.outerHeight(false);
						topDifference = (proxy.offset.top + tooltipHeight) - (proxy.offset.top + proxy.dimension.height);
						myTop = proxy.offset.top - (topDifference / 2) - offsetY;
					}

					// if it only goes off one side, flip it to the other side
					else if((myLeft + tooltipWidth) > windowWidth) {
						myLeft = proxy.offset.left - offsetX - tooltipWidth - 12;
						arrowReposition = 'right';
					}
				}

				// if arrow is set true, style it and append it
				if (self.options.arrow) {

					var arrowClass = 'tooltipster-arrow-' + practicalPosition;

					// set color of the arrow
					if(self.options.arrowColor.length < 1) {
						var arrowColor = self.$tooltip.css('background-color');
					}
					else {
						var arrowColor = self.options.arrowColor;
					}

					// if the tooltip was going off the page and had to re-adjust, we need to update the arrow's position
					if (!arrowReposition) {
						arrowReposition = '';
					}
					else if (arrowReposition == 'left') {
						arrowClass = 'tooltipster-arrow-right';
						arrowReposition = '';
					}
					else if (arrowReposition == 'right') {
						arrowClass = 'tooltipster-arrow-left';
						arrowReposition = '';
					}
					else {
						arrowReposition = 'left:'+ Math.round(arrowReposition) +'px;';
					}

					// building the logic to create the border around the arrow of the tooltip
					if ((practicalPosition == 'top') || (practicalPosition == 'top-left') || (practicalPosition == 'top-right')) {
						var tooltipBorderWidth = parseFloat(self.$tooltip.css('border-bottom-width')),
							tooltipBorderColor = self.$tooltip.css('border-bottom-color');
					}
					else if ((practicalPosition == 'bottom') || (practicalPosition == 'bottom-left') || (practicalPosition == 'bottom-right')) {
						var tooltipBorderWidth = parseFloat(self.$tooltip.css('border-top-width')),
							tooltipBorderColor = self.$tooltip.css('border-top-color');
					}
					else if (practicalPosition == 'left') {
						var tooltipBorderWidth = parseFloat(self.$tooltip.css('border-right-width')),
							tooltipBorderColor = self.$tooltip.css('border-right-color');
					}
					else if (practicalPosition == 'right') {
						var tooltipBorderWidth = parseFloat(self.$tooltip.css('border-left-width')),
							tooltipBorderColor = self.$tooltip.css('border-left-color');
					}
					else {
						var tooltipBorderWidth = parseFloat(self.$tooltip.css('border-bottom-width')),
							tooltipBorderColor = self.$tooltip.css('border-bottom-color');
					}

					if (tooltipBorderWidth > 1) {
						tooltipBorderWidth++;
					}

					var arrowBorder = '';
					if (tooltipBorderWidth !== 0) {
						var arrowBorderSize = '',
							arrowBorderColor = 'border-color: '+ tooltipBorderColor +';';
						if (arrowClass.indexOf('bottom') !== -1) {
							arrowBorderSize = 'margin-top: -'+ Math.round(tooltipBorderWidth) +'px;';
						}
						else if (arrowClass.indexOf('top') !== -1) {
							arrowBorderSize = 'margin-bottom: -'+ Math.round(tooltipBorderWidth) +'px;';
						}
						else if (arrowClass.indexOf('left') !== -1) {
							arrowBorderSize = 'margin-right: -'+ Math.round(tooltipBorderWidth) +'px;';
						}
						else if (arrowClass.indexOf('right') !== -1) {
							arrowBorderSize = 'margin-left: -'+ Math.round(tooltipBorderWidth) +'px;';
						}
						arrowBorder = '<span class="tooltipster-arrow-border" style="'+ arrowBorderSize +' '+ arrowBorderColor +';"></span>';
					}

					// if the arrow already exists, remove and replace it
					self.$tooltip.find('.tooltipster-arrow').remove();

					// build out the arrow and append it
					var arrowConstruct = '<div class="'+ arrowClass +' tooltipster-arrow" style="'+ arrowReposition +'">'+ arrowBorder +'<span style="border-color:'+ arrowColor +';"></span></div>';
					self.$tooltip.append(arrowConstruct);
				}

				// position the tooltip
				self.$tooltip.css({'top': Math.round(myTop) + 'px', 'left': Math.round(myLeft) + 'px'});
			}

			return self;
		},

		enable: function() {
			this.enabled = true;
			return this;
		},

		disable: function() {
			// hide first, in case the tooltip would not disappear on its own (autoClose false)
			this.hide();
			this.enabled = false;
			return this;
		},

		destroy: function() {

			var self = this;

			self.hide();

			// remove the icon, if any
			if(self.$el[0] !== self.$elProxy[0]) self.$elProxy.remove();

			self.$el
				.removeData(self.namespace)
				.off('.'+ self.namespace);

			var ns = self.$el.data('tooltipster-ns');

			// if there are no more tooltips on this element
			if(ns.length === 1){

				// old school technique when outerHTML is not supported
				var stringifiedContent = (typeof self.Content === 'string') ? self.Content : $('<div></div>').append(self.Content).html();

				self.$el
					.removeClass('tooltipstered')
					.attr('title', stringifiedContent)
					.removeData(self.namespace)
					.removeData('tooltipster-ns')
					.off('.'+ self.namespace);
			}
			else {
				// remove the instance namespace from the list of namespaces of tooltips present on the element
				ns = $.grep(ns, function(el, i){
					return el !== self.namespace;
				});
				self.$el.data('tooltipster-ns', ns);
			}

			return self;
		},

		elementIcon: function() {
			return (this.$el[0] !== this.$elProxy[0]) ? this.$elProxy[0] : undefined;
		},

		elementTooltip: function() {
			return this.$tooltip ? this.$tooltip[0] : undefined;
		},

		// public methods but for internal use only
		// getter if val is ommitted, setter otherwise
		option: function(o, val) {
			if (typeof val == 'undefined') return this.options[o];
			else {
				this.options[o] = val;
				return this;
			}
		},
		status: function() {
			return this.Status;
		}
	};

	$.fn[pluginName] = function () {

		// for using in closures
		var args = arguments;

		// if we are not in the context of jQuery wrapped HTML element(s) :
		// this happens when calling static methods in the form $.fn.tooltipster('methodName'), or when calling $(sel).tooltipster('methodName or options') where $(sel) does not match anything
		if (this.length === 0) {

			// if the first argument is a method name
			if (typeof args[0] === 'string') {

				var methodIsStatic = true;

				// list static methods here (usable by calling $.fn.tooltipster('methodName');)
				switch (args[0]) {

					case 'setDefaults':
						// change default options for all future instances
						$.extend(defaults, args[1]);
						break;

					default:
						methodIsStatic = false;
						break;
				}

				// $.fn.tooltipster('methodName') calls will return true
				if (methodIsStatic) return true;
				// $(sel).tooltipster('methodName') calls will return the list of objects event though it's empty because chaining should work on empty lists
				else return this;
			}
			// the first argument is undefined or an object of options : we are initalizing but there is no element matched by selector
			else {
				// still chainable : same as above
				return this;
			}
		}
		// this happens when calling $(sel).tooltipster('methodName or options') where $(sel) matches one or more elements
		else {

			// method calls
			if (typeof args[0] === 'string') {

				var v = '#*$~&';

				this.each(function() {

					// retrieve the namepaces of the tooltip(s) that exist on that element. We will interact with the first tooltip only.
					var ns = $(this).data('tooltipster-ns'),
						// self represents the instance of the first tooltipster plugin associated to the current HTML object of the loop
						self = ns ? $(this).data(ns[0]) : null;

					// if the current element holds a tooltipster instance
					if(self){

						if (typeof self[args[0]] === 'function') {
							// note : args[1] and args[2] may not be defined
							var resp = self[args[0]](args[1], args[2]);
						}
						else {
							throw new Error('Unknown method .tooltipster("' + args[0] + '")');
						}

						// if the function returned anything other than the instance itself (which implies chaining)
						if (resp !== self){
							v = resp;
							// return false to stop .each iteration on the first element matched by the selector
							return false;
						}
					}
					else {
						throw new Error('You called Tooltipster\'s "' + args[0] + '" method on an uninitialized element');
					}
				});

				return (v !== '#*$~&') ? v : this;
			}
			// first argument is undefined or an object : the tooltip is initializing
			else {

				var instances = [],
					// is there a defined value for the multiple option in the options object ?
					multipleIsSet = args[0] && typeof args[0].multiple !== 'undefined',
					// if the multople option is set to true, or if it's not defined but set to true in the defaults
					multiple = (multipleIsSet && args[0].multiple) || (!multipleIsSet && defaults.multiple);

				// initialize a tooltipster instance for each element if it doesn't already have one or if the multiple option is set, and attach the object to it
				this.each(function () {

					var go = false,
						ns = $(this).data('tooltipster-ns'),
						instance = null;

					if (!ns) {
						go = true;
					}
					else {
						if(multiple) go = true;
						else console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.');
					}

					if(go) {
						instance = new Plugin(this, args[0]);

						// save the reference of the new instance
						if (!ns) ns = [];
						ns.push(instance.namespace);
						$(this).data('tooltipster-ns', ns)

						// save the instance itself
						$(this).data(instance.namespace, instance);
					}

					instances.push(instance);
				});

				if(multiple) return instances;
				else return this;
			}
		}
	};

	// quick & dirty compare function (not bijective nor multidimensional)
	function areEqual(a,b) {
		var same = true;
		$.each(a, function(i, el){
			if(typeof b[i] === 'undefined' || a[i] !== b[i]){
				same = false;
				return false;
			}
		});
		return same;
	}

	// detect if this device can trigger touch events
	var deviceHasTouchCapability = !!('ontouchstart' in window);

	// we'll assume the device has no mouse until we detect any mouse movement
	var deviceHasMouse = false;
	$('body').one('mousemove', function() {
		deviceHasMouse = true;
	});

	function deviceIsPureTouch() {
		return (!deviceHasMouse && deviceHasTouchCapability);
	}

	// detecting support for CSS transitions
	function supportsTransitions() {
		var b = document.body || document.documentElement,
			s = b.style,
			p = 'transition';

		if(typeof s[p] == 'string') {return true; }

		v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
		p = p.charAt(0).toUpperCase() + p.substr(1);
		for(var i=0; i<v.length; i++) {
			if(typeof s[v[i] + p] == 'string') { return true; }
		}
		return false;
	}
})( jQuery, window, document );
(function() {
  var kisWidget;

  kisWidget = function() {
    return (function(d) {
      "use strict";
      var scriptTags, widgetScript;
      widgetScript = d.createElement("script");
      widgetScript.id = "unistats-widget-script";
      widgetScript.src = "//widget.unistats.ac.uk/js/unistats.widget.js";
      scriptTags = d.getElementsByTagName("script")[0];
      if (d.getElementById("unistats-widget-script")) {
        return;
      }
      return scriptTags.parentNode.insertBefore(widgetScript, scriptTags);
    })(document);
  };

  $(document).ready(function() {
    if ($(".kis-widget").length > 0) {
      return kisWidget();
    }
  });

}).call(this);

(function() {
  var initAccordion, resetSpinners;

  resetSpinners = function() {
    return $(".accordion-list-item").each(function(e) {
      var _li_item;
      _li_item = $(this);
      if (_li_item.hasClass("st-open")) {
        return _li_item.find(".st-arrow").rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
  };


  /*
      -------------------------------------------------------------
          initAccordion()
  
          Load accordion script and handle clicks
      -------------------------------------------------------------
   */

  initAccordion = function() {
    $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js"), $.Deferred(function(deferred) {
      return $(deferred.resolve);
    })).done(function() {
      return $("#st-accordion").accordion({
        oneOpenedItem: true
      });
    });
    $(".accordion-list-anchor").on("click", ".size-h4", function(event) {
      var accordion, circle, elem;
      event.preventDefault();
      circle = $(this).next(".st-arrow");
      accordion = $(this).parent().parent();
      elem = $(this).parent().next(".st-content");
      resetSpinners();
      if (!elem.is(":visible")) {
        return circle.rotate({
          animateTo: 135
        });
      } else {
        return circle.rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
    return $(".st-arrow").on("click", function(e) {
      var _icon, _st;
      e.preventDefault();
      resetSpinners();
      _icon = $(this);
      _st = $(this).parent().parent();
      if (!_st.hasClass("st-open")) {
        return _icon.rotate({
          animateTo: 135
        });
      } else {
        return _icon.rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
  };

  $(document).ready(function() {
    if ($(".accordion").length > 0) {
      return initAccordion();
    }
  });

}).call(this);

(function() {
  var initTabsAccordion;

  initTabsAccordion = function() {
    $(".tab_content").hide();
    $(".tab_content:first").show();
    $(".tab_drawer_heading").each(function(i) {
      var _tab_heading;
      _tab_heading = $(this);
      return _tab_heading.addClass("icon-plus");
    });
    $(".tab_drawer_heading").first().addClass("icon-minus");
    $("ul.tabs li").click(function() {
      var activeTab;
      $(".tab_content").hide();
      activeTab = $(this).attr("rel");
      $("#" + activeTab).show();
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");
      $(".tab_drawer_heading").removeClass("d_active");
      $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
    });
    return $(".tab_drawer_heading").click(function() {
      var d_activeTab;
      $(".tab_content").hide();
      d_activeTab = $(this).attr("rel");
      $("#" + d_activeTab).show();
      $(".tab_drawer_heading").removeClass("d_active icon-minus");
      $(this).addClass("d_active icon-minus");
      $("ul.tabs li").removeClass("active");
      $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
      $('html, body').animate({
        'scrollTop': $(this).offset().top
      }, 'fast', 'linear');
    });
  };

  $(document).ready(function() {
    if ($(".tabs-container").length > 0) {
      return initTabsAccordion();
    }
  });

}).call(this);

(function() {
  var initAudio;

  initAudio = function() {
    jQuery.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js", function() {
      $("audio").each(function() {
        return $(this).audioPlayer();
      });
    });
  };

  $(document).ready(function() {
    if ($("audio").length > 0) {
      return initAudio();
    }
  });

}).call(this);

(function() {
  var initCarousel;

  initCarousel = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js", function() {
      return $.each($(".js-carousel"), function() {
        var _controlsOpt, _itemMargin, _itemMinSlides, _itemWidth, _pagerOpt, _this, _wrapper;
        _this = $(this);
        _wrapper = _this.closest(".bx-wrapper");
        _itemWidth = (_this.data("carousel-item-width") > 0 ? _this.data("carousel-item-width") : 0);
        _itemMinSlides = (_this.data("carousel-min-slides") > 0 ? _this.data("carousel-min-slides") : 0);
        _itemMargin = (_this.data("carousel-item-margin") > 0 ? _this.data("carousel-item-margin") : 0);
        _controlsOpt = true;
        _controlsOpt = _this.data("controls");
        _pagerOpt = (_this.data("pager") ? _this.data("pager") : false);
        return _this.bxSlider({
          slideWidth: _itemWidth,
          minSlides: _itemMinSlides,
          maxSlides: 10,
          slideMargin: _itemMargin,
          moveSlides: 1,
          controls: _controlsOpt,
          captions: true,
          pager: _pagerOpt,
          onSliderLoad: function(currentIndex) {
            if (_this.data("counter")) {
              return $(_this).closest(".bx-wrapper").find(".bx-controls").prepend("<div class=\"bx-counter\"><span class=\"bx-index\">" + (currentIndex + 1) + "</span>/<span class=\"bx-total\">" + _this.getSlideCount() + "</span></div>");
            }
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            if (_this.data("counter")) {
              return $(_this).closest(".bx-wrapper").find(".bx-index").text(newIndex + 1);
            }
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".js-carousel").length > 0) {
      return initCarousel();
    }
  });

}).call(this);

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

(function() {
  var expCB;

  expCB = function() {
    $(".expanded-content").hide();
    $(".show-more").show();
    $(".show-more").click(function(e) {
      var _clicked;
      e.preventDefault();
      _clicked = $(this);
      _clicked.closest(".expandable-content").find(".expanded-content").slideDown();
      return _clicked.hide();
    });
    return $(".hide-content").click(function(e) {
      var parent, _clicked;
      e.preventDefault();
      _clicked = $(this);
      parent = _clicked.closest(".expandable-content");
      $(".expanded-content", parent).hide();
      $(parent).find(".show-more").show();
      return parent.scrollToMe();
    });
  };

  $(document).ready(function() {
    if ($(".expanded-content").length > 0) {
      return expCB();
    }
  });

}).call(this);

(function() {
  var initLightbox;

  initLightbox = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", function() {
      return $(".js-lightbox").each(function() {
        return $(this).magnificPopup({
          delegate: "a",
          type: "image",
          tLoading: "Loading image #%curr%...",
          mainClass: "mfp-img-mobile",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
          },
          image: {
            tError: "<a href=\"%url%\">The image #%curr%</a> could not be loaded."
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".js-lightbox").length > 0) {
      return initLightbox();
    }
  });

}).call(this);

(function() {
  var initOwlCarousel;

  initOwlCarousel = function() {
    jQuery.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/owl.carousel.js", function() {
      $(".owl-carousel").each(function() {
        $(this).owlCarousel({
          items: 3,
          itemsDesktop: [1280, 3],
          itemsTablet: [959, 2],
          itemsMobile: [599, 1],
          lazyLoad: true,
          pagination: false,
          navigation: true,
          navigationText: ["<i class='icon-left-open-big'></i>", "<i class='icon-right-open-big'></i>"]
        });
      });
      $(".owl-carousel").each(function() {
        var total_items;
        total_items = $(".item", this).length;
        $(".item-description", this).append(function(i) {
          return $("<span />", {
            text: i + 1 + " of " + total_items
          });
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".owl-carousel").length > 0) {
      return initOwlCarousel();
    }
  });

}).call(this);

(function() {
  var initSlider;

  initSlider = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js", function() {
      return $.each($(".royalSlider"), function() {
        var _itemAutoPlay, _itemHeight, _itemWidth, _this;
        _this = $(this);
        _itemWidth = (_this.data("slider-item-width") > 0 ? _this.data("slider-item-width") : 930);
        _itemHeight = (_this.data("slider-item-height") > 0 ? _this.data("slider-item-height") : 465);
        _itemAutoPlay = (_this.data("slider-auto-play") === true ? _this.data("slider-auto-play") : false);
        return _this.royalSlider({
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
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".royalSlider").length > 0) {
      return initSlider();
    }
  });

}).call(this);

(function() {
  var searchFilters;

  searchFilters = function() {
    return $(".filter-heading").click(function(event) {
      var c;
      event.preventDefault();
      c = $(this);
      if (!c.hasClass("not-active")) {
        if (c.parent().hasClass("active")) {
          return c.parent().removeClass("active");
        } else {
          return c.parent().addClass("active");
        }
      }
    });
  };

  $(document).ready(function() {
    if ($(".search-filters").length > 0) {
      return searchFilters();
    }
  });

}).call(this);

(function() {
  var searchFocusHighlight;

  searchFocusHighlight = function() {
    return $("#finder-search-input").focus(function() {
      return $("#finder-search-input").parent().parent().addClass("search-gray-border");
    });
  };

  $(document).ready(function() {
    if ($(".search-input-wrap").length > 0) {
      return searchFocusHighlight();
    }
  });

}).call(this);

(function() {
  var initFitVids;

  initFitVids = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js", function() {
      return $(".__media").fitVids();
    });
  };

  $(document).ready(function() {
    if ($(".__media").length > 0) {
      return initFitVids();
    }
  });

}).call(this);

(function() {
  var checkForVideo;

  checkForVideo = function() {
    return $.getScript("https://raw.github.com/johndyer/mediaelement/master/build/mediaelement-and-player.js", function() {
      return $("video").mediaelementplayer({
        pluginPath: "http://d27lwoqz7s24cy.cloudfront.net/assets/swf/"
      });
    });
  };

  $(document).ready(function() {
    if ($("video").length > 0) {
      return checkForVideo();
    }
  });

}).call(this);

(function() {
  var debugSwitch;

  debugSwitch = function() {
    $("#debug").hide();
    return $(".debug-toggle").click(function(e) {
      $("#debug").toggle();
      return e.preventDefault();
    });
  };

  $(document).ready(function() {
    return debugSwitch;
  });

}).call(this);

(function() {
  this.getEventsFeed = function(programme, type, feed_id, count) {
    var eventsTitleLength, getItemHTML, outputfeedHTML;
    if (programme == null) {
      programme = "University-wide";
    }
    if (type == null) {
      type = "";
    }
    if (feed_id == null) {
      feed_id = "";
    }
    if (count == null) {
      count = 6;
    }
    if (count === "") {
      count = 6;
    } else {
      count = parseInt(count, 10);
    }
    if (!(programme === "")) {
      programme = "?programme=" + programme;
    } else {
      programme = "?programme=University-wide";
    }
    if (!((type === "") || (type === "all"))) {
      type = "&eventtype=" + type;
    } else {
      type = "";
    }
    console.log("Output for Feed ID: " + feed_id);
    console.log("type is:" + type);
    console.log("count is: " + count);
    console.log("programme is: " + programme);
    eventsTitleLength = 100;
    getItemHTML = function(item) {
      var ev_date, ev_day, ev_month, ev_type, ev_year, event_title, itemHTML, parts;
      itemHTML = "";
      event_title = item.name;
      event_title = trimTitle(event_title, eventsTitleLength);
      ev_date = item.startdate;
      parts = ev_date.split("-", 3);
      ev_year = parts[0];
      ev_month = getMonthName(parts[1], "short");
      ev_day = parts[2];
      ev_date = ev_day + " " + ev_month + " " + ev_year;
      ev_type = item.type.replace("_", " ");
      return itemHTML += "<li> <div class=\"single-feed-container a\"> <a href=\"" + item.event_url + "\"> <div class=\"feed-image\"> <div class=\"center-cropped\" style=\"background-image: url(" + item.image_url + ")\"> <img src=\"" + item.image_url + "\"> </div> </div> <div class=\"title\"> <a href=\"" + item.event_url + "\" tite=\"" + item.name + "\">" + event_title + "<p class=\"date\">" + ev_date + ", " + ev_type + "</p></a> </div> </a> </div> </li>";
    };
    outputfeedHTML = function(feed_data) {
      var output;
      output = "<div class=\"feed-comp\"> <ul class=\"cf\">";
      $.each(feed_data, function(i, item) {
        if (i < count) {
          return output += getItemHTML(item);
        }
      });
      output += "</ul></div>";
      $(".events-feed-" + feed_id).html(output);
    };
    $.ajax({
      type: "GET",
      url: "http://ual.force.com/eventsfeed" + programme + type,
      dataType: "jsonp",
      success: function(feed_data) {
        return outputfeedHTML(feed_data);
      }
    });
    return true;
  };

  $(document).ready(function() {
    var feed_data;
    feed_data = {};
    if ($(".events-feed").length > 0) {
      return $.each($(".events-feed"), function() {});
    }
  });

}).call(this);

(function() {
  this.getNewsFeed = function(college, feed_id) {
    var blog_url, feed_url;
    feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&count=6&include=title,url,attachments";
    blog_url = "http://blogs.arts.ac.uk/" + college;
    return $.getJSON(feed_url, function(data) {
      var count, output;
      output = "<div class=\"feed-comp\"> <ul class=\"cf\">";
      count = 6;
      $.each(data.posts, function(i, item) {
        var length, news, short_title, title;
        if (i < count) {
          news = data.posts[i];
          length = 60;
          title = news.title;
          if (title.length > length) {
            short_title = title.substring(0, length) + "...";
          } else {
            short_title = title;
          }
          return output += "<li> <div class=\"feed-image\"> <div class=\"center-cropped\" style=\"background-image: url(" + news.attachments[0].url + ")\"> <img src=\"" + news.attachments[0].url + "\"> </div> </div> <div class=\"title\"> <a href=\"" + news.url + "\" tite=\"" + news.title + "\">" + short_title + "</a> </div> </li>";
        }
      });
      output += "</ul> <p class=\"view-all\"><a href=\"" + blog_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>";
      $(".news-feed-" + feed_id).html(output);
    });
  };

}).call(this);


/*
		-------------------------------------------------------------
				enableSelectBoxes()

				UAL formatting for select boxes
		-------------------------------------------------------------
 */

(function() {
  if ($(".select-box").length > 0) {
    $(".js-select-box").each(function() {
      var _start_val;
      _start_val = $(this).children("ul.js-select-box-list").children("li.select-box-option:first").children("a").html();
      $(this).children("div").children("h3.selected").html(_start_val);
      $("input.js-select-box-value").attr("value", $(this).children("ul.js-select-box-list").children("li.select-box-option:first").attr("data-sb-value"));
      $(this).children("div").children("h3.selected,div.select-box-arrow").click(function(event) {
        event.preventDefault();
        if ($(this).parent().parent().children("ul.js-select-box-list").css("display") === "none") {
          return $(this).parent().parent().children("ul.js-select-box-list").css("display", "block");
        } else {
          return $(this).parent().parent().children("ul.js-select-box-list").css("display", "none");
        }
      });
      return $(this).find("li.select-box-option").click(function(event) {
        event.preventDefault();
        $(this).parent().css("display", "none");
        $("input.js-select-box-value").attr("value", $(this).attr("data-sb-value"));
        return $(this).parent().parent().children("div").children("h3.selected").html($(this).children("a"));
      });
    });
  }

}).call(this);


/*
    -------------------------------------------------------------
       Enable caching of getScript calls
    -------------------------------------------------------------
 */

(function() {
  jQuery.ajaxSetup({
    cache: true
  });

}).call(this);


/*
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
 */

(function() {
  this.formatDateUAL = function() {
    return $(".date").each(function(i, element) {
      var str;
      str = $(this).text();
      if (str.indexOf(",") !== -1) {
        return $(this).text(str.substring(5, 16));
      }
    });
  };

  $(document).ready(function() {
    if ($(".date").length > 0) {
      return formatDateUAL();
    }
  });


  /*
      -------------------------------------------------------------
          getMonthName()
          returns the name of month as a string for a number is passed in to the function
  
          Eg.   getMonthName(4, "short")
  
          will return the string "Apr"
      -------------------------------------------------------------
   */

  this.getMonthName = function(month_number, format) {
    var longMonthsInYear, m, month_name, month_num, monthsOfYear, shortMonthsInYear;
    if (format == null) {
      format = "short";
    }
    month_name = '';
    monthsOfYear = [];
    shortMonthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    longMonthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    switch (format) {
      case "short":
        monthsOfYear = shortMonthsInYear;
        break;
      case "long":
        monthsOfYear = longMonthsInYear;
    }
    month_num = parseInt(month_number);
    if ((month_num > 0) && (month_num < 13)) {
      m = month_num - 1;
      return monthsOfYear[m];
    } else {
      return "";
    }
    return month_name;
  };

}).call(this);


/*
		-------------------------------------------------------------
			Javascript hasClass function - can use instead of jquery .hasClass

			Example use:

			JS:

			var element = document.getElementById('element');
			if ( hasClass(element, "class_one") ) {
					// Do stuff here
			}

			Coffeescript:

			element = document.getElementById("element")
			if hasClass(element, "class_one")
				console.log "do something here"
				console.log "do something else here"
		-------------------------------------------------------------
 */

(function() {
  this.hasClass = function(el, clss) {
    return el.className && new RegExp("(^|\\s)" + clss + "(\\s|$)").test(el.className);
  };

}).call(this);

(function() {
  this.imageCredits = function() {
    if ($("html").hasClass("desktop")) {
      $(".credits-btn").addClass("show ");
      return $(".show-credits").click(function(event) {
        var c;
        event.preventDefault();
        c = $(this);
        if (c.hasClass("active")) {
          c.removeClass("active").attr("title", "Show image credits");
          $("#image-credits-toggle").tooltipster("hide", function() {
            this.tooltipster("content", "Show image credits");
            return true;
          });
          return $(".credits").fadeOut();
        } else {
          c.addClass("active").attr("title", "Hide image credits");
          $("#image-credits-toggle").tooltipster("hide", function() {
            this.tooltipster("content", "Hide image credits");
            return true;
          });
          return $(".credits").fadeIn();
        }
      });
    }
  };

  $(document).ready(function() {
    if ($(".credits").length > 0) {
      return imageCredits();
    }
  });

}).call(this);


/*
    -------------------------------------------------------------
        trimTitle()

        will format a title (string) to max number of characters, specified

				returns a trimmed title with "..." added to the end
    -------------------------------------------------------------
 */

(function() {
  this.trimTitle = function(title, maxLength) {
    if (title.length > maxLength) {
      title = title.substring(0, maxLength) + "...";
    } else {
      title = title;
    }
    return title;
  };

}).call(this);


/*
		-------------------------------------------------------------
				checkWindowSize() function
					Adds width classes to <body> tag.
					Used for tablet, desktop, mobile styling
		-------------------------------------------------------------
 */

(function() {
  this.checkWindowSize = function() {
    var _grid_size, _html_tag, _width;
    _grid_size = "";
    _width = "";
    _html_tag = "";
    $('body').removeClass("gDesktop gTablet gMobile");
    _html_tag = $('html');
    _width = $(window).width();
    if (_width > 959) {
      _grid_size = "gDesktop";
    }
    if ((_width > 599) && (_width < 959)) {
      _grid_size = "gTablet";
    }
    if (_width < 599) {
      _grid_size = "gMobile";
    }
    return $('body').addClass(_grid_size);
  };


  /*
  		-------------------------------------------------------------
  				getWindowSize()
  
  					Returns the current window size that has been added
  					to the <body> tag
  
  					The function will return
  						"gDesktop", "gTablet" or "gMobile"
  
  					The function will return "gDesktop" by default,
  					if none of the classes above are added to the body class
  
  		-------------------------------------------------------------
   */

  this.getWindowSize = function() {
    var _body;
    _body = "";
    _body = $('body');
    if (_body.hasClass("gDesktop")) {
      return "gDesktop";
    } else if (_body.hasClass("gTablet")) {
      return "gTablet";
    } else if (_body.hasClass("gMobile")) {
      return "gMobile";
    } else {
      return "gDesktop";
    }
  };

  this.getDeviceType = function() {
    var _html;
    _html = "";
    _html = $('html');
    if (_html.hasClass("desktop")) {
      return "desktop";
    } else if (_html.hasClass("tablet")) {
      return "tablet";
    } else if (_html.hasClass("mobile")) {
      return "mobile";
    } else {
      return "desktop";
    }
  };

}).call(this);


/*
    -------------------------------------------------------------
        add indexOf support for IE8 compatibility

          Used to reformat dates within feeds
    -------------------------------------------------------------
 */

(function() {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
      var from, len;
      len = +this.length || 0;
      from = Number(arguments_[1]) || 0;
      from = (from < 0 ? Math.ceil(from) : Math.floor(from));
      if (from < 0) {
        from += len;
      }
      while (from < len) {
        if (from in this && this[from] === elt) {
          return from;
        }
        from++;
      }
      return -1;
    };
  }

}).call(this);

(function() {
  var getLCFJobsFeed;

  getLCFJobsFeed = function() {
    return $.getJSON("http://my.lcffirstmove.co.uk/jobs.json?callback=?", function(data) {
      var count, months, output;
      output = "<div class=\"table-container padded\"><table class=\"data-table\"><thead><tr><th>Title</th><th>Location</th><th>Salary</th><th>Closing date</th></tr></thead><tbody>";
      count = 10;
      months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      $.each(data, function(i, item) {
        var dt, job, job_date, old_salary, salary;
        if (i < count) {
          job = data[i];
          salary = "";
          old_salary = job.salary;
          if (old_salary === null) {
            salary = job.salary_range.description;
          } else {
            salary = old_salary;
          }
          job_date = job.closes_on;
          dt = new Date(job_date);
          output += "<tr>" + "<td><a href=\"http://my.lcffirstmove.co.uk/jobs/" + job.id + "\">" + job.job_title + "</a></td>" + "<td>" + job.region + "</td>" + "<td>" + salary + "</td>" + "<td>" + dt.getDate() + " " + months[dt.getMonth()] + "</td>" + "</tr>";
        }
      });
      output += "</tbody></table></div>";
      $("#lcf-jobs").html(output);
    });
  };

  $(document).ready(function() {
    if ($("#lcf-jobs").length > 0) {
      return getLCFJobsFeed();
    }
  });

}).call(this);


/*
		-------------------------------------------------------------
				Google maps
		-------------------------------------------------------------
 */

(function() {
  var markerIcons;

  markerIcons = {};

  this.addMarker = function(data, map, infoWindow) {
    var contentString, marker, _markerIcon;
    _markerIcon = data.marker;
    if (_markerIcon === "" || (_markerIcon == null)) {
      _markerIcon = "default_UAL";
    }
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lng),
      map: map,
      title: data.name,
      icon: markerIcons[_markerIcon]
    });
    contentString = "<h3>" + data.name + "</h3>" + "<p>" + data.content + "</p>";
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.open(map, marker);
      infoWindow.setContent(contentString);
    });
  };

  this.setupMarkerIcons = function(data) {
    var i, icon_name, _results, _this;
    _results = [];
    for (i in data) {
      _this = data[i];
      icon_name = _this.markerName;
      _results.push(markerIcons[icon_name] = {
        url: _this.url,
        scaledSize: new google.maps.Size(_this.scaledSize_x, _this.scaledSize_y),
        origin: new google.maps.Point(_this.origin_x, _this.origin_y),
        anchor: new google.maps.Point(_this.anchor_x, _this.anchor_y)
      });
    }
    return _results;
  };

  this.generateMapOptions = function(_device, initial_location) {
    var mapOptions;
    mapOptions = "";
    switch (_device) {
      case "desktop":
        mapOptions = {
          zoom: mapConfig.zoom,
          center: initial_location,
          mapTypeControl: false,
          streetViewControl: false
        };
        break;
      case "tablet":
        mapOptions = {
          zoom: mapConfig.zoom,
          center: initial_location,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          draggable: false,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
          },
          panControl: false,
          streetViewControl: false
        };
        break;
      case "mobile":
        mapOptions = {
          zoom: mapConfig.zoom,
          center: initial_location,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          panControl: false,
          draggable: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
          }
        };
        break;
      default:
        mapOptions = {
          zoom: mapConfig.zoom,
          center: initial_location,
          mapTypeControl: false,
          streetViewControl: false
        };
    }
    return mapOptions;
  };

  this.loadMap = function() {
    var bikeLayer, gJson, i, infoWindow, initialLocation, map, mapDiv, mapOptions, transitLayer, _device_type, _mapCanvas;
    gJson = [];
    initialLocation = {
      lat: mapConfig.initLat,
      lng: mapConfig.initLng
    };
    _device_type = getDeviceType();
    mapOptions = generateMapOptions(_device_type, initialLocation);
    mapDiv = document.getElementById("map-canvas");
    map = new google.maps.Map(mapDiv, mapOptions);
    infoWindow = new google.maps.InfoWindow({
      content: "",
      maxWidth: 400
    });
    _mapCanvas = $("#map-canvas");
    if (_mapCanvas.data("transit-layer") === true) {
      transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(map);
    }
    if (_mapCanvas.data("bicycling-layer") === true) {
      bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    }
    setupMarkerIcons(map_markers_json);
    for (i in maps_json) {
      addMarker(maps_json[i], map, infoWindow);
    }
  };

  this.loadMapsScript = function() {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBg6p9uTJZjUi3vqZWn07sriYpr5zV3_jg&sensor=false&" + "callback=loadMap";
    document.body.appendChild(script);
  };

}).call(this);


/*
		-------------------------------------------------------------
				.back-to-top
					Scroll to the top of the page
					when a link with .back-to-top class clicked

					On desktop the button will fade in when the user
					scrolls down the page
		-------------------------------------------------------------
 */

(function() {
  var backToTop, checkScrollPos;

  checkScrollPos = function() {
    if ($("html").hasClass("desktop")) {
      if ($(this).scrollTop() > 450) {
        return $(".back-to-top").fadeIn(200);
      } else {
        return $(".back-to-top").fadeOut(200);
      }
    }
  };

  backToTop = function() {
    $(window).scroll(checkScrollPos());
    return $("back-to-top").click(function(event) {
      event.preventDefault();
      return $("html, body").animate({
        scrollTop: 0
      }, 300);
    });
  };

  $(document).ready(function() {});

}).call(this);

(function() {
  var breadcrumbs;

  breadcrumbs = function() {
    $(".breadcrumbs").find("a").last().hide();
    return $(".browse-sc").find(".breadcrumbs").find("a:gt(4)").remove();
  };

  $(document).ready(function() {
    return breadcrumbs();
  });

}).call(this);

(function() {
  var formatMainNavDDCols;

  formatMainNavDDCols = function() {
    var Link_about, Link_about_1, Link_about_2, Link_alumni, Link_research, Link_student, Link_study_1, Link_study_2, Link_study_3;
    Link_study_1 = $(".study-nav").find("li").slice(7, 13);
    Link_study_2 = $(".study-nav").find("li").slice(13, 19);
    Link_study_3 = $(".study-nav").find("li").slice(19, 25);
    Link_study_1.remove();
    Link_study_2.remove();
    Link_study_3.remove();
    Link_research = $(".research-nav").find("li").slice(7, 13);
    Link_research.remove();
    Link_student = $(".student-nav").find("li").slice(7, 13);
    Link_student.remove();
    Link_alumni = $(".alumni-nav").find("li").slice(7, 13);
    Link_alumni.remove();
    Link_about = $(".about-nav").find("li").slice(7, 13);
    Link_about_1 = $(".about-nav").find("li").slice(13, 19);
    Link_about_2 = $(".about-nav").find("li").slice(19, 25);
    Link_about.remove();
    Link_about_1.remove();
    Link_about_2.remove();
    $(".study-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".study-nav .subnav-2").prepend(Link_study_1);
    $(".study-nav").append("<ul class=\"subnav-3 pad-top-6x region\">");
    $(".study-nav .subnav-3").prepend(Link_study_2);
    $(".study-nav").append("<ul class=\"subnav-4 pad-top-6x region\">");
    $(".study-nav .subnav-4").prepend(Link_study_3);
    $(".research-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".research-nav .subnav-2").prepend(Link_research);
    $(".student-nav").append("<ul class=\"subnav-2 region pad-top-6x region\">");
    $(".student-nav .subnav-2").prepend(Link_student);
    $(".alumni-nav").append("<ul class=\"subnav-2 region pad-top-6x region\">");
    $(".alumni-nav .subnav-2").prepend(Link_alumni);
    $(".about-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".about-nav .subnav-2").prepend(Link_about);
    $(".about-nav").append("<ul class=\"subnav-3 pad-top-6x region\">");
    $(".about-nav .subnav-3").prepend(Link_about_1);
    $(".about-nav").append("<ul class=\"subnav-4 pad-top-6x region\">");
    return $(".about-nav .subnav-4").prepend(Link_about_2);
  };

  $(document).ready(function() {
    return formatMainNavDDCols();
  });

}).call(this);

(function() {
  var buildMobileSidebar;

  buildMobileSidebar = function() {
    var _has_heading, _menuHtml, _mobMenuButton, _mobMenuContent, _no_of_li_items, _sb_lth, _sideBarTitle;
    _sb_lth = $(".sidebar").length;
    _has_heading = $(".sidebar").find(".menu-heading").length;
    if (_sb_lth > 0) {
      _no_of_li_items = $(".sidebar li").size();
      if (_no_of_li_items > 1) {
        _menuHtml = $(".sidebar").html();
        _sideBarTitle = $(".sidebar li").first();
        _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + "<a href=\"#\" class=\"show-mob-sidebar\"></a>";
        _mobMenuContent = void 0;
        if (_has_heading > 0) {
          _mobMenuContent = _mobMenuButton + _menuHtml;
        } else {
          _mobMenuContent = _menuHtml;
        }
        $(".content").first().prepend("<div id=\"mobile-sidebar\" class=\"mobile-sidebar d-hide\"></div>");
        $("#mobile-sidebar").html(_mobMenuContent);
        $(".show-mob-sidebar").click(function(e) {
          var _clicked;
          e.preventDefault();
          _clicked = $(this);
          if (_clicked.hasClass("active")) {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideUp();
            return _clicked.removeClass("active");
          } else {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideDown();
            return _clicked.addClass("active");
          }
        });
        if (_sideBarTitle.text().toLowerCase() === "in this section") {
          return $("#mobile-sidebar li").first().remove();
        } else {
          return $("#mobile-sidebar li a").first().text("College Homepage");
        }
      }
    }
  };

  $(document).ready(function() {
    return buildMobileSidebar();
  });

}).call(this);

(function() {


}).call(this);

(function() {
  this.skipToContent = function() {
    if ($(".page-title").length > 0) {
      $(".page-title").first().attr("id", "skip-to-here");
    } else {
      $(".content-wrapper").first().attr("id", "skip-to-here");
    }
    return true;
  };

}).call(this);

(function() {
  var shortCourseFilters;

  shortCourseFilters = function() {
    if ($("#container").length > 0) {
      $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js"), $.Deferred(function(deferred) {
        $(deferred.resolve);
      })).done(function() {
        $(function() {
          var container, destroyPagination, pagination, setPagination;
          setPagination = function() {
            pagination.jPages({
              containerID: "container",
              perPage: 24,
              midRange: 1,
              previous: "←",
              next: "→",
              direction: "auto",
              animation: "fadeInUp"
            });
          };
          destroyPagination = function() {
            pagination.jPages("destroy");
          };
          container = $("#container");
          pagination = $("#pagination");
          setPagination();
          $.filtrify("container", "placeHolder", {
            block: "data-original",
            callback: function() {
              destroyPagination();
              setPagination();
            }
          });
        });
      });
      if (!$("html").hasClass("desktop")) {
        $("#placeHolder").prependTo(".content");
      }
    }
  };

  $(document).ready(function() {
    if ($("#container").length > 0) {
      return shortCourseFilters();
    }
  });

}).call(this);

(function() {
  var showtimeJSONloader;

  showtimeJSONloader = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", function() {
      var outputNode;
      outputNode = $(".showtime-json");
      return $.each(outputNode, function(i) {
        var feedUrl, limit, _node;
        _node = "";
        _node = $(this);
        feedUrl = _node.data("url");
        limit = _node.data("limit");
        return $.getJSON(feedUrl + "&limit=" + limit + "&callback=?", function(data) {
          var counter, media, profileUrl, string, studentName;
          string = "";
          media = "";
          studentName = "";
          profileUrl = "";
          counter = 0;
          if (data.data.Student) {
            profileUrl = data.data.Student.Student.profileurl;
            studentName = data.data.Student.Student.firstName + " " + data.data.Student.Student.lastName;
            media = data.data.Student.Media;
          }
          if (data.data.Profiles) {
            media = data.data.Profiles;
          }
          $.each(media, function(i, item) {
            var profileImg;
            if (counter < limit) {
              profileImg = item.thumb.split("gallery");
              item.profileImg = profileImg[0] + "profile.jpg";
              item.zoomImg = profileImg[0] + "screen.jpg";
              if (item.profileName) {
                profileUrl = "http://showtime.arts.ac.uk/" + item.profileName;
                studentName = item.fullName;
              }
              string = "<li><a class=\"zoom no-border\" href= \"" + item.zoomImg + "\" title=\"" + studentName + "\" data-profile-url=\"" + profileUrl + "\" style=\"background-image: url(" + item.profileImg + ")\"></a></li>";
              _node.append(string);
              return counter++;
            } else {
              return false;
            }
          });
          return $(".zoom").magnificPopup({
            type: "image",
            image: {
              titleSrc: function(item) {
                return item.el.attr("title") + " - <a class=\"no-border\" href=\"" + item.el.data("profile-url") + "\">View profile</a>";
              }
            },
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1]
            }
          });
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".showtime-json").length > 0) {
      return showtimeJSONloader();
    }
  });

}).call(this);

(function() {
  $(document).ready(function() {
    if ($(".credits").length > 0) {
      $(".credits-btn").tooltipster({
        position: 'left',
        theme: 'tooltipster-light',
        trigger: 'hover',
        delay: 100,
        speed: 300,
        animation: "fade"
      });
    }
    return $("#tipp").tooltipster({
      position: 'left',
      trigger: 'hover',
      delay: 100,
      speed: 300,
      animation: "fade"
    });
  });

}).call(this);


/*
    -------------------------------------------------------------
        Blockquotes:
          If there are blockquotes or pull-quotes on the page,
          add a <span> to the top of the element
    -------------------------------------------------------------
 */

(function() {
  if ($("blockquote").length > 0) {
    $("blockquote").each(function() {
      return $(this).prepend('<span></span>');
    });
  }

  if ($(".pull-quote").length > 0) {
    $(".pull-quote").each(function() {
      return $(this).prepend('<span></span>');
    });
  }

}).call(this);

(function() {
  var externalLinks;

  externalLinks = function() {
    jQuery.expr[":"].external = function(obj) {
      return obj.hostname !== location.hostname;
    };
    return $(".l-content a:external.button-link, aside a:external").addClass("external").each(function() {
      return $(this).attr("title", $(this).attr("title") + "(external link)");
    });
  };

  $(document).ready(function() {
    return externalLinks();
  });

}).call(this);

(function() {
  $("aside li a[href$=\".pdf\"], .l-content li a[href$=\".pdf\"]").parent().addClass("no-bullet");

  $("aside li a[href$=\".doc\"], .l-content li a[href$=\".doc\"]").parent().addClass("no-bullet");

}).call(this);

(function() {
  var typographyMods;

  typographyMods = function() {
    return $(".lcf").find("h2").wrapInner("<span />");
  };

  $(document).ready(function() {
    return typographyMods();
  });

}).call(this);

(function() {
  $(document).ready(function() {
    checkWindowSize();
    skipToContent();
    return ualDropdownBtn();
  });

}).call(this);

(function() {
  $(window).load(function() {
    if ($(".related-content").length > 0) {
      $(".related-content ul li").fitHeights();
    }
    if ($(".highlight-box-3").length > 0) {
      $(".highlight-box-3 ul li").fitHeights();
    }
    if ($("body").is(".chelsea, .camberwell, .wimbledon")) {
      $(".two-up ul li").fitHeights();
      $(".three-up ul li").fitHeights();
    }
    if ($("body").is(".ual")) {
      $(".cta .two-up-full ul li").fitHeights();
      $(".st-cp .two-up-full ul li").fitHeights();
      $(".news .four-up-full ul li").fitHeights();
      $(".fe .four-up-full ul li").fitHeights();
    }
    if ($(".__gallery").length > 0) {
      $(".__gallery").each(function() {
        return $(this).find("li").fitHeights();
      });
    }
    if ($("#map-canvas").length > 0) {
      return loadMapsScript();
    }
  });

}).call(this);

(function() {
  $(window).resize(function() {
    clearTimeout($.data(this, "resizeTimer"));
    $.data(this, "resizeTimer", setTimeout(function() {
      checkWindowSize();
      imageCredits();
    }, 200));
  });

}).call(this);
