var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

// Compile sass into CSS & auto-inject into browsers
gulp.task('css:compile', function() {
  return gulp.src(['node_modules/bulma/bulma.sass', 'src/sass/*.sass'])
      .pipe(sass())
      .pipe(gulp.dest("css"))
      .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('css:minify', gulp.series('css:compile', function() {
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
gulp.task('dev', gulp.series('css', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['./scss/*.scss'], ['css']);
  gulp.watch("./*.html").on('change', browserSync.reload);
}));

// List all files that are relevant for deployment
var globs = [
  'css/**',
  'img/**',
  'index.html'
];

// LIVE/PROD Deploy to http://eternityfest.de via FTP
gulp.task('deploy', function () {

  var prodServer = ftp.create( {
    host: 'ftp.boe.de1.ccsss',
    user: '398583-mhe',
    password: 'hrfLQp&ikm2yz3cHBUjo',
    parallel: 10,
    log:      gutil.log
  } );

  return gulp.src( globs, { base: '.', buffer: false } )
      .pipe(prodServer.newer('/ef'))
      .pipe(prodServer.dest('/ef'));
} );
