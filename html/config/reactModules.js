"use strict";

const { params,  plugins : $ } = require("./variables");
const webpackConfig = require('../webpack.config.js');
const webpackGulp = require("webpack-stream");
const webpack = require('webpack');

module.exports = () => {
    return $.gulp.src(params.reactEntry)
        .pipe(webpackGulp(webpackConfig, webpack))
        .pipe($.gulp.dest(params.out))        
        .pipe($.gulp.dest(params.prod))        
        .pipe($.gulp.dest(params.site))
        .pipe($.reload({ stream: true }));
}