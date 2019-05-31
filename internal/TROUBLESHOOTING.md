### Troubleshooting

#### npm permissions
If you are struggling with permission problems when using npm, you can try the following commands to avoid using ```sudo``` every time you have this troubles.

```bash
sudo chown -R $USER ~/.npm
```
```bash
sudo chown -R $USER .
```
#### Incorrect node version
If ```Unexpected token``` error occurs when you try to commit, please make sure you have installed nvm with node version 10 or higher as default.
Use this command for get current default version
```bash
nvm alias default
```
Use this command for install specific node version (example with 10.16.0)
```bash
nvm install 10.16.0
```
Use this command for set node version as default
```bash
nvm alias default 10.16.0
```
Now try to commit.