const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

gulp.task('sass', function(){
  return gulp.src('./sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/stylesheets'));
});

gulp.task('watch:sass', function(){
  watch('./sass/**/*.scss', function(){
    gulp.start('sass');
  });
});

gulp.task('default', ['sass']);
