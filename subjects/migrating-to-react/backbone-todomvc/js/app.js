/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

  // sorry, there's no build, jsx loader is async,
  // so we're just hacking for now to get the point across
  setTimeout(function () {
    // kick things off by creating the `App`
    new app.AppView();
  }, 100);
});
