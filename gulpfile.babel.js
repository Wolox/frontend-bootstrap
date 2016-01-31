/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible for creating multiple tasks,
  each task has been broken out into its own file in gulp/tasks.
  Any files in that directory get automatically required below.
*/

import requireDir from 'require-dir';

requireDir('./gulp/tasks', { recurse: true });
