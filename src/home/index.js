"use strict";

import Grid from '../classes/Grid';

let designGrid = null;

$(document).ready(function() {
  console.clear();
  designGrid = new Grid(8, 8);

  // Create a button handler for the on/off button
  $("#grid-row-decrement").click((event) => {
      designGrid.decrRowCount();
  });

});