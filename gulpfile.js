const prettyTypescript = require('pretty-typescript');
const gulp = require('gulp');

gulp.task('prettify', function () {
  gulp.src('src/**/*.ts')
    .pipe(prettyTypescript())
    .pipe(gulp.dest('src'));
});


gulp.task('default', ['prettify']);
