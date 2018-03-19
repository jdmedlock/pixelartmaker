class Palette {
  /**
   * @description Palette constructor initializes a new Palette object
   * @memberof Palette
   */
  constructor(columnCount, rowCount) {
    this.defaultColor = 'rgb(0, 0, 232)';
    this.newColor = this.defaultColor;
    this.currentColor = this.defaultColor;
    this.newColorShades = this.createShades(this.newColor);
    this.currentColorShades = this.createShades(this.currentColor);
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
    const step = parseInt(256 / noOfShades, 10);
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
    $( ".color-selector-button" ).css('background-color',color);
    this.updateRecentColors(color);
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
      this.recentColors.splice(1,0,color);
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
