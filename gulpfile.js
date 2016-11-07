var gulp = require('gulp');
var react = require('gulp-react');
var conf = {
  script:['src/js/*.jsx','src/js/**/*.jsx']
}
gulp.task('default', function () {
    return gulp.src(conf.script)
        .pipe(react())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', function () {
    gulp.watch(conf.script, ['default']);
});
