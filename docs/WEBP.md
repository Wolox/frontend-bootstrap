### Webp Compression
To enable webp compression set the `webp` flag to `true` in the environment config file: `~/config/<env>.js`.
Then, let's install the required dependecies and modify the assets pipeline:
- Install gulp-webp: `npm install --save-dev gulp-webp`
- In all your assets gulp tasks, add the webp transformation before return the file stream. For example, the base assets task should look like this:

```js
...
import webp from 'gulp-webp';

gulp.task('assets', ['clean:assets'], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulpif(taskOptions.webp, webp()))
    .pipe(gulp.dest(localConfig.dest));
});
```

Remember that you now have to reference your assets with `.webp` extension.

#### Troubleshooting
Things to take into account:
- If your assets include `.png` files, make sure `libpng` library is already installed.
- If your assets include `.jpg` files, make sure `libjpeg` library is already installed.

If any of these are not installed you have to first uninstall `webp` like the following:
```
npm remove gulp-webp
```
Now, install the missing libraries.

Finally, reinstall `gulp-webp` with the following command:
```
npm install
```
