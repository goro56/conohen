var gulp = require("gulp");
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
});

gulp.task('babel', function() {
  gulp.src('./src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['babel', 'browser-sync']);
  gulp.watch('./src/*.html', ['copy', 'browser-sync']);
});

gulp.task( 'copy', function() {
  return gulp.src(
    [ './src/*.html' ],
    { base: 'src' }
  )
  .pipe( gulp.dest( './public/' ) );
} );

gulp.task('default', ['babel', 'copy', 'watch', 'browser-sync']);
