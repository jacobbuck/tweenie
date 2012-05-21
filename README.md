Tweenie
-------
A small (0.4 KB gzipped) tweening libary using the [requestAnimationFrame](http://webstuff.nfshost.com/anim-timing/Overview.html) standard.

### Usage

``` js
var tween = tweenie(
	1000, // duration
	function (position) { // do something at position
		thing.style.top = position + "px";
	},
	100, // start
	300, // end
	function () { // do something on completion (optional)
		console.log("done");
	},
	function (t,b,c,d) { return fancy math equation; } // easing function (optional)
);
// stop and end a tween
tween.stop();

// kill all existing tweens
tweenie.kill();
```

### Browser support

Will run on all [Grade A browsers](http://yuilibrary.com/yui/docs/tutorials/gbs/).

### tweenie-mini.js

A slighty smaller version for when you're already using a [requestAnimationFrame polyfill](https://gist.github.com/1579671) in your project.

### Inspired by

[Morpheus](https://github.com/ded/morpheus/) by Dustin Diaz, [Émile](https://github.com/madrobby/emile/) by Thomas Fuchs, and [this blog post](http://paulirish.com/2011/requestanimationframe-for-smart-animating/) by Paul Irish.