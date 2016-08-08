# Outdated

##  Gulp tasks
> **gulp scripts**
> Compiles the javascript files in the *src/js* folder after applying the jshint linter.
> Uglifies (unless you're in development environment) and concats the source code and outputs to *build/js/all.js* adding the sourcemaps metadata.
> Ecmascript6 compatible using the babel transpiler

> **gulp sass**
> Compiles the sass files in the *src/scss* folder after applying an scss linter.
> Minifies and concats the source code and outputs to *build/css/all.css* adding the sourcemaps metadata.

> **gulp jade**
> Compiles the *index.jade* file and jade files in the *src/jade* folder. Outputs to *build/index.html* and to *build/html* folder

> **gulp assets**
> Copies the content of the *src/assets* folder to *build/assets*.

> **gulp vendor:js**
> Adds to your app the contents of the files listed in the *vendorJs.js* file.
> Concats and uglifies the source code outputting to *build/js/vendor.js*

> **gulp vendor:css**
> Adds to your app the contents of the files listed in the *vendorCss.js* file.
> Concats and minifies the source code outputting to *build/css/vendor.css*

> **gulp vendor**
> Runs the gulp vendor:js and the gulp vendor:css tasks

> **gulp serve**
> Sets up a node server in the port 3000 with the contents of the build folder
> Browsersync will refresh the browser if any file changes in the *build* folder, excepting css files that, after changing, are injected without refreshing.

> **gulp watch**
> Will watch all files in the *src* folder and run the corresponding task after any change.
> e.g: Whenever a scss file changes, the task sass will be called.

> **gulp clean**
> Erases the *build* folder

> **gulp build**
> Runs the following sequence of tasks: ['assets', 'jade', 'sass', 'scripts', 'vendor']
> Accepts a param that indicates which development environment to use. The available options are: development (default option) and production. e.g: gulp build:production

> **gulp default**
> Runs the following sequence of tasks: ['clean', 'build', 'watch', 'serve']
> This task gets called when running gulp without specifing a task

> **gulp development**
> Runs the default task using the development build

> **gulp production**
> Runs the default task using the production build

> **gulp s3**
> Pushes the contents of the *build* to the s3 bucket specified in the task file. You can either call s3:staging or s3:production.

