Frontend Bootstrap
===============

Kickoff for web applications.

## Main Tools
+ [Babel](https://babeljs.io/)
+ [Sass](http://sass-lang.com)
+ [Pug](https://pugjs.org)
+ [ESLint](http://eslint.org/)

## First steps
#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred. Also, you may find this [tool](https://github.com/wbyoung/avn) useful to automate version changing between projects.

#### Getting the dev dependencies
Run `npm install` from rootpath of the project.

## Development

#### Environments
By default, the environment will be **development**, but you can easily change it using the **env** param in your gulp tasks: ```gulp --env production```

#### SCSS
When creating SCSS files you don't need to import other files inside yours to use properties from them. There's a specific file called `application.scss` where every SCSS file should be imported in the desired priority order. This works just like the stylesheet elements in the head of an html, when repeated rules are present the rule that was imported last will override the other.

#### Vendors
To add a vendor simply install and save it using npm. Then add the path of the source files relative to the **node_modules** folder, to **vendorJs.js** or **vendorCss.js** depending on what you are adding.
i.e: Adding jquery
```bash
npm install --save jquery
```
This will generate the **jquery** folder inside **node_modules** and add the register the dependency in the `package.json` file. Then, add the source file of jquery to **vendorJs.js**. It should look like this:
```
module.exports = [
  'jquery/dist/jquery.js',
];
```

#### Testing

##### Unit testing
We combine the power of [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/) frameworks to develop our unit testing. You can find the configuration files in the `test/unit` folder and you can find the tests inside the `test/unit/specs` folder.
To run these specs execute the following: `npm run test`

##### End to end tests

We combine the power of Protractor and Jasmine frameworks to develop our end to end tests. You can find the configuration files in the test/e2e folder and you can find the tests inside the test/e2e/specs folder.

The first time you are running the tests, you probably need to update webdriver. Use the following: `./node_modules/.bin/webdriver-manager update`
To run these specs against the url in the protractor conf execute the following: `npm run protractor`
To run these specs against your development environment, execute the following: `npm run protractor-local`. This will hit the app in `localhost:3000`.

## Deploy

#### S3
In order to deploy you must first create **aws.js** file with the credentials of the Amazon S3 bucket for each environment.
The file needs to have to follow the format specified in *config/aws.js.example*

Then just run `aws-deploy --env <environment name>` with your desired env as parameter.

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

## Further reading
Check the docs folder for extra help on usual tasks or issues:
  - [Adding new vendors](docs/ADDING_NEW_VENDORS.md)
  - [Adding google analytics](docs/ADDING_GOOGLE_ANALYTICS.md)
  - [Troubleshooting](docs/TROUBLESHOOTING.md)
  - [Maintenance mode](docs/MAINTENANCE_MODE.md)
  - [Webp assets](docs/WEBP.md)
  - [Css regression testing](docs/CSS_REGRESSION_TESTING.md)


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
