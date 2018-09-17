# Frontend Bootstrap

Kickoff for web applications written in Vue.js

## Main Tools

+ [VueJS](https://vuejs.org/)
+ [Babel](https://babeljs.io/)
+ [Pug](https://pugjs.org)
+ [Sass](http://sass-lang.com)
+ [Webpack](https://webpack.js.org/)
+ [ESLint](http://eslint.org/)

## First steps
#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred. Also, you may find this [tool](https://github.com/wbyoung/avn) useful to automate version changing between projects.

#### Getting the dev dependencies
Run `npm i` from rootpath of the project.

## Development

#### Run the project
After doing `npm i`,  execute `npm start`. This will run the project instance in:
```
  http://localhost:3000/
```

We use HTTPS protocol because it's required for some cool webpack configurations and it will allow us to develop a custom service worker.

#### SCSS
When creating SCSS files you don't need to import other files inside yours to use properties from them. There's a specific file called `application.scss` where every SCSS file should be imported in the desired priority order. This works just like the stylesheet elements in the head of an html, when repeated rules are present the rule that was imported last will override the other.

## Deploy

#### S3
In order to deploy you must first create **config/aws.js** file with the credentials of the Amazon S3 bucket for each environment. The file needs to have to follow the format specified in *config/aws.js.example*

Then just run `gulp s3 --env <environment name>` with your desired env as parameter.

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
