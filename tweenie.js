/*!
 * Tweenie - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/tweenie.js
 * Licensed under the terms of the MIT license.
 */
window.tweenie = function ( window ) {
		
	var endall,
		queue = [],
		request_frame = function () { // requestAnimationFrame polyfill - adapted from https://gist.github.com/1579671
			var lastTime = 0,
				vendors = ['r', 'msR', 'mozR', 'webkitR', 'oR'],
				i = 0,
				val;
			for ( ; val = vendors[i] + 'equestAnimationFrame', i < vendors.length; i++ )
				if ( val in window ) return window[ val ];
			return function ( callback, element ) {
				var currTime = +new Date(),
					timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ),
					id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
				lastTime = currTime + timeToCall;
				return id;
			};
		} ();
	
	function render ( time ) {
		for ( var i = 0; i < queue.length; i++ )
			queue[ i ]( time );
		queue.length && request_frame( render );
	}
	
	function add ( fn ) {
		1 === queue.push( fn ) && request_frame( render );
	}
	
	function remove ( fn ) {
		for ( var i = 0; i < queue.length; i++ )
			fn === queue[ i ] && queue.splice( i, 1 );
		if ( ! queue.length )
			endall = 0;
	}
	
	function tweenie ( duration, step, from, to, callback, easing ) {
		var start,
			end,
			easing = easing || function (t,b,c,d) { return c * Math.sin(t/d * (Math.PI/2)) + b; }, // sine ease out
			run = function ( time ) {
				end = end || endall;
				start = start || time;
				step( end || time > start + duration ? to : easing( time - start, 0, 1, duration ) * ( to - from ) + from );
				if ( end || time > start + duration )
					remove( run ) || callback && callback();
			};
		add( run );
		return {
			end : function () { end = 1; }
		};
	}
	
	tweenie.end = function () {
		endall = 1;	
	}
	
	tweenie.kill = function () {
		queue = [];
	}
	
	return tweenie;
	
} ( this );