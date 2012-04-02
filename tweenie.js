/*!
 * tweenie.js - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/tweenie.js
 * Licensed under the terms of the MIT license.
 * special thanks to: ded && madrobby && paulirish
 */
! function (document, window) {
	
	var queue = [];
	
	function render (t) {
		for (var i = 0; i < queue.length; i++)
			queue[i](t);
		queue.length && requestAnimationFrame(render);
	}
	
	function add_queue (f) {
		queue.push(f) === 1 && requestAnimationFrame(render);
	}
	
	function rem_queue (f) {
		for (var i = 0; i < queue.length; i++)
			f === queue[i] && queue.splice(i, 1);
	}
	
	window.tweenie = function (duration, fn, from, to, complete, easing) {
		var me = this,
			start = +new Date(),
			finish = start + duration,
			stop = 0,
			from = from || 0,
			to = to || 1,
			easing = easing || function (t) { return Math.sin(t * Math.PI / 2); },
			run = function (time) {
				fn((easing((stop || time > finish ? 1 : (time - start) / duration)) * (to - from)) + from);
				if (stop || time > finish) {
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
	
} (document, window);