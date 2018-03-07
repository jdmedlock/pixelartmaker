import AppWindow from '../classes/AppWindow';
import Grid from '../classes/Grid';
import Palette from '../classes/Palette';

let designGrid = null;
let colorPalette = null;
const appWindow = new AppWindow();

$(document).ready(function() {
  console.clear();

  colorPalette = new Palette();
  colorPalette.getShades().forEach((element, index) => {
    $("#recent-color-"+index).css('background-color',element);
  });

  designGrid = new Grid(
    appWindow.getCssVariable('designGridRowCount', 'number'), 
    appWindow.getCssVariable('designGridColumnCount', 'number')
  );
  designGrid.makeGrid();

  // Create a delegated event handler on the Design Grid.
  $( ".design-grid" ).on( "click", ".design-grid-cell", function() {
    // TODO: Use current color from Palette object
    $(this).css('background-color','#EE178C');
  });

  // Create an event handler for the Clear Grid button
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
