import AppWindow from '../classes/AppWindow';
import Grid from '../classes/Grid';

let designGrid = null;
const appWindow = new AppWindow();

$(document).ready(function() {
  console.clear();

  designGrid = new Grid(
    appWindow.getCssVariable('designGridRowCount', 'number'), 
    appWindow.getCssVariable('designGridColumnCount', 'number')
  );
  designGrid.makeGrid();

  // Create an event handlers for the Clear Grid button
  $("#clear-grid-btn").click((event) => {
    designGrid.clearGrid();
  });

  // Create event handlers for column controls
  $('.column-count').change(() => { 
    designGrid.setColumnCount($('#column-count-box').val());
  });

  $(".column-minus").click((event) => {
    try {
      designGrid.decrColumnCount();
      $('#column-count-box').val(designGrid.getColumnCount());
    }
    catch(error) {
      console.log(`Error decrementing column count. error:${error}`);
    }
  });

  $(".column-plus").click((event) => {
    try {
      designGrid.incrColumnCount();
      $('#column-count-box').val(designGrid.getColumnCount());
    }
    catch(error) {
      console.log(`Error incrementing column count. error:${error}`);
    }
  });

  // Create an event handlers for the row controls
  $('.row-count').change(() => { 
    designGrid.setRowCount($('#row-count-box').val());
  });  

  $(".row-minus").click((event) => {
    try {
      designGrid.decrRowCount();
      $('#row-count-box').val(designGrid.getRowCount());
    }
    catch(error) {
      console.log(`Error decrementing row count. error:${error}`);
    }
  });

  $(".row-plus").click((event) => {
    try {
      designGrid.incrRowCount();
      $('#row-count-box').val(designGrid.getRowCount());
    }
    catch(error) {
      console.log(`Error incrementing row count. error:${error}`);
    }
  });

});
