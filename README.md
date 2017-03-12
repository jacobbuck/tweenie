# tweensy

A tiny tweening libary using `requestAnimationFrame`.

## Usage

```js
import tween from 'tweensy';

// Create and start a tween
const mytween = tween({
  from: 100,
  to: 300,
  duration: 1000,
  easing: (t, b, c, d) => c*((t=t/d-1)*t*t + 1) + b, // cubic easing out
  onProgress: (val) => {
    thing.style.top = `${val.toFixed()}px`;
  },
  onComplete: () => {
    console.log('All done!');
  },
})

// Stop a tween
mytween();

// Stop and finish a tween
mytween(true);
```
