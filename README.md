Tweenie
-------
A small (0.8 KB gzipped) tweening libary using the [requestAnimationFrame](http://webstuff.nfshost.com/anim-timing/Overview.html) standard.

### Usage

``` js
// Create a new instance of Tweenie
var tweenie = new Tweenie();

// Create a new Tween
var mytween = tweenie.tween(
	1000, // duration
	100, // start
	300, // end
	function ( position ) { // do something at position
		thing.style.top = position + 'px';
	},
	function () { // do something on completion (optional)
		console.log('done');
	},
	function (t, b, c, d) { return fancy math equation; } // easing equation (optional)
);

// Start a Tween
mytween.start();

// Stop a Tween
mytween.stop();

// Stop and finish a Tween
mytween.stop( true );

// Start all Tweens in Tweenie instance
tweenie.start();

// Stop all Tweens in Tweenie instance
tweenie.stop();

// Stop and finish all Tweens in Tweenie instance
tweenie.stop( true );
```

### Chaining

Tweenie has method chaining for both Tweenie and Tween instances. Eg:

``` js
tweenie.stop().tween( ... ).start();
```

### Browser support

Will run on all [Grade A browsers](http://yuilibrary.com/yui/environments/).

### Inspired by

[Émile](https://github.com/madrobby/emile/) by Thomas Fuchs, [Morpheus](https://github.com/ded/morpheus/) by Dustin Diaz, and [this blog post](http://paulirish.com/2011/requestanimationframe-for-smart-animating/) by Paul Irish.