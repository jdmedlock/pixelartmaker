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

  console.log(designGrid);
  designGrid.makeGrid();

  // Create a button handler for the on/off button
  $(".row-minus").click((event) => {
      console.log(`Intercepted row minus click. event: ${event}`);
      designGrid.decrRowCount();
  });

});
