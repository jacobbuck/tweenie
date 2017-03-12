/*!
 * tweensy - Copyright (c) 2017 Jacob Buck
 * https://github.com/jacobbuck/tweensy
 * Licensed under the terms of the MIT license.
 */
'use strict';

var assign = require('lodash/assign');
var rafq = require('rafq')();

var defaultOptions = {
  duration: 0,
  easing: function(t, b, c, d) { return c * t / d + b; },
  from: 0,
  onComplete: function() {},
  onProgress: function() {},
  to: 1,
};

module.exports = function tween(instanceOptions) {
  var options = assign({}, defaultOptions, instanceOptions);
  var isFinished = false;
  var startTime = null;

  function tick(time) {
    if (!startTime) {
      startTime = time;
    }

    if (time > startTime + options.duration) {
      isFinished = true;
    }

    options.onProgress(
      isFinished ?
      options.to :
      options.easing(time - startTime, 0, 1, options.duration) * (options.to - options.from) + options.from
    );

    if (isFinished) {
      options.onComplete(time);
    } else {
      rafq.add(tick);
    }
  }

  function stop(finish) {
    isFinished = true;
    if (!finish) {
      rafq.remove(tick);
    }
  }

  rafq.add(tick);

  return stop;
};
