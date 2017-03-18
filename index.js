/*!
 * tweensy - Copyright (c) 2017 Jacob Buck
 * https://github.com/jacobbuck/tweensy
 * Licensed under the terms of the MIT license.
 */
'use strict';

var assign = require('lodash/assign');
var now = require('performance-now');
var rafq = require('rafq')();

var defaultOptions = {
  duration: 0,
  easing: function linear(t) { return t; },
  from: 0,
  onComplete: function() {},
  onProgress: function() {},
  to: 1
};

module.exports = function tween(instanceOptions) {
  var options = assign({}, defaultOptions, instanceOptions);
  var isFinished = false;
  var startTime = null;

  function tick() {
    var time = now();

    if (!startTime) {
      startTime = time;
    }

    var progress = (time - startTime) / options.duration;

    if (progress === 1) {
      isFinished = true;
    }

    options.onProgress(options.easing(progress) * (options.to - options.from) + options.from);

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

  tick();

  return stop;
};
