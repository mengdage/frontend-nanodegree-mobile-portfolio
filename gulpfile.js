var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence'),
    psi = require('psi'),
    ngrok = require('ngrok');


var directories = {
  src: 'src/',
  dist: 'dist/',
};

var files = {
  htmlFiles: '**/*.html',
  cssFiles: '**/*.css',
  jsFiles: '**/*.js',
  imgFiles: '**/images/**',
  lintableJsFiles: ['gulpfile.js', directories.src + '**/*.js']
};

gulp.task('clean:dist', function() {
  return del([directories.dist]);
});

gulp.task('clean', ['clean:dist']);

gulp.task('prep', ['clean'], function() {
  return gulp.src(
    [
      directories.src + files.htmlFiles,
      directories.src + files.cssFiles,
      directories.src + files.jsFiles,
      directories.src + files.imgFiles
    ])
    .pipe(gulp.dest(directories.dist));
});

gulp.task('minify:html', function() {
  return gulp.src(directories.dist+files.htmlFiles)
              .pipe(plumber())
              .pipe(htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
              }))
              .pipe(gulp.dest(directories.dist));
})

gulp.task('minify:css', function() {
  return gulp.src(directories.dist+files.cssFiles)
              .pipe(plumber())
              .pipe(cssnano())
              .pipe(gulp.dest(directories.dist));

});

gulp.task('minify:js', function() {
  return gulp.src(directories.dist+files.jsFiles)
              .pipe(plumber())
              .pipe(uglify())
              .pipe(gulp.dest(directories.dist));
});

gulp.task('minify:images', function() {
  return gulp.src(directories.dist+files.imgFiles)
              .pipe(plumber())
              .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
              ]))
              .pipe(gulp.dest(directories.dist));
});

gulp.task('minify', ['minify:html', 'minify:css', 'minify:js', 'minify:images']);

gulp.task('lint:js', function() {
  return gulp.src(files.lintableJsFiles)
              .pipe(jshint())
              .pipe(jshint.reporter());
});

gulp.task('lint', ['lint:js'], function() {
  gulp.watch(files.lintableJsFiles, ['lint:js']);
});

gulp.task('build:dist', function() {
  runSequence('prep', 'minify');
})

gulp.task('serve', function() {
  browserSync.init({
    server: {
    baseDir: directories.src
    }
  });

  gulp.watch(directories.src, browserSync.reload);
});

gulp.task('serve:dist', function() {
  browserSync.init({
    server: {
      baseDir: directories.dist
    },
    port: 8080,
    open: false
  });
});

gulp.task('serve:ngrok', function() {
  browserSync.init({
    server: {
      baseDir: directories.dist
    },
    port: 8080,
    open: false
  }, function (err, bs) {
    var port = bs.options.get('port');
   ngrok.connect(port, function (err, url) {
     console.log('------------------------------------------------------------------\n');
     console.log('Forwarding:\t' + url + ' -> localhost:'+port);
     console.log('\n------------------------------------------------------------------');
   });
});

  gulp.watch(directories.dist+'*', browserSync.reload);
});
