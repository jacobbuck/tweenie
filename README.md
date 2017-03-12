# Tweenie

A tiny tweening libary using `requestAnimationFrame`.

## Usage

```js
import tween from 'tweenie';

// Create a new Tween
const mytween = tween({
	from: 100,
	to: 300,
	duration: 1000,
	easing: (t, b, c, d) => c*((t=t/d-1)*t*t + 1) + b, // cubic easing out
	progress: (val) => {
		thing.style.top = `${val}px`;
	},
	begin: () => {
		console.log('Getting started…');
	},
	complete: () => {
		console.log('All done!');
	},
})

// Stop a Tween
mytween.stop();

// Stop and finish a Tween
mytween.stop(true);
```
