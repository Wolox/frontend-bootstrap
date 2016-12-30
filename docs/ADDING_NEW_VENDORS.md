### Vendors
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
