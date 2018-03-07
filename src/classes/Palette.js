class Palette {
  /**
   * @description Palette constructor initializes a new Palette object
   * @memberof Grid
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
    const noOfShades = 6;
    const step = parseInt(256 / noOfShades, 10);
    let shades = [];
    let [red, green, blue] = color.split('rgb(')[1].split(')')[0].split(',');

    for (let i = 0; i < noOfShades; i++) {
      red = parseInt(red, 10) + step;
      green = parseInt(green, 10) + step;
      blue = parseInt(blue, 10) + step;
      shades.push(`rgb(${red},${green},${blue})`);
    }
    return shades.reverse();
  }

  /**
   * @description Retrieve and array containing the shades of the current color
   * @returns  {[String]} Array of five shade values based on the provided color
   * @memberof Palette
   */
  getShades() {
    return this.currentColorShades;
  }

}

export default Palette;
