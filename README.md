Tweenie
-------
a small (0.3 KB gzipped) tweening libary using the [requestAnimationFrame](http://webstuff.nfshost.com/anim-timing/Overview.html) standard.

### Usage

``` js
var tween = tweenie(
	1000, // duration
	function (position) { // do something at position
		thing.style.top = position + "px";
	},
	100, // start (optional)
	300, // end (optional)
	function () { // do something on completion (optional)
		console.log("done");
	},
	easings.bounce // easing function (https://github.com/ded/morpheus/blob/master/src/easings.js) (optional)
);
// stop and jump to the end of a tween
tween.stop();
```

### Browser support

Will run on all [Grade A browsers](http://yuilibrary.com/yui/docs/tutorials/gbs/) with a [requestAnimationFrame polyfill](https://gist.github.com/1579671).

### Special thanks to

* [Dustin Diaz](https://github.com/ded/morpheus/)
* [Thomas Fuchs](https://github.com/madrobby/emile/)
* [Paul Irish](http://paulirish.com/2011/requestanimationframe-for-smart-animating/)