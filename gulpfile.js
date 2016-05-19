var gulp = require('gulp');
var extension = require('gulp-ext');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var minifyejs = require('gulp-minify-ejs');
var templateCache = require('gulp-angular-templatecache');

gulp.task('cache-templates', function () {
    gulp.src([
        'views/partials/*.ejs',
        'views/partials/administrator/*.ejs', 
        'views/partials/engine/*.ejs', 
        'views/partials/engine/**/*.ejs'
        ])
        .pipe(extension.crop('.ejs'))
        .pipe(minifyejs())
        .pipe(templateCache('templates.js', {
            module: 'infographica',
            root: 'partials/',
            standalone: false
        }))
        .pipe(gulp.dest('public/assets/javascripts/gulpcache'));
});

gulp.task('default',['cache-templates'], function () {
    gulp.src([
        'public/*.js',
        'public/modules/*.js',
        'public/modules/controllers/*.js',
        'public/modules/directives/*.js',
        'public/modules/factories/*.js',
        'public/modules/services/*.js',
        'public/assets/javascripts/gulpcache/*.js'
        ])
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('source.js'))
        .pipe(gulp.dest('public/assets/javascripts/'));
});