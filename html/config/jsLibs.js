"use strict";

const { params,  plugins : $ } = require("./variables");

module.exports = () =>
    $.gulp.src(params.jsLibs)
        .pipe($.plumber())
        .pipe($.concat({
            path: 'libs.js'
        }))
        .pipe($.gulp.dest(params.out))
        .pipe($.uglify())
        .pipe($.gulp.dest(params.prod))
        .pipe($.gulp.dest(params.site))
        .pipe($.reload({ stream: true }));