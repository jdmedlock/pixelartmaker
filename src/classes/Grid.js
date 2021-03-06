import AppWindow from '../classes/AppWindow';

class Grid {
  /**
   * @description Grid constructor initializes a new Grid given its dimensions.
   * @param {Integer} columnCount - Number of columns in the grid
   * @param {Integer} rowCount - Number of rows in the grid
   * @memberof Grid
   */
  constructor(columnCount, rowCount) {
    // Validate the input parameters
    if (isNaN(columnCount)) {
      return new Error(`Column count is not numeric: ${columnCount}.`);
    }
    if (columnCount < 1 || columnCount > 99) {
      return new Error(`Column count must be between 1 and 99, ${columnCount}` +
        `is invalid.`);
    }

    if (isNaN(rowCount)) {
      return new Error(`Column count is not numeric: ${rowCount}.`);
    }
    if (rowCount < 1 || rowCount > 99) {
      return new Error(`Column count must be between 1 and 99, ${rowCount} ` +
        `is invalid.`);
    }

    // Populate object variables
    this.appWindow = new AppWindow();
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.minColumnCount = 1;
    this.maxColumnCount = 99;
    this.minRowCount = 1;
    this.maxRowCount = 99;
    this.defaultCellColor = 'rgb(218,220,224)'; // Light grey #DADCE0
    this.gridCellTemplate = '<div id="grid-cell-" class="design-grid-cell"></div>';

    // Create a new grid using the supplied dimensions and nitialize each cell to
    // the default cell color.
    this.grid = new Array(this.rowCount);
    this.clearGrid();
  }

  /**
   * @description Add a new column to the grid
   * @returns {Integer} The new column count or an Error object If current
   * value is at the maximum column count.
   * @memberof Grid
   */
  addGridColumn() {
    if (this.columnCount === this.maxColumnCount) {
      return new Error(`Maximum row limit of ${this.maxColumnCount} already ` +
        `reached.`);
    }

    this.grid.forEach((row) => {
      row.splice(row.length, 0, this.defaultCellColor);
    });
    this.columnCount += 1;
    this.renderGrid();
    return this.columnCount;
  }

  /**
   * @description Add a new row to the grid
   * @returns {Integer} The new column count or an Error object If current
   * value is at the maximum row count.
   * @memberof Grid
   */
  addGridRow() {
    if (this.rowCount === this.maxRowCount) {
      return new Error(`Maximum row limit of ${this.maxRowCount} already ` +
        `reached.`);
    }

    // Add a new row of cells to the end of the grid
    const newRow = [];
    for (let i = 0; i < this.columnCount; i++) {
      newRow.push(this.defaultCellColor);
    }
    this.grid.push(newRow);
    this.rowCount += 1;
    this.renderGrid();
    return this.rowCount;
  }

  /**
   * @description Clear the current grid
   * @memberof Grid
   */
  clearGrid() {
    for (let rowNo = 0; rowNo < this.rowCount; rowNo++) {
      this.grid[rowNo] = new Array(this.columnCount);
      for (let columnNo = 0; columnNo < this.columnCount; columnNo++) {
        this.grid[rowNo][columnNo] = this.defaultCellColor;
      }
    }
    this.makeGrid();
  }

  /**
   * @description Remove the most recently added solumn from the grid
   * @returns {any} The new column count or an Error object If current value
   * is at the maximum column count.
   * @memberof Grid
   */
  deleteGridColumn() {
    if (this.columnCount === this.minColumnCount) {
      return new Error(`Minimum row limit of ${this.minColumnCount} already ` +
        `reached.`);
    }
    this.grid = this.grid.map((row) => {
      return row.slice(0, this.columnCount-1);
    });
    this.columnCount -= 1;
    this.renderGrid();
    return this.columnCount;
  }

  /**
   * @description Remove the most recently added row from the grid
   * @returns {any} The new row count or an Error object If current value is
   * at the minimum row count.
   * @memberof Grid
   */
  deleteGridRow() {
    if (this.rowCount === this.minRowCount) {
      return new Error(`Minimum row limit of ${this.maxRowCount} already ` +
        `reached.`);
    }
    this.grid.pop();
    this.rowCount -= 1;
    this.renderGrid();
    return this.rowCount;
  }

  /**
   * @description Create a grid export object
   * @param {Object} colorPalette A reference to an instance of a color Palette
   * @returns {Object} A grid export object
   * @memberof Grid
   */
  exportGrid(colorPalette) {
    let gridObject = {};
    gridObject.rowCount = this.getRowCount();
    gridObject.columnCount = this.getColumnCount();
    gridObject.selectedColor = colorPalette.getCurrentColor();
    gridObject.recentColors = colorPalette.getRecentColors();
    gridObject.grid = [];
    for (let i = 0; i < this.getRowCount(); i += 1) {
      for (let j = 0; j < this.getColumnCount(); j += 1) {
        gridObject.grid.push(
          {rowNo: `${i}`, columnNo: `${j}`, cellColor: `${this.grid[i][j]}`}
        );
      }
    }
    return gridObject;
  }

  /**
   * @description Get the rgb color of a grid cell
   * @param {Integer} rowNo Row number of the grid cell to be updated
   * @param {Integer} columnNo Column number of the grid cell to be updated
   * @returns {String} rgbColor An RGB string in the format 'RGB(r,g,b)'
   * @memberof Grid
   */
  getCellColor(rowNo, columnNo) {
    return this.grid[rowNo][columnNo];
  }

  /**
   * @description Get the current number of columns in the grid.
   * @returns {Integer} - Number of columns in the grid
   * @readonly
   * @memberof Grid
   */
  getColumnCount() {
    return this.columnCount;
  }

  /**
   * @description Get the default cell color
   * @returns {String} Default cell color RGB value
   * @memberof Grid
   */
  getDefaultCellColor() {
    return this.defaultCellColor;
  }

  /**
   * @description Retrieve the design grid
   * @returns {[String]} The grid as an array strings of RGB color values
   * @memberof Grid
   */
  getGrid() {
    return this.grid;
  }

  /**
   * @description Get the current number of rows in the grid.
   * @returns {Integer} - Number of rows in the grid
   * @readonly
   * @memberof Grid
   */
  getRowCount() {
    return this.rowCount;
  }

  /**
   * @description Import a previously exported grid
   * @param {Object} colorPalette A reference to an instance of a color Palette
   * @param {any} gridObject An object containing a previously exported grid
   * @memberof Grid
   */
  importGrid(colorPalette, gridObject) {
    this.setRowCount(gridObject.rowCount);
    this.setColumnCount(gridObject.columnCount);
    this.makeGrid();
    colorPalette.setCurrentColor(gridObject.selectedColor);
    colorPalette.setRecentColors(gridObject.recentColors);
    this.clearGrid();
    gridObject.grid.forEach(element => {
      this.setCellColor(element.rowNo, element.columnNo, element.cellColor);
    });
    this.renderGrid();
  }

  /**
   * @description Render the grid by generating and adding a new DOM element
   * for each cell in the grid.
   * @memberof Grid
   */
  makeGrid() {
    let gridCellElements = '';
    for (let rowNo = 0; rowNo < this.rowCount; rowNo++) {
      for (let columnNo = 0; columnNo < this.columnCount; columnNo++) {
        gridCellElements += this.gridCellTemplate.replace('id="grid-cell-"',
          'id="grid-cell-'+rowNo+'-'+columnNo+'"');
      }
    }
    this.appWindow.setCssVariable('designGridColumnCount', this.columnCount);
    this.appWindow.setCssVariable('designGridRowCount', this.rowCount);
    $( ".design-grid" ).empty();
    $( ".design-grid" ).append( gridCellElements );
  }

  /**
   * @description Render the design grid
   * @memberof Grid
   */
  renderGrid() {
    this.appWindow.setCssVariable('designGridRowCount', this.rowCount);
    this.appWindow.setCssVariable('designGridColumnCount', this.columnCount);
    $( ".design-grid" ).empty();
    for (let rowNo = 0; rowNo < this.rowCount; rowNo++) {
      for (let columnNo = 0; columnNo < this.columnCount; columnNo++) {
        $( ".design-grid" ).append(
          this.gridCellTemplate.replace('id="grid-cell-"', 'id="grid-cell-' +
            rowNo + '-' + columnNo + '"')
        );
        $( `#grid-cell-${rowNo}-${columnNo}` )
          .css('background-color', this.grid[rowNo][columnNo]);
      }
    }
  }

  /**
   * @description Update the number of grid columns
   * @param {Integer} count - Column count
   * @memberof Grid
   */
  setColumnCount(count) {
    if (isNaN(count)) {
      return new Error(`Column count is not numeric: ${count}.`);
    }
    if (count < 1 || count > 99) {
      return new Error(`Column count must be between 1 and 99, ${count} is ` +
        `invalid.`);
    }
    this.columnCount = count;
  }

  /**
   * @description Set the rgb color of a grid cell
   * @param {Integer} rowNo Row number of the grid cell to be updated
   * @param {Integer} columnNo Column number of the grid cell to be updated
   * @param {String} rgbColor An RGB string in the format 'RGB(r,g,b)'
   * @memberof Grid
   */
  setCellColor(rowNo, columnNo, rgbColor) {
    this.grid[rowNo][columnNo] = rgbColor;
  }

  /**
   * @description Update the number of grid rows
   * @param {Integer} count - Row count
   * @memberof Grid
   */
  setRowCount(count) {
    if (isNaN(count)) {
      return new Error(`Row count is not numeric: ${count}.`);
    }
    if (count < 1 || count > 99) {
      return new Error(`Row count must be between 1 and 99, ${count} ` +
        `is invalid.`);
    }
    this.rowCount = count;
  }
}


export default Grid;
