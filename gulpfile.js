var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

gulp.task('process',function(){
    return gulp.src(['./index.html','./app.js'])
    .pipe(livereload());
});

gulp.task('watch',function(){
    livereload.listen();
    gulp.watch(['./index.html','./app.js'],['process']);
});
