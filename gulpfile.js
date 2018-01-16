
var gulp = require('gulp'),
  watch = require('gulp-watch'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  merge = require('merge-stream'),
  scss = require('gulp-scss');

function version(){
  var now = new Date(),
    Y = now.getFullYear(),
    m = now.getMonth()+1,
    d = now.getDate(),
    H = now.getHours(),
    i = now.getMinutes(),
    s = now.getSeconds();

    if(H < 10) {
        H = '0' + H;
    }

    if(i < 10) {
        i = '0' + i;
    }

    if(s < 10) {
        s = '0' + s;
    }

    return String(10000*Y + 100*m + d + '.' + H + i + s);
}

gulp.task('default', ['watch']);
//gulp.task('default', ['build-js', 'build-css']);

gulp.task('build-css', function(){
  var full = gulp.src([
    'node_modules/material-design-lite/material.min.css',
    'public/src/scss/main.scss'
  ])
  . pipe(scss())
  . pipe(concat('default.css'))
  . pipe(gulp.dest('public/dist/css'));

  var min = gulp.src([
    'node_modules/material-design-lite/material.min.css',
    'public/src/scss/main.scss'
  ])
  . pipe(scss())
  . pipe(cleanCSS())
  . pipe(concat('default.min.' + version() + '.css'))
  . pipe(gulp.dest('public/dist/css'));

  return merge(full, min);
});

gulp.task('build-js', function(){
  var full = gulp.src([
    'node_modules/material-design-lite/material.min.js',
    'public/src/js/main.js'
  ])
  . pipe(concat('default.js'))
  . pipe(gulp.dest('public/dist/js'));

  var min  = gulp.src([
    'node_modules/material-design-lite/material.min.js',
    'public/src/js/main.js'
  ])
  . pipe(concat('default.min.' + version() + '.js'))
  . pipe(uglify())
  . pipe(gulp.dest('public/dist/js'));

  return merge(full, min);
});

gulp.task('build-apps', function(){

  var posts  = gulp.src([
    'public/src/js/apps/posts.js'
  ])
  //. pipe(rename('posts.min.' + version() + '.js'))
  . pipe(rename('posts.min.js'))
  //. pipe(uglify())
  . pipe(gulp.dest('public/dist/js/apps'));

  var users  = gulp.src([
    'public/src/js/apps/users.js'
  ])
  //. pipe(concat('posts.min.' + version() + '.js'))
  . pipe(rename('users.min.js'))
  //. pipe(uglify())
  . pipe(gulp.dest('public/dist/js/apps'));

  return merge(posts, users);
});

gulp.task('watch', function(){
  gulp.watch('./public/src/js/**/*.js', ['build-js']);
  gulp.watch('./public/src/scss/**/*.scss', ['build-css']);
});
