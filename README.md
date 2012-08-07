Tweenie
-------
A small (0.4 KB gzipped) tweening libary using the [requestAnimationFrame](http://webstuff.nfshost.com/anim-timing/Overview.html) standard.

### Usage

``` js
var mytween = tweenie(
	1000, // duration
	function ( position ) { // do something at position
		thing.style.top = position + "px";
	},
	100, // start
	300, // end
	function () { // do something on completion (optional)
		console.log('done');
	},
	function (t, b, c, d) { return fancy math equation; } // easing equation (optional)
);
// stop and end a tween
mytween.end();

// stop and end all existing tweens
tweenie.end();

// kill (stop but not end) all existing tweens
tweenie.kill();
```

### Browser support

Will run on all [Grade A browsers](http://yuilibrary.com/yui/docs/tutorials/gbs/).

### Inspired by

[Émile](https://github.com/madrobby/emile/) by Thomas Fuchs, [Morpheus](https://github.com/ded/morpheus/) by Dustin Diaz, and [this blog post](http://paulirish.com/2011/requestanimationframe-for-smart-animating/) by Paul Irish.