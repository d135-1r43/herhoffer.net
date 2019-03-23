var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var scp = require('gulp-scp2');

// Compile sass into CSS & auto-inject into browsers
gulp.task('css:compile', function () {
  return gulp.src(['node_modules/bulma/bulma.sass', 'src/sass/*.sass'])
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('css:minify', gulp.series('css:compile', function () {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}));

// CSS
gulp.task('css', gulp.series('css:compile', 'css:minify'));

// Default task
gulp.task('default', gulp.series('css'));

// Dev task
gulp.task('dev', gulp.series('css', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
}));