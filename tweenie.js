/*!
 * tweenie.js - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/tweenie.js
 * Licensed under the terms of the MIT license.
 * special thanks to: ded && madrobby && paulirish
 */
! function (document, window, queue) {
		
	function render (time) {
		for (var i = 0; i < queue.length; i++)
			queue[i](time);
		queue.length && requestAnimationFrame(render);
	}
	
	function add_queue (fn) {
		queue.push(fn) === 1 && requestAnimationFrame(render);
	}
	
	function rem_queue (fn) {
		for (var i = 0; i < queue.length; i++)
			fn === queue[i] && queue.splice(i, 1);
	}
	
	window.tweenie = function (duration, fn, from, to, complete, easing) {
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
			stop : function () {
				stop = 1;
			}
		};
	}
	
} (document, window, []);