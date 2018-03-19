import gitaclue from 'gitaclue';
import AppWindow from '../classes/AppWindow';
import Grid from '../classes/Grid';
import Palette from '../classes/Palette';

const appWindow = new AppWindow();
let designGrid = null;
let colorPalette = null;
let colorWheelCanvas;
let colorWheelContext;
let colorWheelFreeze = false;

/**
 * @description Retreive the pixel at the current mouse location
 * @param {Object} event A mouse event
 * @returns {Object} The data from the current pixel
 */
function getPixel(event) {
  const canvasOffset = $(colorWheelCanvas).offset();
  const xCoord = Math.floor(event.pageX - canvasOffset.left);
  const yCoord = Math.floor(event.pageY - canvasOffset.top);
  const imageData = colorWheelContext.getImageData(xCoord, yCoord, 1, 1);
  return imageData.data;
}

/**
 * @description Retrieve the app authors avatar from GitHub
 * @returns {Object} A promise for the GitHub profile avatar
 */
function getUserProfileUrl() {
  return gitaclue.get([
    { context: 'user', contextOwner: '', contextName: 'jdmedlock' },
  ]);
}

/**
 * @description Load the color wheel image into the canvas
 * @param {String} url the image will be loaded from 
 */
function loadColorWheel(url) {
  colorWheelCanvas = document.getElementById('color-wheel');
  colorWheelContext = colorWheelCanvas.getContext('2d');
  const base_image = new Image();
  base_image.crossOrigin = 'anonymous'; // Prevent CORS from blocking the load
  base_image.src = url;
  base_image.onload = function() {
    colorWheelContext.drawImage(base_image, 
      0, 0, base_image.width, base_image.height,              // Source rectangle
      0, 0, colorWheelCanvas.width, colorWheelCanvas.height); // Destination rectangle
  };
}

$(document).ready(function() {
  console.clear();
  loadColorWheel('https://i.imgur.com/BjkamyQ.png');

  //---------------------------------------------------------------------------
  // Create event handlers for the main app buttons
  //---------------------------------------------------------------------------
  $("#clear-grid-btn").click((event) => {
    designGrid.clearGrid();
  });
  
  //---------------------------------------------------------------------------
  // Render the color chooser control and create its event handlers
  //---------------------------------------------------------------------------
  colorPalette = new Palette();
  $( ".color-selector-button" ).css('background-color',colorPalette.getDefaultColor());
  colorPalette.renderRecentColors(colorPalette.getShades());

  $( ".recent-color-wrapper" ).on( 'click', '.recent-color', function() {
    colorPalette.setCurrentColor($(this).css('background-color'));
    $( ".color-selector-button" ).css('background-color', colorPalette.getCurrentColor());
  });

  //---------------------------------------------------------------------------
  // Render the design grid and its event handlers
  //---------------------------------------------------------------------------
  designGrid = new Grid(
    appWindow.getCssVariable('designGridRowCount', 'number'), 
    appWindow.getCssVariable('designGridColumnCount', 'number')
  );
  designGrid.makeGrid();

  // Create a delegated event handler on the Design Grid.
  $( ".design-grid" ).on( "click", ".design-grid-cell", function() {
    $(this).css('background-color',colorPalette.getCurrentColor());
  });

  // Create a event handlers for column and row controls
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

  //---------------------------------------------------------------------------
  // Enable the About dialog event handlers
  //---------------------------------------------------------------------------
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

  //---------------------------------------------------------------------------
  // Enable the Palette dialog event handlers
  //---------------------------------------------------------------------------
  var paletteDialog = document.querySelector('dialog#palette-dialog');
    
  if (!paletteDialog.showModal) {
    dialogPolyfill.registerDialog(paletteDialog);
  }
  $( ".color-selector-button" ).on( "click", function() {
    paletteDialog.showModal();
  });

  $('#color-wheel').mousemove(function(event) {
    if (!colorWheelFreeze) {
      const pixel = getPixel(event);
      const hexColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
      const rgbColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";

      $('#palette-color-code').val('#' + ('0000' + hexColor.toString(16)).substr(-6));
      $('#palette-primary-button').css('backgroundColor', rgbColor);
    }
  });

  $('#color-wheel').mousedown(function(event) {
    const pixel = getPixel(event);
    const rgbColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
    colorPalette.setNewColor(rgbColor);
    colorPalette.renderNewColorShades(rgbColor);
    colorWheelFreeze = !colorWheelFreeze;
  });

  $( ".selected-shade-wrapper" ).on( 'click', '.selected-shade', function() {
    colorPalette.setNewColor($(this).css('background-color'));
    colorPalette.renderNewColorShades($(this).css('background-color'));
    $('#palette-primary-button').css('backgroundColor', $(this).css('background-color'));
  });

  $( ".palette-cancel" ).on( "click", function() {
    paletteDialog.close();
  });
  
  $( ".palette-ok" ).on( "click", function() {
    colorPalette.setCurrentColor(colorPalette.getNewColor());
    $( ".color-selector-button" ).css('background-color',colorPalette.getCurrentColor());
    paletteDialog.close();
  });  
});
