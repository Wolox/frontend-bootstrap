Frontend Bootstrap
===============

Kickoff for web applications.

## Main Tools
+ [Babel](https://babeljs.io/)
+ [Sass](http://sass-lang.com)
+ [Pug](https://pugjs.org)
+ [Gulp](http://gulpjs.com/)
+ [BrowserSync](http://www.browsersync.io/)

## First steps
#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred. Also, you may find this [tool](https://github.com/wbyoung/avn) useful to automate version changing between projects.

#### Getting the dev dependencies
Run ```npm install``` from rootpath of the project.

#### Gulp. The right way
During the project development you will probably use gulp every day, so let's use them in the right way.
A very popular way of getting these packages is simply tell npm to install them globally using the ```-g``` flag.
That's needless as gulp is already in this project dependencies. A big problem can have place if the version of the packages that were installed globally do not match the versions that this project require.
The right way to execute these tools is using the binaries in the node_modules folder, that is ```node_modules/.bin/```.
To execute gulp just use the following ```./node_modules/.bin/gulp```. The same applies for other dependencies that have command line tools.
Adding an alias for these tools is highly recommended. Like the following:
```bash
alias gulp='node_modules/.bin/gulp'
```

#### Gulp
To start your app run ```gulp``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran gulp.
Take a look at **GULP_TASKS.md** for a detailed explanation of the gulp tasks.

## Development

#### Environments
By default, the environment will be **development**, but you can easily change it using the **env** param in your gulp tasks: ```gulp build --env production```

#### SCSS

When creating SCSS files you don't need to import other files inside yours to use properties from them. There's a specific file called ```application.scss``` where every SCSS file should be imported in the desired priority order. This works just like the stylesheet elements in the head of an html, when repeated rules are present the rule that was imported last will override the other.

#### Vendors
To add a vendor simply install and save it using npm, then add the path of the source files, relative to the **node_modules** folder, to **vendorJs.js** or **vendorCss.js** depending on what you are adding.
i.e: Adding jquery
```
npm install --save jquery
```
This will generate the **jquery** folder inside **node_modules** and add the register the dependency in the `package.json` file. Then, add the source file of jquery to **vendorJs.js**. It should look like this:
```
module.exports = [
  'jquery/dist/jquery.js',
];
```
### CSS Regresion Testing

If you want to test how your views change according to the changes in your css we are using [BackstopJS](https://github.com/garris/BackstopJS), so follow this instructions:

- Add the views you want to test in the scenarios array inside the ```backstop.json``` file.
- Go to ```node_modules/backstopjs```
- Run ```npm run reference``` to generate reference images
- Run ```npm run test``` to check the images again. Your browser will show a report with the image diffs, so if there's an error fix it and run the reference command again.

#### Testing

##### Unit testing
We combine the power of [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/) frameworks to develop our unit testing. You can find the configuration files in the ```test/unit``` folder and you can find the tests inside the ```test/unit/specs``` folder.
To run these specs execute the following:
```
npm run karma
```

##### End to end tests

We combine the power of Protractor and Jasmine frameworks to develop our end to end tests. You can find the configuration files in the test/e2e folder and you can find the tests inside the test/e2e/specs folder.

The first time you are running the tests, you probably need to update webdriver. Use the following
```
./node_modules/.bin/webdriver-manager update
```
To run these specs against staging, execute the following:
```
npm run protractor
```
To run these specs against your development environment, execute the following:
```
npm run protractor-local
```

#### Maintenance
##### Outdated
If your app will be down for a period of time, you can set up a maintenance page during the downtime.
```gulp build:maintenance``` will move the contents of ```src/maintenance``` to the build folder, then
you only need to deploy that.
If you want to customize the maintenance page, just change the contents of the ```src/maintenance``` folder.

#### Image compression

If you want to reduce your assets weight so that the build is ligther, you can turn on image compression option. To make this possible, set `imageCompression` variable as `true` in `gulp/config.js` file.

##### Webp Compression

This is accomplished using the (webp)[https://developers.google.com/speed/webp/?hl=en] image format.

Things to take into account:
- If your assets include `.png` files, make sure `libpng` library is already installed.
- If your assets include `.jpeg` files, make sure `libjpeg` library is already installed.

If any of these were not installed before you will need reinstall the webp conversion tool:
```
npm remove gulp-webp
```
Now, install the missing libraries.

Finally, reinstall `gulp-webp` with the following command:
```
npm install
```

Remember that you now have to reference your assets with `.webp` extension.

## Deploy

#### S3
In order to deploy you must first create **config/aws.js** file with the credentials of the Amazon S3 bucket for each environment.
The file needs to have to follow the format specified in *config/aws.js.example*

Then just run ```gulp s3 --env <environment name>``` with your desired env as parameter.


Finally, you need to add a custom routing rule so that s3 handles the 404 (or 403 depending or the bucket policy) to the s3 properties. In the **Static Website Hosting** panel, check the **Enable website hosting** option and complete the form with the following:
```
Index document: index.html
```
And add this redirect rule (Depending on the bucket policy the error code to handle can be either 404 or 403)
```
<RoutingRules>
    <RoutingRule>
        <Condition>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <ReplaceKeyPrefixWith>#/</ReplaceKeyPrefixWith>
        </Redirect>
    </RoutingRule>
</RoutingRules>
```

#### Heroku
Pushing the desired branch to heroku should be enough.

## Troubleshooting

#### npm permissions
If you are struggling with permission problems when using npm, you can try the following commands to avoid using ```sudo``` every time you have this troubles.

```bash
sudo chown -R $USER ~/.npm
```
```bash
sudo chown -R $USER .
```

#### S3 deploy
NOTE: You must have the corrects AIM permissions, if not, amazon will report an Access Denied error

#### gulp watch
If having problems with ```gulp watch```, run ```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```.
This solution was found [here](https://github.com/gulpjs/gulp/issues/217).

## Google Analytics
In order to monitor your page by google analytics set GOOGLE_ANALYTICS_TRACK_ID with the tracking id in each secrets file in the ```config``` folder at the root of the project.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project is maintained by [Sebastian Balay](https://github.com/sbalay) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)


## License

**frontend-bootstrap** is available under the MIT [license](LICENSE).

    Copyright (c) 2015 Sebastián Balay <sebastian.balay@wolox.com.ar>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
