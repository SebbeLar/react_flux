'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat');

var config = {
    port: 8080,
    devBaseUrl: 'http://localhost',
    path: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.davBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function() {
    gulp.src(config.path.html)
        .pipe(gulp.dest(config.path.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.path.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.path.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.path.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.path.dist + '/css'));
});

gulp.task('watch', function() {
    gulp.watch(config.path.html, ['html']);
    gulp.watch(config.path.js, ['js']);
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);
