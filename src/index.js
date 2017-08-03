/*!
 * tweensy - Copyright (c) 2017 Jacob Buck
 * https://github.com/jacobbuck/tweensy
 * Licensed under the terms of the MIT license.
 */
import now from "performance-now";
import rafq from "rafq";

const queue = rafq();

const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;

const createInterpolate = (v0, v1) => {
  if (typeof v0 === "number") {
    return t => lerp(v0, v1, t);
  } else if (Array.isArray(v0)) {
    return t => v0.map((v, i) => lerp(v, v1[i], t));
  } else if (typeof v0 === "object") {
    const keys = Object.keys(v0);
    return t =>
      keys.reduce((memo, i) => {
        memo[i] = lerp(v0[i], v1[i], t);
        return memo;
      }, {});
  }
};

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

  const interpolate = createInterpolate(from, to);

  const tick = () => {
    const time = now();

    if (startTime === null) {
      startTime = time;
    }

    const progress = isFinished
      ? 1
      : Math.min((time - startTime) / options.duration, 1);

    options.onProgress(interpolate(options.easing(progress)));

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
