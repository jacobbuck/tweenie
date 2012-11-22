/*!
 * Tweenie.js - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/Tweenie.js
 * Licensed under the terms of the MIT license.
 */
(function( window ){

	// requestAnimationFrame polyfill by Erik Möller with fixes from Paul Irish and Tino Zijdel
	// modified by Jacob Buck for Tweenie.js
	var lastTime = 0,
		requestAnimationFrame = window.requestAnimationFrame,
		vendors = [ 'ms', 'moz', 'webkit', 'o' ],
		i = 0;
	for ( ; i < vendors.length && ! requestAnimationFrame; i++ ) {
		requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
	}
	if ( ! requestAnimationFrame ) {
		requestAnimationFrame = function( callback, element ){
			var currTime = Date.now(),
				timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ),
				id = window.setTimeout( 
					function(){ callback( currTime + timeToCall ); },
					timeToCall
				);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	// Stack Object
	var Stack = function(){
		this.items = [];
		this.add = function( fn ){
			this.items.push( fn );
			return this.tick();
		};
		this.remove = function( fn ){
			for ( var i = 0; i < this.items.length; i++ )
				if ( fn === this.items[ i ] )
					this.items.splice( i, 1 );
			return this;
		};
		this.step = function( time ){
			if ( this.items.length < 1 )
				return this;
			for ( var i = 0, item; item = this.items[ i ], i < this.items.length; i++ ) {
				item.step( time );
				if ( item.pause ) 
					this.remove( item );
			}
		};
		this.tick = function () {
			if ( this.items.length > 0 ) {
				var self = this;
				requestAnimationFrame(function( time ){ 
					self.step( time )
					self.tick();
				});
			}
			return this;
		};
		this.stop = function ( finish ) {
			for ( var i = 0; i < this.items.length; i++ )
				this.queue[ i ].stop( finish );
			return this;
		};
		return this;
	};

	// Tween Object
	var Tween = function( options, parent ){
		this.options = options;
		this.parent  = parent;
		this.start = function(){
			parent.stack.remove( this ).add( this );
			return this;
		};
		this.step = function( time ){
			this.started = this.started || time;
			if ( time > this.started + this.options.duration )
				this.finish = this.pause = true;
			this.options.step.call( this, this.finish ? this.options.to : this.options.easing( time - this.started, 0, 1, this.options.duration ) * ( this.options.to - this.options.from ) + this.options.from );
			if ( this.finish && this.options.callback )
				this.options.callback.call( this );
			return this;
		};
		this.stop = function( finish ){
			this.finish = !!finish;
			this.pause  = 1;
			return this;
		};
		this.reset = function( finish ){
			this.started = this.finish = this.pause = 0;
			return this;
		};
		return this;
	};

	// Tweenie Object
	var Tweenie = function(){
		this.stack = new Stack();
		this.tween = function( duration, from, to, step, callback, easing ){
			return new Tween( {
				duration : duration,
				from : from,
				to : to,
				step : step,
				callback : callback,
				easing: easing || function (t,b,c,d) { return c * Math.sin(t/d * (Math.PI/2)) + b; }
			}, this );
		}
		this.stop = function( finish ){
			stack.stop( finish );
			return this;
		};
	};

	// Tweenie Object Global 
	window.Tweenie = Tweenie;

}( this ));