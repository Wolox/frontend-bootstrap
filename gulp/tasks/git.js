import gulp from 'gulp';
import git from 'gulp-git';

import { env } from '../config';
import awsConf from '../../config/aws';

gulp.task('git-tag', function (cb) {
  const randomHash = Math.random().toString(36).substring(7).substring(0, 8);
  const dateString = new Date().toISOString().substring(0, 10);
  const tagMessage = `${dateString}: Deploy to s3 bucket with name ${awsConf[env].params.Bucket}`;
  git.tag(`${env}.${randomHash}`, tagMessage, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', { args: '--tags' }, cb);
  });
});
