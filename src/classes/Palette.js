class Palette {
  /**
   * @description Palette constructor initializes a new Palette object
   * @memberof Palette
   */
  constructor(columnCount, rowCount) {
    this.defaultColor = 'rgb(0, 0, 232)';
    this.currentColor = this.defaultColor;
    this.currentColorShades = this.createShades(this.currentColor);
    this.newColor = this.defaultColor;
    this.newColorShades = this.createShades(this.currentColor);
    this.recentColors = this.createShades(this.currentColor);
  }

  /**
   * @description Generate an array of five shades of the provided color using equal
   * amounts of power to all of the light sources.
   * @param {any} color A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @returns {[String]} Array of five shade values based on the provided color
   * @memberof Palette
   */
  createShades(color) {
    // TODO: Validate input parameter
    const noOfShades = 5;
    const step = parseInt(256 / (noOfShades * 2), 10);
    let shades = [];
    let [red, green, blue] = color.split('rgb(')[1].split(')')[0].split(',');

    for (let i = 0; i < noOfShades; i++) {
      red = parseInt(red, 10) + step;
      green = parseInt(green, 10) + step;
      blue = parseInt(blue, 10) + step;
      blue = blue > 255 ? 255 : blue;
      shades.push(`rgb(${red}, ${green}, ${blue})`);
    }
    return shades.reverse();
  }

  /**
   * @description Retrieve the currently selected color
   * @returns {String} A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  getCurrentColor() {
    return this.currentColor;
  }

  /**
   * @description Retrieve the default color
   * @returns {String} A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  getDefaultColor() {
    return this.defaultColor;
  }

  /**
   * @description Retrieve the newly selected color
   * @returns {String} A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  getNewColor() {
    return this.newColor;
  }

  /**
   * @description Retrieve a color from the recently used colors array. 
   * @param {Number} index The position of the color in the recently used array, 
   * where 0 represents the most recently used color.
   * @returns  {String} A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
     * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  getRecentColor(index) {
    return (index >= 0 && index <= this.recentColors.length) 
      ? this.recentColors[index] 
      : new Error(`Recent color index must be between 0 and ${this.recentColors.length}. ${index} was passed.`);
  }

  /**
   * @description Retrieve and array containing the shades of the current color
   * @returns  {[String]} Array of five shade values based on the provided color
   * @memberof Palette
   */
  getShades() {
    return this.currentColorShades;
  }

  /**
   * @description Convert a hexadecimal color code to an RGB string value in
   * the format 'RGB(r,g,b)', where each numeric value is in decimal.
   * @param {String} hexColor 
   * @returns {String} An RGB string in the format 'RGB(r,g,b)'
   * @memberof Palette
   */
  hexToRgb(hexColor) {
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);
    return `rgb(${red},${green},${blue})`;
  }

  /**
   * @description Convert a pixel acquired through a mouse event to a six 
   * hexadecimal digit value from the decimal RGB values.
   * @param {Object} pixel A pixel obtained from a mouse event 
   * @returns {String} A string six hexadecimal digits representing the color
   * @memberof Palette
   */
  pixelToHex(pixel) {
    const hexColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
    return ('0000'+hexColor.toString(16)).substr(-6);
  }

  /**
   * @description Convert a pixel acquired through a mouse event to an RGB 
   * string value in the format 'RGB(r,g,b)', where each numeric value is
   * in decimal.
   * @param {Object} pixel A pixel obtained from a mouse event 
   * @returns {String} An RGB string in the format 'RGB(r,g,b)'
   * @memberof Palette
   */
  pixelToRgb(pixel) {
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  }

  /**
   * @description Render the array of shades for the selected color onto the HTML page
   * @param {String} color A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  renderNewColorShades(color) {
    // TODO: Validate the input parameter
    this.newColorShades = this.createShades(color);
    this.newColorShades.forEach((element, index) => {
      $( "#selected-shade-" + (index+1) ).css('background-color',element);
    });
  }

  /**
   * @description Render the array of recently used colors onto the HTML page
   * @param {[String]} colorArray Array of colors representing the most recently used colors.
   * @memberof Palette
   */
  renderRecentColors(colorArray) {
    // TODO: Validate the input parameter
    colorArray.forEach((element, index) => {
      $( "#recent-color-" + (index+1) ).css('background-color',element);
    });
  }

  /**
   * @description Update the currently selected color to a new value
   * @param {String} color A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  setCurrentColor(color) {
    // TODO: Validate the input parameter
    this.currentColor = color;
    this.updateRecentColors(color);
  }

  /**
   * @description Establish a newly selected
   * @param {String} color A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  setNewColor(color) {
    // TODO: Validate the input parameter
    this.newColor = color;
    this.newColorShades = this.createShades(this.currentColor);
  }

  /**
   * @description Update the recent colors array so the most recently used color 
   * occupies position 0 in the array.
   * @param {String} color A string formatted as 'rgb(nnn,nnn,nnn)' where 'nnn' is a
   * value from 0-255 representing the red, green, and blue color value.
   * @memberof Palette
   */
  updateRecentColors(color) {
    const colorIndex = this.recentColors.indexOf(color);
    if (colorIndex === -1) {
      // If the color hasn't been recently used remove the last element and
      // add it onto the front of the array
      this.recentColors.splice(this.recentColors.length-1, 1);
      this.recentColors.splice(0,0,color);
    } else {
      // If the color is already in the array remove it and add it back onto
      // the array so it occupies position 0
      const deletedColors = this.recentColors.splice(colorIndex, 1);
      this.recentColors.splice(0,0,color);
    }
    this.renderRecentColors(this.recentColors);
  }

}

export default Palette;
