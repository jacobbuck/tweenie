/*!
 * tweensy - Copyright (c) 2017 Jacob Buck
 * https://github.com/jacobbuck/tweensy
 * Licensed under the terms of the MIT license.
 */
import now from "performance-now";
import rafq from "rafq";

const queue = rafq();

const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;

const tween = options => {
  const {
    duration = 0,
    easing = t => t,
    from,
    onComplete = () => {},
    onProgress = () => {},
    to,
  } = options;

  let isFinished = false;
  let startTime = null;

  const tick = () => {
    const time = now();

    if (startTime === null) {
      startTime = time;
    }

    const progress = isFinished
      ? 1
      : Math.min((time - startTime) / options.duration, 1);

    const t = options.easing(progress);

    if (typeof from === "number") {
      options.onProgress(lerp(from, to, t));
    } else if (Array.isArray(from)) {
      options.onProgress(from.map((v, i) => lerp(v, to[i], t)));
    } else {
      options.onProgress(
        Object.keys(from).reduce((memo, i) => {
          memo[key] = lerp(from[i], to[i], t);
          return memo;
        }, {})
      );
    }

    if (progress === 1) {
      options.onComplete(time);
    } else {
      queue.add(tick);
    }
  };

  const stop = finish => {
    isFinished = true;

    if (!finish) {
      queue.remove(tick);
    }
  };

  tick();

  return stop;
};
