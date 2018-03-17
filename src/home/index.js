import gitaclue from 'gitaclue';
import AppWindow from '../classes/AppWindow';
import Grid from '../classes/Grid';
import Palette from '../classes/Palette';

let designGrid = null;
let colorPalette = null;
const appWindow = new AppWindow();

function getUserProfileUrl() {
  return gitaclue.get([
    { context: 'user', contextOwner: '', contextName: 'jdmedlock' },
  ])
}

$(document).ready(function() {
  console.clear();

  // Create event handlers for the main app buttons
  $("#clear-grid-btn").click((event) => {
    designGrid.clearGrid();
  });
  
  // Enable the 
  var dialog = document.querySelector('dialog');
  var showDialogButton = $( '#show-dialog' );
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  $( "#about-link" ).on( "click", function() {
    getUserProfileUrl()
    .then(response => {
      $( "#github-avatar" ).attr("src",(JSON.parse(response).user.avatar_url));
      dialog.showModal();
    });
  });
  $( ".close" ).on( "click", function() {
    dialog.close();
  });
  
  // Render the color chooser control and create its event handlers
  colorPalette = new Palette();
  colorPalette.renderRecentColors(colorPalette.getShades());
  $( ".recent-color-wrapper" ).on( 'click', '.recent-color', function() {
    colorPalette.setCurrentColor($(this).css('background-color'));
  });

  // Render the design grid and its event handlers
  designGrid = new Grid(
    appWindow.getCssVariable('designGridRowCount', 'number'), 
    appWindow.getCssVariable('designGridColumnCount', 'number')
  );
  designGrid.makeGrid();

  // Create a delegated event handler on the Design Grid.
  $( ".design-grid" ).on( "click", ".design-grid-cell", function() {
    $(this).css('background-color',colorPalette.getCurrentColor());
  });

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
