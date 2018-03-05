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
    try {
      designGrid.decrColumnCount();
      $('#column-count-box').val(designGrid.getColumnCount());
    }
    catch(error) {
      console.log(`Error decrementing column count. error:${error}`);
    }
  });

  // Create a button handler increment column event
  $(".column-plus").click((event) => {
    try {
      designGrid.incrColumnCount();
      $('#column-count-box').val(designGrid.getColumnCount());
    }
    catch(error) {
      console.log(`Error incrementing column count. error:${error}`);
    }
  });

  // Create an input event handler for the row count
  $('.row-count').change(() => { 
    // do something
  });  

  // Create a button handler decrement row event
  $(".row-minus").click((event) => {
      try {
        designGrid.decrRowCount();
        $('#row-count-box').val(designGrid.getRowCount());
      }
      catch(error) {
        console.log(`Error decrementing row count. error:${error}`);
      }
    });

  // Create a button handler increment row event
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
