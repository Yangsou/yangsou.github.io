'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./assets/sass/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(cssmin())
    .pipe(gulp.dest('./assets/css'));
});
