### CSS Regresion Testing
If you want to test how your views change according to the changes in your css we are using [BackstopJS](https://github.com/garris/BackstopJS), so follow this instructions:

- Add the views you want to test in the scenarios array inside the ```backstop.json``` file.
- Go to ```node_modules/backstopjs```
- Run ```npm run reference``` to generate reference images
- Run ```npm run test``` to check the images again. Your browser will show a report with the image diffs, so if there's an error fix it and run the reference command again.
