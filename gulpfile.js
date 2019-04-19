'use strict'

const gulp       = require('gulp')
const sass       = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const connect    = require('gulp-connect')

// file paths for assets
const paths = {
  index: './index.html',
  sass: 'src/sass/**/*.scss',
  script: 'src/scripts/**/*.js'
}

// const allTasks = ['server', 'watch', 'js', 'sass',]

const sassGulp = () => gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))

const jsGulp = () => gulp.src(paths.script)
    .pipe(gulp.dest('dist/scripts'))

const watchJS = () => gulp.watch(paths.script, gulp.series(jsGulp, reload));
const watchCSS = () => gulp.watch(paths.sass, gulp.series(sassGulp, reload));
const watchHTML = () => gulp.watch(paths.index, reload);

const server = () => connect.server({livereload: true});
const reload = () => gulp.src(paths.index).pipe(connect.reload());

// handle changes and reload server afterwards.
const watch = gulp.parallel(
  watchCSS, watchJS, watchHTML
)


exports.build = gulp.parallel(jsGulp, sassGulp)

exports.watch = gulp.parallel(server, watch)
