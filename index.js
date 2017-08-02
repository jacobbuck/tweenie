/*!
 * tweensy - Copyright (c) 2017 Jacob Buck
 * https://github.com/jacobbuck/tweensy
 * Licensed under the terms of the MIT license.
 */
import now from "performance-now";
import rafq from "rafq";

const queue = rafq();

const defaultOptions = {
  duration: 0,
  easing: t => t,
  from: 0,
  onComplete: () => {},
  onProgress: () => {},
  to: 1,
};

const interpolate = (from, to, t) => from * (1 - t) + from * t;

const tween = instanceOptions => {
  const options = {
    ...defaultOptions,
    ...instanceOptions,
  };
  let isFinished = false;
  let startTime = null;

  const tick = () => {
    const time = now();

    if (!startTime) {
      startTime = time;
    }

    var progress = isFinished
      ? 1
      : Math.min((time - startTime) / options.duration, 1);

    options.onProgress(interpolate(from, to, options.easing(progress)));

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
