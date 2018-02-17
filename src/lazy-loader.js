"use strict";
/*

Author: Joey Grable
Version: 1.0.0
GIT: https://github.com/joeygrable94/LazyLoader.git

A simple lazy loader javascript library to enhance the webpage loading performance.

*/
(function(global, jQuery, undefined) {
	// constants
	const $window = $(window);
	// set up LazyLoader function constructor
	let LazyLoader = function() {
		// gather elements to lazy load
		let elements = $("[data-lazy]");
		// return a new LazyLoader object that initializes the passed elements
		return new LazyLoader.init(elements);
	}
	// LazyLoader object initialization function
	LazyLoader.init = function(elements) {
		// setup $LL vars
		let self = this;
			self.elements = elements;
			self.interval = 250;
			self.throttle = false;
		// fire lazy-loader immediately to force visible images to display
		self.maybeLoad(self.elements);
		// check for load on throttled scroll event
		$window.on("scroll", function() {
			// if throttle waiting, return (await next interval)
			if (self.throttle === true) { return; }
			// check throttle every interval
			self.throttle = setTimeout(function() {
				// fire maybeLoad
				self.maybeLoad(elements);
				// after interval period resst throttle
				self.throttle = false;
			// pass interval to timeout
			}, self.interval);
		});
	};
	// LazyLoader prototype methods
	LazyLoader.prototype = {
		// determine if elm is in the viewport
		inView: function(item) {
			// check item window location
			// b/w 300px above the top fold
			// and to 600px below bottom fold
			let $item = $(item),
				view_top = $window.scrollTop() - 300,
				view_bottom = view_top + $window.height() + 600,
				height = $item.height(),
				_top = $item.offset().top,
				_bottom = _top + height;
			// return boolean of if item in view
			return height > 0 && _top <= view_bottom && _bottom >= view_top;
		},
		// maybe load an array of items
		maybeLoad: function(items) {
			// setup vars
			let self = this,
				didItemsLoad = false;
			// check each item in items array
			items.each(function(index, elm) {
				// if has lazy data attr and is in the window view
				if (elm.hasAttribute("data-lazy") && self.inView(elm)) {
					// add an visible class to the elm to indicate it is now visible
					$(elm).addClass("visible");
					// get the src of the file from the attr['data-lazy']
					elm.src = elm.getAttribute("data-lazy");
					// remove attr['data-lazy'] so this elm doesn't get repopulated in the elements array
					elm.removeAttribute("data-lazy");
					// if lazy loaded item
					didItemsLoad = true;
				}
			});
			// repopulate our elements array by rechecking the DOM for elements still with attr['data-lazy']
			if (didItemsLoad) { this.elements = $("[data-lazy]"); }
		}
	}
	// Initialize the LazyLoader object methods
	// any objects created with this function
	LazyLoader.init.prototype = LazyLoader.prototype;
	// create "$LL" alias in the global object
	// used as shorthand for the LazyLoader object
	global.TextLines = global.$LL = LazyLoader;
// run IIFE, pass it the window object and the jQuery object
}(window, jQuery, undefined));