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
    const noOfShades = 5;
    const step = (255 / noOfShades) -1;
    let shades = [];
    let colors = [];

    for (let i = 0; i < noOfShades; i++) {
      if (i === 0) {
        colors = color.split('rgb(')[1].split(')')[0].split(',');
      } else {
        colors = shades[i-1].split('rgb(')[1].split(')')[0].split(',');
      }
      shades.push(`rgb(${parseInt(colors[0],10)+step},${parseInt(colors[1],10)+step},${parseInt(colors[2],10)+step})`);
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
