[![FEArmy](./internal/FEA_open_source_sm.png)](https://github.com/orgs/Wolox/teams/front-end-army/members)
# Frontend Bootstrap
Kickoff for landing pages & multi-page websites.

## Main Tools

+ [Webpack](https://webpack.js.org/)
+ [Babel](https://babeljs.io/)
+ [Pug](https://pugjs.org)
+ [Sass](http://sass-lang.com)
+ [VueJS](https://vuejs.org/)
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

We use HTTPS protocol to make our site secure and also because it's required for some cool webpack configurations and it will allow us to develop a custom service worker.

#### SCSS
When creating SCSS files you don't need to import other files inside yours to use properties from them. There's a specific file called `application.scss` where every SCSS file should be imported in the desired priority order. This works just like the stylesheet elements in the head of an html, when repeated rules are present the rule that was imported last will override the other.

## Further reading
Check the docs folder for extra help on usual tasks or issues:
  - [Adding google analytics](internal/ADDING_GOOGLE_ANALYTICS.md)
  - [Troubleshooting](internal/TROUBLESHOOTING.md)
  - [Maintenance mode](internal/MAINTENANCE_MODE.md)

## Contributing

check [this](./CONTRIBUTING.md) document.

## About

This project is maintained by [The Front-End Army](https://github.com/orgs/Wolox/teams/front-end-army) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)
