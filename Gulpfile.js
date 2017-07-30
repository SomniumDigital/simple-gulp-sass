const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('sass', () => (
  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
));

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass'])
  .on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('sass:watch', ['browserSync', 'sass'], () => (
  gulp
    .watch('src/scss/**/*.scss', ['sass'])
));

gulp.task('default', ['sass', 'sass:watch']);

gulp.task('build', ['sass']);
