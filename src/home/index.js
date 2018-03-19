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

console.clear();


$(document).ready(function() {

  // Create event handlers for the main app buttons
  $("#clear-grid-btn").click((event) => {
    designGrid.clearGrid();
  });
  
  // Enable the About dialog event handlers
  var aboutDialog = document.querySelector('dialog#about-dialog');
  if (!aboutDialog.showModal) {
    dialogPolyfill.registerDialog(aboutDialog);
  }
  $( "#about-link" ).on( "click", function() {
    getUserProfileUrl()
    .then(response => {
      $( "#about-avatar" ).attr("src",(JSON.parse(response).user.avatar_url));
      aboutDialog.showModal();
    });
  });
  $( ".about-close" ).on( "click", function() {
    aboutDialog.close();
  });
  
  // Load the base image from Imgur to prevent CORS from blocking
  // the load operation
  var canvas = document.getElementById('color-wheel');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.crossOrigin = 'anonymous';
  base_image.src = 'https://i.imgur.com/BjkamyQ.png';
  base_image.onload = function() {
    context.drawImage(base_image, 
      0, 0, base_image.width, base_image.height, // Source rectangle
      0, 0, canvas.width, canvas.height);        // Destination rectangle
  }

  // Enable the Palette dialog event handlers
  var paletteDialog = document.querySelector('dialog#palette-dialog');
    
  if (!paletteDialog.showModal) {
    dialogPolyfill.registerDialog(paletteDialog);
  }
  $( ".color-selector-button" ).on( "click", function() {
    paletteDialog.showModal();
  });

  $('#color-wheel').mousemove(function(e) {
    // Get the pixel at the current position
    var canvasOffset = $(canvas).offset();
    var canvasX = Math.floor(e.pageX - canvasOffset.left);
    var canvasY = Math.floor(e.pageY - canvasOffset.top);
    var imageData = context.getImageData(canvasX, canvasY, 1, 1);
    var pixel = imageData.data;

    // Calculate the color code of the current pixel
    var hexColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
    var rgbColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
    console.log(canvasX, canvasY, hexColor, rgbColor)

    $('#palette-color-code').val('#' + ('0000' + hexColor.toString(16)).substr(-6));
    $('#palette-primary-button').css('backgroundColor', rgbColor);
  });

  $( ".palette-cancel" ).on( "click", function() {
    paletteDialog.close();
  });
  $( ".palette-ok" ).on( "click", function() {
    paletteDialog.close();
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
