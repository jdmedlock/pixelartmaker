'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  /**
   * @description Grid constructor initializes a new Grid given its dimensions.
   * @param {Integer} columnCount - Number of columns in the grid
   * @param {Integer} rowCount - Number of rows in the grid
   * @memberof Grid
   */
  function Grid(columnCount, rowCount) {
    _classCallCheck(this, Grid);

    // Validate the input parameters
    if (isNaN(columnCount)) {
      return new Error('Column count is not numeric: ' + columnCount + '.');
    }
    if (columnCount < 1 || columnCount > 99) {
      return new Error('Column count must be between 1 and 99, ' + columnCount + ' is invalid.');
    }

    if (isNaN(rowCount)) {
      return new Error('Column count is not numeric: ' + rowCount + '.');
    }
    if (rowCount < 1 || rowCount > 99) {
      return new Error('Column count must be between 1 and 99, ' + rowCount + ' is invalid.');
    }

    // Populate object variables
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.minColumnCount = 1;
    this.maxColumnCount = 99;
    this.minRowCount = 1;
    this.maxRowCount = 99;
    this.defaultGridCellColor = 'rgb(232, 232, 232)'; // Light grey #e8e8e8

    this.grid = new Array(rowCount);
    for (rowNo = 0; rowNo < rowCount; rowNo++) {
      this.grid[rowNo] = new Array(columnCount);
      for (columnNo = 0; columnNo < columnCount; columnCount++) {
        grid[rowNo][columnNo] = this._defaultGridCellColor;
      }
    }
  }

  /**
   * @description Return a JSON representation of the design grid
   * @returns {Object} JSON object defining the current design grid
   * @readonly
   * @memberof Grid
   */


  _createClass(Grid, [{
    key: 'decrColumnCount',


    /**
     * @description Decrement the grid column count
     * @returns {Error} If current value is at the minimum column count.
     * @memberof Grid
     */
    value: function decrColumnCount() {
      if (this._columnCount === this._minColumnCount) {
        return new Error('Minimum row limit of ' + this._minColumnCount + ' already reached.');
      }
      this._columnCount -= 1;
      // TODO: Adjust grid
    }

    /**
     * @description Increment the grid column count
     * @returns {Error} If current value is at the maximum column count.
     * @memberof Grid
     */

  }, {
    key: 'incrColumnCount',
    value: function incrColumnCount() {
      if (this._columnCount === this._maxColumnCount) {
        return new Error('Maximum row limit of ' + this._maxColumnCount + ' already reached.');
      }
      this._columnCount += 1;
      // TODO: Adjust grid
    }

    /**
     * @description Decrement the grid row count
     * @returns  
     * @memberof Grid
     */

  }, {
    key: 'decrRowCount',
    value: function decrRowCount() {
      if (this._rowCount === this._minRowCount) {
        return new Error('Minimum row limit of ' + this._maxRowCount + ' already reached.');
      }
      this._rowCount -= 1;
      // TODO: Adjust grid
    }

    /**
     * @description Increment the grid row count
     * @returns {Error} If maximum row count is exceeded.
     * @memberof Grid
     */

  }, {
    key: 'incrRowCount',
    value: function incrRowCount() {
      if (this._rowCount === this._maxRowCount) {
        return new Error('Maximum row limit of ' + this._maxRowCount + ' already reached.');
      }
      this._rowCount += 1;
      // TODO: Adjust grid
    }
  }, {
    key: 'grid',
    get: function get() {
      return JSON.stringify(this._grid);
    }
    /**
     * @description Populate the design grid from a JSON object
     * @memberof Grid
     */
    ,
    set: function set(gridObject) {
      this._grid = JSON.parse(gridObject);
    }

    /**
     * @description Get the current number of columns in the grid.
     * @returns {Integer} - Number of columns in the grid
     * @readonly
     * @memberof Grid
     */

  }, {
    key: 'columnCount',
    get: function get() {
      return this._columnCount;
    }

    /**
     * @description Update the number of grid columns
     * @param {Integer} count - Column count
     * @memberof Grid
     */
    ,
    set: function set(count) {
      if (isNaN(count)) {
        return new Error('Column count is not numeric: ' + count + '.');
      }
      if (count < 1 || count > 99) {
        return new Error('Column count must be between 1 and 99, ' + count + ' is invalid.');
      }
      this._columnCount = count;
      // TODO: Adjust grid
    }

    /**
    * @description Get the current number of rows in the grid.
    * @returns {Integer} - Number of rows in the grid
    * @readonly
    * @memberof Grid
    */

  }, {
    key: 'rowCount',
    get: function get() {
      return this._rowCount;
    }

    /**
     * @description Update the number of grid rows
     * @param {Integer} count - Row count
     * @memberof Grid
     */
    ,
    set: function set(count) {
      if (isNaN(count)) {
        return new Error('Row count is not numeric: ' + count + '.');
      }
      if (count < 1 || count > 99) {
        return new Error('Row count must be between 1 and 99, ' + count + ' is invalid.');
      }
      this._rowCount = count;
      // TODO: Adjust grid
    }
  }]);

  return Grid;
}();