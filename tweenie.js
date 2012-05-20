/*!
 * Tweenie - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/tweenie.js
 * Licensed under the terms of the MIT license.
 */
window.tweenie = function (window) {
	
	var request_frame = function () { // requestAnimationFrame polyfill - adapted from https://gist.github.com/1579671
			var lastTime = 0,
				vendors = ["r", "msR", "mozR", "webkitR", "oR"];
			for (var i = 0, val; val = vendors[i]+"equestAnimationFrame", i < vendors.length; i++)
				if (val in window) return window[val];
			return function (callback, element) {
				var currTime = +new Date(),
					timeToCall = Math.max(0, 16 - (currTime - lastTime)),
					id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		} (),
		queue = [],
		render_queue = function (time) {
			for (var i = 0; i < queue.length; i++)
				queue[i](time);
			queue.length && request_frame(render_queue);
		},
		add_queue = function (fn) {
			queue.push(fn) === 1 && request_frame(render_queue);
		},
		rem_queue = function (fn) {
			for (var i = 0; i < queue.length; i++)
				fn === queue[i] && queue.splice(i, 1);
		},
		empty_queue = function () {
			queue = [];
		},
		tweenie =  function (duration, fn, from, to, complete, easing) {
			var start,
				stop,
				easing = easing || function (t) { return Math.sin(t * Math.PI / 2); },
				run = function (time) {
					start = start || time;
					fn((easing((stop || time > start + duration ? 1 : (time - start) / duration)) * (to - from)) + from);
					if (stop || time > start + duration) {
						rem_queue(run);
						complete && complete();
					}
				};
			add_queue(run);
			return {
				stop : function () { stop = 1; }
			};
		};
	
	tweenie.kill = empty_queue;
	
	return tweenie;
	
} (window);