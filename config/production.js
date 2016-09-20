module.exports = {

  /**
   * concat
   * Js source files concatenation
   */
  concat: true,

  /**
   * minify
   * Js and css source files minification
   */
  minify: true,

  /**
   * lint
   * Js and sass source files linting
   */
  lint: false,

  /**
   * sourcemaps
   * Js and sass sourcemapping
   */
  sourcemaps: false,

  /**
   * revisioning
   * Static asset revisioning by appending content hash to filenames
   * **Warning**: Must be false if concat is set to false.
   */
  revisioning: true,

  /**
   * watch
   * Watch source files and recompile on any change
   */
  watch: false,

  /**
   * webp
   * Transform the images in src/assets folder to webp
   */
  webp: false
};
