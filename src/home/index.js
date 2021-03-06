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
      0, 0, base_image.width, base_image.height,            // Source rectangle
      0, 0, colorWheelCanvas.width, colorWheelCanvas.height); // Dest. rectangle
  };
}

$(document).ready(function() {
  console.clear();
  loadColorWheel('https://i.imgur.com/BjkamyQ.png');
  colorPalette = new Palette();
  designGrid = new Grid(
    appWindow.getCssVariable('designGridRowCount', 'number'),
    appWindow.getCssVariable('designGridColumnCount', 'number')
  );
  designGrid.makeGrid();

  //---------------------------------------------------------------------------
  // Create event handlers for the title bar navigation links
  //---------------------------------------------------------------------------

  // Import Grid dialog

  const importDialog = document.querySelector('dialog#import-dialog');
  if (!importDialog.showModal) {
    dialogPolyfill.registerDialog(importDialog);
  }

  $.event.props.push('dataTransfer');
  $( "#file-drop" ).on({
    dragenter: function(dragEvent) {
      dragEvent.preventDefault();
      dragEvent.stopPropagation();
    },
    dragleave: function(dragEvent)  {
      dragEvent.preventDefault();
      dragEvent.stopPropagation();
    },
    dragover: function(dragEvent)  {
      dragEvent.preventDefault();
      dragEvent.stopPropagation();
    },
    drop: function(dropEvent) {
      dropEvent.preventDefault();
      dropEvent.stopPropagation();
      const file = dropEvent.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function(fileEvent) {
        designGrid.importGrid(colorPalette, JSON.parse(fileEvent.target.result));
        $( ".color-selector-button" ).css('background-color',
          colorPalette.getCurrentColor());
        colorPalette.renderRecentColors(colorPalette.getRecentColors());
      };
      fileReader.readAsText(file, "UTF-8");    }
  });

  $( ".import-link" ).click((event) => {
    importDialog.showModal();
  });
  $( ".import-done" ).on( "click", function() {
    importDialog.close();
  });

  // Export Grid dialog
  const exportDialog = document.querySelector('dialog#export-dialog');
  if (!exportDialog.showModal) {
    dialogPolyfill.registerDialog(exportDialog);
  }
  $( ".export-link" ).click((event) => {
    exportDialog.showModal();
    $('#export-json').text(
      JSON.stringify(designGrid.exportGrid(colorPalette), null, 2)
    );
  });
  $( ".export-cancel" ).on( "click", function() {
    exportDialog.close();
  });
  $( ".export-save" ).on( "click", function() {
    const textToExport = $('#export-json').val();
    const exportBlob = new Blob([textToExport], {type:"text/plain"});
    const exportURL = window.URL.createObjectURL(exportBlob);
    const exportFilename = $( "#export-filename" ).val();
    const downloadLink = document.createElement("a");
    downloadLink.download = exportFilename;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = exportURL;
    downloadLink.onclick = (event) => document.body.removeChild(event.target);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    exportDialog.close();
  });

  // Clear Grid Action
  $(".clear-grid-link").click((event) => {
    designGrid.clearGrid();
  });

  //---------------------------------------------------------------------------
  // Render the color chooser control and create its event handlers
  //---------------------------------------------------------------------------
  $( ".color-selector-button" )
    .css('background-color',colorPalette.getDefaultColor());
  colorPalette.renderRecentColors(colorPalette.getShades());

  $( ".recent-color-wrapper" ).on( 'click', '.recent-color', function() {
    colorPalette.setCurrentColor($(this).css('background-color'));
    $( ".color-selector-button" )
      .css('background-color', colorPalette.getCurrentColor());
  });

  //---------------------------------------------------------------------------
  // Render the design grid and its event handlers
  //---------------------------------------------------------------------------

  // Create a delegated event handler on the Design Grid.
  // When a cell is clicked if its current cell color is the default color
  // then change it to the to selected color. Otherwise, changed it to the
  // default color.

  let isDragging = false;

  $( ".design-grid" ).on( "click", ".design-grid-cell", (event) => {
    if (!isDragging) {
      let [rowNo, columnNo] = $(event.target).attr('id').split('grid-cell-')[1].split('-');
      if (designGrid.getCellColor(rowNo, columnNo) !== colorPalette.getCurrentColor()) {
        designGrid.setCellColor(rowNo, columnNo, colorPalette.getCurrentColor());
        $(event.target).css('background-color',colorPalette.getCurrentColor());
      } else {
        designGrid.setCellColor(rowNo, columnNo, designGrid.getDefaultCellColor());
        $(event.target).css('background-color',designGrid.getDefaultCellColor());
      }
      event.stopPropagation();
    }
  });

  $( ".design-grid" ).on( "mousedown", () => {
    $( document ).mousemove((event) => {
      isDragging = true;
      let [rowNo, columnNo] = $(event.target).attr('id').split('grid-cell-')[1].split('-');
      designGrid.setCellColor(rowNo, columnNo, colorPalette.getCurrentColor());
      $(event.target).css('background-color',colorPalette.getCurrentColor());
      event.stopPropagation();
    });
  });

  $( document ).on( "mouseup", () => {
    isDragging = false;
    $( document ).unbind('mousemove');
  });

  // Create a event handlers for column and row controls
  $( '.column-count' ).change(() => {
    // Determine how many columns are to be added or deleted
    const newColumnCount = $('#column-count-box' ).val();
    let noRepetitions = newColumnCount - designGrid.getColumnCount();
    const columnAction = noRepetitions < 0 ? 'delete' : 'add';
    noRepetitions = columnAction === 'delete' ? noRepetitions * -1 : noRepetitions;

    // Add or delete the desired number of columns
    for (let i = 0; i < noRepetitions; i += 1) {
      try {
        const newColumnCount = columnAction === 'delete'
          ? designGrid.deleteGridColumn()
          : designGrid.addGridColumn();
        $('#column-count-box').val(designGrid.getColumnCount());
      }
      catch(error) {
        console.log(`Error updating column count. error:${error}`);
      }
    }
  });
  $( ".column-minus" ).click((event) => {
    try {
      designGrid.deleteGridColumn();
      $('#column-count-box').val(designGrid.getColumnCount());
    }
    catch(error) {
      console.log(`Error decrementing column count. error:${error}`);
    }
  });
  $( ".column-plus" ).click((event) => {
    try {
      designGrid.addGridColumn();
      $( '#column-count-box' ).val(designGrid.getColumnCount());
    }
    catch(error) {
      console.log(`Error incrementing column count. error:${error}`);
    }
  });

  $( '.row-count' ).change(() => {
    // Determine how many columns are to be added or deleted
    const newRowCount = $('#row-count-box' ).val();
    let noRepetitions = newRowCount - designGrid.getRowCount();
    const rowAction = noRepetitions < 0 ? 'delete' : 'add';
    noRepetitions = rowAction === 'delete' ? noRepetitions * -1 : noRepetitions;

    // Add or delete the desired number of columns
    for (let i = 0; i < noRepetitions; i += 1) {
      try {
        const newRowCount = rowAction === 'delete'
          ? designGrid.deleteGridRow()
          : designGrid.addGridRow();
        $('#row-count-box').val(designGrid.getRowCount());
      }
      catch(error) {
        console.log(`Error updating row count. error:${error}`);
      }
    }
  });
  $( ".row-minus" ).click((event) => {
    try {
      designGrid.deleteGridRow();
      $( '#row-count-box' ).val(designGrid.getRowCount());
    }
    catch(error) {
      console.log(`Error deleting a grid row. error:${error}`);
    }
  });
  $( ".row-plus" ).click((event) => {
    try {
      designGrid.addGridRow();
      $( '#row-count-box' ).val(designGrid.getRowCount());
    }
    catch(error) {
      console.log(`Error adding a new grid row. error:${error}`);
    }
  });

  //---------------------------------------------------------------------------
  // Enable the About dialog event handlers
  //---------------------------------------------------------------------------
  const aboutDialog = document.querySelector('dialog#about-dialog');
  if (!aboutDialog.showModal) {
    dialogPolyfill.registerDialog(aboutDialog);
  }
  $( ".about-link" ).on( "click", function() {
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
  const paletteDialog = document.querySelector('dialog#palette-dialog');

  if (!paletteDialog.showModal) {
    dialogPolyfill.registerDialog(paletteDialog);
  }
  $( ".color-selector-button" ).on( "click", function() {
    paletteDialog.showModal();
  });

  $( '#color-wheel' ).mousemove(function(event) {
    if (!colorWheelFreeze) {
      const pixel = getPixel(event);
      $( '#palette-color-code' ).val(colorPalette.pixelToHex(pixel));
      $( '#palette-primary-button' )
        .css( 'backgroundColor', colorPalette.pixelToRgb(pixel));
      colorPalette.renderNewColorShades(colorPalette.pixelToRgb(pixel));
    }
  });

  $( '#color-wheel' ).mousedown(function(event) {
    const pixel = getPixel(event);
    const rgbColor = colorPalette.pixelToRgb(pixel);
    colorPalette.setNewColor(rgbColor);
    colorPalette.renderNewColorShades(rgbColor);
    colorWheelFreeze = !colorWheelFreeze;
  });

  $( "#palette-color-code" ).on("change", (event) => {
    const rgbColor = colorPalette.hexToRgb($( "#palette-color-code" ).val());
    colorPalette.setNewColor(rgbColor);
    colorPalette.renderNewColorShades(rgbColor);
    $( '#palette-primary-button' ).css('backgroundColor', rgbColor);
  });

  colorPalette.renderNewColorShades(colorPalette.getDefaultColor());
  $( '#palette-primary-button' )
    .css( 'backgroundColor', colorPalette.getDefaultColor());
  $( ".selected-shade-wrapper" ).on( 'click', '.selected-shade', function() {
    $( '#palette-color-code' )
      .val(colorPalette.rgbToHex($(this).css( 'background-color' )));
    colorPalette.setNewColor($(this).css( 'background-color' ));
    colorPalette.renderNewColorShades($(this).css( 'background-color' ));
    $( '#palette-primary-button' )
      .css( 'backgroundColor', colorPalette.getNewColor());
  });

  $( ".palette-cancel" ).on( "click", function() {
    colorWheelFreeze = false;
    paletteDialog.close();
  });

  $( ".palette-ok" ).on( "click", function() {
    colorPalette.setCurrentColor(colorPalette.getNewColor());
    $( ".color-selector-button" )
      .css( 'background-color',colorPalette.getCurrentColor());
    colorWheelFreeze = false;
    paletteDialog.close();
  });
});
