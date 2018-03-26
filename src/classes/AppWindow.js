class AppWindow {
  /**
   * @description Get the value associated with the named CSS variable
   * @returns {any} cssVarName - CSS variable type
   * @memberof AppWindow
   */
  getCssVariable(cssVarName, varType) {
    const htmlStyles = window.getComputedStyle(document.querySelector('html'));
    const rawValue = htmlStyles.getPropertyValue('--' + cssVarName);
    let varValue = null;
    switch (varType) {
      case 'number':
        varValue = parseInt(rawValue);
        break;
      case 'string':
        varValue = String.toString(rawValue);
        break;
      default:
        throw new Error(`getCssVariable: unknown value type of ${valueType} ` +
          `encountered`);
    }
    return varValue;
  }

  /**
   * @description Set the value of a CSS variable
   * @param {String} cssVarName - Name of the CSS variable to update
   * @param {any} varValue - Value to be assigned to the CSS variable
   * @memberof AppWindow
   */
  setCssVariable(cssVarName, varValue) {
    document.documentElement.style.setProperty('--' + cssVarName, varValue);
  }
}

export default AppWindow;