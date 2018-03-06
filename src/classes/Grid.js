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
      return new Error(`Column count must be between 1 and 99, ${columnCount} is invalid.`);
    }

    if (isNaN(rowCount)) {
      return new Error(`Column count is not numeric: ${rowCount}.`);
    }
    if (rowCount < 1 || rowCount > 99) {
      return new Error(`Column count must be between 1 and 99, ${rowCount} is invalid.`);
    }

    // Populate object variables
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.minColumnCount = 1;
    this.maxColumnCount = 99;
    this.minRowCount = 1;
    this.maxRowCount = 99;
    this.defaultGridCellColor = 'rgb(232, 232, 232)'; // Light grey #e8e8e8

    // Create a new grid using the supplied dimensions and nitialize each cell to
    // the default cell color.
    this.grid = new Array(this.rowCount);
    this.clearGrid();
  }
  
/*
  /**
   * @description Return a JSON representation of the design grid
   * @returns {Object} JSON object defining the current design grid
   * @readonly
   * @memberof Grid
   * /
  get grid() {
    return JSON.stringify(this._grid);
  }
  /**
   * @description Populate the design grid from a JSON object
   * @memberof Grid
   * /
  set grid(gridObject) {
    this._grid = JSON.parse(gridObject);
  }
*/

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
   * @description Update the number of grid columns
   * @param {Integer} count - Column count
   * @memberof Grid
   */
  setColumnCount(count) {
    if (isNaN(count)) {
      return new Error(`Column count is not numeric: ${count}.`);
    }
    if (count < 1 || count > 99) {
      return new Error(`Column count must be between 1 and 99, ${count} is invalid.`);
    }
    this.columnCount = count;
    this.makeGrid();
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
   * @description Update the number of grid rows
   * @param {Integer} count - Row count
   * @memberof Grid
   */
  setRowCount(count) {
    if (isNaN(count)) {
      return new Error(`Row count is not numeric: ${count}.`);
    }
    if (count < 1 || count > 99) {
      return new Error(`Row count must be between 1 and 99, ${count} is invalid.`);
    }
    this.rowCount = count;
    this.makeGrid();
  }

  /**
   * @description Decrement the grid column count
   * @returns {any} The new column count or an Error object If current value is at the
   * maximum column count.
   * @memberof Grid
   */
  decrColumnCount() {
    if (this.columnCount === this.minColumnCount) {
      return new Error(`Minimum row limit of ${this.minColumnCount} already reached.`);
    }
    this.columnCount -= 1;
    this.makeGrid();
    return this.columnCount;
  }

  /**
   * @description Increment the grid column count
   * @returns {any} The new column count or an Error object If current value is at the
   * maximum column count.
   * @memberof Grid
   */
  incrColumnCount() {
    if (this.columnCount === this.maxColumnCount) {
      return new Error(`Maximum row limit of ${this.maxColumnCount} already reached.`);
    }
    this.columnCount += 1;
    this.makeGrid();
    return this.columnCount;
  }
  
  /**
   * @description Decrement the grid row count
   * @returns {any} The new row count or an Error object If current value is at the
   * minimum row count.
   * @memberof Grid
   */
  decrRowCount() {
    if (this.rowCount === this.minRowCount) {
      return new Error(`Minimum row limit of ${this.maxRowCount} already reached.`);
    }
    this.rowCount -= 1;
    this.makeGrid();
    return this.rowCount;
  }

  /**
   * @description Increment the grid row count
   * @returns {any} The new column count or an Error object If current value is at the
   * maximum row count.
   * @memberof Grid
   */
  incrRowCount() {
    if (this.rowCount === this.maxRowCount) {
      return new Error(`Maximum row limit of ${this.maxRowCount} already reached.`);
    }
    this.rowCount += 1;
    this.makeGrid();
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
        this.grid[rowNo][columnNo] = this.defaultGridCellColor;
      }
    }
    this.makeGrid();
  }

  /**
   * @description Render the grid by generating and adding a new DOM element for
   * each cell in the grid.
   * @memberof Grid
   */
  makeGrid() {
    const gridCellTemplate = '<div class="design-grid-cell"></div>';
    let gridCellElements = '';
    for (let rowNo = 0; rowNo < this.rowCount; rowNo++) {
      for (let columnNo = 0; columnNo < this.columnCount; columnNo++) {
        gridCellElements += gridCellTemplate;
      }
    }
    const appWindow = new AppWindow();
    appWindow.setCssVariable('designGridColumnCount', this.columnCount);
    appWindow.setCssVariable('designGridRowCount', this.rowCount);
    $( ".design-grid" ).empty();
    $( ".design-grid" ).append( gridCellElements );
  }
}

export default Grid;