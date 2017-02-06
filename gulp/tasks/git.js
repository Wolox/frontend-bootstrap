import gulp from 'gulp';
import git from 'gulp-git';

import { env } from '../config';

const getTagMessage = () => {
  const dateString = new Date().toISOString().substring(0, 10);
  let tagMessage;
  try {
    const awsConf = require('../../config/aws');
    tagMessage = `${dateString}: Deploy to s3 bucket with name ${awsConf[env].params.Bucket}`;
  } catch (e) {
    tagMessage = `${dateString}: Tag for env: ${env}`;
  }
  return tagMessage;
};

gulp.task('git-tag', function (cb) {
  const randomHash = Math.random().toString(36).substring(7).substring(0, 8);
  git.tag(`${env}.${randomHash}`, getTagMessage(), function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', { args: '--tags' }, cb);
  });
});
