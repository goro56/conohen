import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins()

gulp.task('babel', () =>
  gulp.src('src/js/*.js')
    .pipe($.babel())
    .pipe(gulp.dest('./public/js/'))
)

gulp.task('browser-sync', () =>
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  })
);

gulp.task('watch', () => {
  gulp.watch('./src/js/*.js', ['babel', 'browser-sync']);
  gulp.watch('./src/*.html', ['copy', 'browser-sync']);
});

gulp.task('copy', () =>
  gulp.src(
    [ './src/*.html' ],
    { base: 'src' }
  )
  .pipe( gulp.dest( './public/' ) )
);

gulp.task('default', ['babel', 'copy', 'watch', 'browser-sync']);
