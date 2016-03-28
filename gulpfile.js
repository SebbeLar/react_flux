'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    vinyl = require('vinyl-source-stream');

var config = {
    port: 8080,
    devBaseUrl: 'http://localhost',
    path: {
        html: './src/*.html',
        js: './src/**/*.js',
        dist: './dist'
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

gulp.task('watch', function() {
    gulp.watch(config.path.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']);
