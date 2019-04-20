'use strict'

const gulp          = require('gulp')
const sass          = require('gulp-sass')
const sourcemaps    = require('gulp-sourcemaps')
const connect       = require('gulp-connect')
const htmlmin       = require('gulp-htmlmin')
const uglify        = require('gulp-uglify-es').default

const paths = {
  index: './index.html',
  sass: 'src/sass/**/*.scss',
  script: 'src/scripts/**/*.js',
  sw: 'src/*.js',
}

const sassGulp = () => gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))

const jsGulp = () => gulp.src(paths.script)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))


const swGulp = () => gulp.src(paths.sw)
    .pipe(uglify())
    .pipe(gulp.dest('./'))

const htmlGulp = () => gulp.src(paths.index)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./'));


const watchJS = () => gulp.watch(paths.script, gulp.series(jsGulp, reload));
const watchSW = () => gulp.watch(paths.script, gulp.series(swGulp, reload));
const watchCSS = () => gulp.watch(paths.sass, gulp.series(sassGulp, reload));
const watchHTML = () => gulp.watch(paths.index, reload);

const server = () => connect.server({livereload: true});
const reload = () => gulp.src(paths.index).pipe(connect.reload());

const watch = gulp.parallel(
  watchCSS, watchJS, watchHTML, watchSW
)


exports.build = gulp.parallel(jsGulp, sassGulp, htmlGulp, swGulp)

exports.watch = gulp.parallel(server, watch)
