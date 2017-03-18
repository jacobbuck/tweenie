# tweensy

A tiny tweening libary using `requestAnimationFrame`.

## Usage

```js
import cubicOut from 'eases/cubic-out';
import tween from 'tweensy';

// Create and start a tween
const mytween = tween({
  from: 100,
  to: 300,
  duration: 1000,
  easing: cubicOut,
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
