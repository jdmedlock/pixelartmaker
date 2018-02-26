"use strict";

var _Grid = require("../classes/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var designGrid = null;

$(document).ready(function () {
  console.clear();
  designGrid = new _Grid2.default(8, 8);

  // Create a button handler for the on/off button
  $("#grid-row-decrement").click(function (event) {
    designGrid.decrRowCount();
  });
});