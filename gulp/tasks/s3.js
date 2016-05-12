import gulp from 'gulp';
import awspublish from 'gulp-awspublish';
import invalidate from 'gulp-cloudfront-invalidate-aws-publish';
import runSequence from 'run-sequence';
import gulpif from 'gulp-if';
import parallelize from 'concurrent-transform';
import { env } from '../config';

const localConfig = {
  buildSrc: './build/**/*',
  getAwsConf (environment) {
    const conf = require('../../config/aws');
    if (!conf[environment]) {
      throw new Error(`No aws conf for env: ${environment}`);
    }
    if (!conf[`${environment}Headers`]) {
      throw new Error(`No aws headers for env: ${environment}`);
    }
    return { keys: conf[environment], headers: conf[`${environment}Headers`] };
  }
};

gulp.task('s3push', () => {
  const awsConf = localConfig.getAwsConf(env);
  const publisher = awspublish.create(awsConf.keys);
  return gulp.src(localConfig.buildSrc)
    .pipe(awspublish.gzip({ ext: '' }))
    .pipe(parallelize(publisher.publish(awsConf.headers), 100))
    .pipe(publisher.sync())
    .pipe(awspublish.reporter())
    .pipe(gulpif(!!awsConf.keys.distribution, invalidate(awsConf.keys)));
});

gulp.task('s3', (cb) => {
  runSequence('clean', 'build', 's3push', cb);
});
