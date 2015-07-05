Frontend Bootstrap
===============

Kickoff for web applications.

## Main Tools
+ [Gulp](http://gulpjs.com/)
+ [Sass](http://sass-lang.com)
+ [Jade](http://jade-lang.com)
+ [Babel](https://babeljs.io/)
+ [BrowserSync](http://www.browsersync.io/)
+ [Bower](http://www.bower.io/)

## First steps
#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)

#### Get the dependencies
To avoid errors related to access permissions to can try the following commands
```bash
sudo chown -R $USER ~/.npm
```
```bash
sudo chown -R $USER .
```

Run ```npm install``` from rootpath of the project.

#### Gulp
To start your app run ```gulp``` in the rootpath of the project. It is recommended to run gulp using the binary in the node modules folder ```./node_modules/.bin/gulp``` to avoid using an incorrect version of gulp that may have been installed globally. Consider adding ```alias gulp='node_modules/.bin/gulp'``` to your .bashrc o .bash_profile settings.

If having problems with ```gulp watch```, run ```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```.
This solution was found [here](https://github.com/gulpjs/gulp/issues/217).


###  Gulp tasks
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

> **gulp publish**
> Pushes the contents of the *build* to the s3 bucket specified in the task file.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

Copyright 2015 Wolox S.A.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

