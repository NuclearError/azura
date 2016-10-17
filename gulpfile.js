// Gulp
var gulp = require('gulp');

// Plugins
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
//var stripDebug = require('gulp-strip-debug');
var todo = require('gulp-todo');
//var sass = require('gulp-ruby-sass');
//var cache = require('gulp-cache');

// GULP TASKS //

// Concatenate and minify JS
gulp.task('tidyJS', function() {
    return gulp.src('js/**/*.js')
    	// .pipe(stripDebug()) // comment this out when developing to allow console logs
      	// .pipe(concat('scripts.js'))
        // .pipe(rename({suffix: '.min'}))
        /*
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        */
        //.pipe(gulp.dest('public/js'));
});

// generate todo.md from JS files
gulp.task('generateToDoList', function() {
    gulp.src('js/**/*.js')
        //.pipe(todo())
        //.pipe(gulp.dest('/'));
        .pipe(todo().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('./'));
});

// Watch files for changes
gulp.task('watchFiles', function() {
  gulp.watch('js/**/*.js', ['tidyJS', 'generateToDoList']);
});

// Gulp Tasks
gulp.task('js', ['tidyJS', 'generateToDoList']);
gulp.task('default', ['watchFiles']);
