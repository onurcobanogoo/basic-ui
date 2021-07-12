const gulp = require('gulp');
const { series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./app/assets/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./app/assets/styles/'))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './app/all-pages.html'
    });
    gulp.watch('./app/assets/styles/**/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/assets/scripts/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = series(style, watch);