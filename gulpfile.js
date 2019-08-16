var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');
var ftp = require('gulp-ftp');


// Static Server + watching scss/html files

gulp.task('sass', function() {
    return gulp.src('scss/*.s?ss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
 
		.pipe(gulp.dest("style/"))
        .pipe(browserSync.stream());

});

gulp.task('serve', function() {

   browserSync.init({
       server: ""
   });

   gulp.watch('scss/*.s?ss', gulp.series('sass'));
   // gulp.watch('src/*.html', gulp.series(function indexChange() {
   //     browserSync.reload();
   // }));
    gulp.watch('*.html').on('change', function() {
        browserSync.reload();
    });
    gulp.watch('src/*.js').on('change', function() {
        browserSync.reload();
    });
  
});

gulp.task('default', gulp.series('sass', 'serve'));