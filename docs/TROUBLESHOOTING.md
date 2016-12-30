### Troubleshooting

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
If having problems with `gulp watch`, run `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.
This solution was found [here](https://github.com/gulpjs/gulp/issues/217).
