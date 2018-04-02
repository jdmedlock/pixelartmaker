# Pixel Art Maker
<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

[Pixel Art Maker](https://jdmedlock.github.io/pixelartmaker/) was developed as
part of the [Grow With Google Scholarship Challenge](https://www.udacity.com/grow-with-google)
sponsored by [Google](https://grow.google/) and offered through
[Udacity](www.udacity.com).

Pixel Art Maker is the final project in the three month long Grow With Google
Scholarship Challenge. Its purpose is to demonstrate the students grasp of
the information in the lessons provided during the Scholarship Challenge.

[Features](#features) | [Development](#development) | [Runtime](#runtime) |
[Authors](#authors) | [License](#license) | [Release Notes](releasenotes.md)


## Features

Pixel Art Maker is a single-page web app that allows users to draw pixel art
on squares arranged in a canvas of rows and columns. The key required app
features are geared to allowing the end user to:

- Dynamically set the size of the table as an N by M grid of squares
- Choose a color
- Click on a grid cell to paint it with the chosen color

In addition to these core requirements the following additional features have
been incorporated to allow the end user to:

- Clear the grid with a single click on the trash can icon
- Toggle a single pixel between the currently selected color and the
default grid color
- Choose new colors from a color wheel and calculate five shades of the
chosen color for a more granular selection
- Display the hexadecimal RGB value of the chosen color
- Display the most recently chosen colors and allow them to be reselected
with a single click
- Export a grid to the local file
- Import a previously exported grid

### Roadmap

Next Release
- Click and drag pixel coloring

## Development

### Project Organization

Several key subdirectories exist under the main `pixelartmaker` app directory
including:

- `build`

  Contains the application files that have been preprocessed by BabelJS
  and Stylus, and bundled by RollupJS. When changes are made to source files
  the `package.json` script `build` should be used to bundle the source
  files in the `src` directory (see below) by executing the  `npm run build`
  CLI command defined in `package.json`.

- `design-artifacts`

  This subdirectory contains the notes and diagrams created during the app
  design process. These are not required at runtime, but are included to
  support a post-implemention retrospective. There are almost always
  deviations between the initial design and the finished product. It is
  useful to examine these in support of a continuous improvement effort.

- `src`

  Other than the `index.html` file containing the home page and configuration
  files (like `.rollup.config.js`) all source files are kept in this directory.
  Source files are maintained in one of the following subdirectories under
  `src`.
  * `assets` contains the graphics, such as the color wheel, referenced by the
  app
  * `classes` contains the Javascript classes shared across the apps
  * `home` contains the Javascript and Stylus source files which define the
  home page.

  Source files for any future pages added to the app should be created in
  their own subdirectories under `src`.

### Built With

The main libraries used in the development of Pixel Art Maker are shown in the
following table.

| Library                                        | Purpose                    |
|:-----------------------------------------------|:---------------------------|
| [Airbnb](https://github.com/airbnb/javascript) | Javascript dev. standards  |
| [Babel](https://babeljs.io/)                   | JS Transpiler              |
| [GitAClue](https://github.com/jdmedlock/GitAClue) | GitHub Info Extract     |
| [Material Design](https://getmdl.io/)          | Material Design Lite       |
| [Rollup](https://rollupjs.org)                 | Module bundler             |
| [Stylus](https://stylus-lang.com )             | CSS preprocessor           |

### Git Branches

- `master`: Only updated from PR's from the development branch for release. This
branch always reflects the current production release.
- `development`: Reflects the candidate code for the next release. Developers
work in developer branches, which are then pulled into this branch. All code
pulled into this branch must be tested and undergo peer review as part of the
PR process.
- `gh-pages`: Used for testing changes on GitHub Pages prior to pushing to
`development` and `master` branches.
- `feature branches`: Are individual branches created for new features and
bug fixes. There are 4 basic types of branches:
bug, feature, refactor and style, after the type comes the name, it should
specify on top of the branch type. For example `feature/course-review`.

## Runtime

[Pixel Art Maker](https://jdmedlock.github.io/pixelartmaker/) is deployed to
GitHub Pages. Changes moved into the `gh-pages` and `master` branches are
automatically promoted to the GitHub Pages site for this app.

## Authors

- [Jim Medlock](https://github.com/jdmedlock)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[ideanebulae-url]: tbd

## Release Notes

- Initial release (3/22/2018)
