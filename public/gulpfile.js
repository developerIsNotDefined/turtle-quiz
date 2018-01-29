const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src([
    'node_modules/angular-toastr/dist/angular-toastr.css',
    './sass/main.scss'
  ])
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./assets/stylesheets'));
});

gulp.task('watch', () => {
  watch('./sass/**/*.scss', () => {
    gulp.start('sass');
  });
});

gulp.task('default', ['sass', 'watch']);