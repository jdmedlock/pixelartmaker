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

  // Create an input event handler for the column count
  $('.column-count').change(() => { 
    console.log('Column count changed');
  });

  // Create a button handler decrement column event
  $(".column-minus").click((event) => {
    designGrid.decrColumnCount();
  });

  // Create a button handler increment column event
  $(".column-plus").click((event) => {
    designGrid.incrColumnCount();
  });

  // Create an input event handler for the row count
  $('.row-count').change(() => { 
    // do something
  });  

  // Create a button handler decrement row event
  $(".row-minus").click((event) => {
      designGrid.decrRowCount();
  });

  // Create a button handler increment row event
  $(".row-plus").click((event) => {
    designGrid.incrRowCount();
  });

});
