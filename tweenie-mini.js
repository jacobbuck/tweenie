/*!
 * Tweenie - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/tweenie.js
 * Licensed under the terms of the MIT license.
 */
window.tweenie = function () {
	
	var request_frame = window.requestAnimationFrame,
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
		tweenie = function (duration, fn, from, to, complete, easing) {
			var start,
				stop,
				easing = easing || function (t,b,c,d) { return c * Math.sin(t/d * (Math.PI/2)) + b; }, // sine ease out
				run = function (time) {
					start = start || time;
					fn(stop || time > start + duration ? to : easing(time - start, 0, 1, duration) * (to - from) + from);
					if (stop || time > start + duration)
						rem_queue(run) || complete && complete();
				};
			add_queue(run);
			return {
				stop : function () { stop = 1; }
			};
		};
	
	tweenie.kill = empty_queue;
	
	return tweenie;
	
} ();