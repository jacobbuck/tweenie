# tweensy

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
	onProgress: (val) => {
		thing.style.top = `${val}px`;
	},
	onComplete: () => {
		console.log('All done!');
	},
})

// Stop a Tween
mytween();

// Stop and finish a Tween
mytween(true);
```
