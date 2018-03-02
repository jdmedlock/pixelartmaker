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

  // Create a button handler decrement column event
  $(".column-minus").click((event) => {
    designGrid.decrColumnCount();
  });

  // Create a button handler increment column event
  $(".column-plus").click((event) => {
    designGrid.incrColumnCount();
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
