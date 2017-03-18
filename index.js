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
  loop: 1,
  onComplete: function() {},
  onProgress: function() {},
  to: 1
};

module.exports = function tween(instanceOptions) {
  var options = assign({}, defaultOptions, instanceOptions);
  var isFinished = false;
  var iteration = 1;
  var startTime = null;

  function tick() {
    var time = now();

    if (!startTime) {
      startTime = time;
    }

    var progress = isFinished ?
      1 :
      (time - (startTime * iteration)) / options.duration;

    options.onProgress(
      options.easing(progress) *
        (options.to - options.from) +
          options.from
    );

    if (progress === 1) {
      if (iteration < options.loop) {
        iteration += 1;
      } else {
        isFinished = true;
      }
    }

    if (isFinished) {
      options.onComplete();
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
