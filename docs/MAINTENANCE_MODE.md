### Maintenance
If your app will be down for a period of time, you can set up a maintenance page during the downtime.
`gulp build:maintenance` will move the contents of `src/maintenance` to the build folder, then you only need to deploy that.
If you want to customize the maintenance page, just change the contents of the `src/maintenance` folder.
