const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('connect', function connect() {
  $.connect.server({
    root: '.',
    livereload: true,
  });
});


gulp.task('serve:demo', function serveDemo() {
   browserSync.init({
        server: {
            baseDir: "./",
            index: "demo/index.html"
        },
        files: ["demo/**/*.html", "demo/**/*.js", "dist/**/*.js"]
    });  
});

gulp.task('connect:demo', ['serve:demo', 'watch:demo', 'watch:srcFiles']);