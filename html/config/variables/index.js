"use strict";

const { bs, reload } = require("../browserSync");

module.exports = {
    params : {
        out: "public",
        prod: "public/prod",
        htmlSrc: "pug/index.pug",
        levels: ["xs", "sm", "md", "lg", "xl"],
        html: ["pug/*.pug", "blocks/**/*.pug"],
        blocksName : [
            "header",
            "nav",
            "button",
            "breadcrumbs",
            "filters",
            "title",
            "catalog",
            "filters",
            "card",
            "pagination"
        ],
        js: [],
        jsLibs: [
            "node_modules/nouislider/distribute/nouislider.min.js",
            "node_modules/jquery-nice-select/js/jquery.nice-select.min.js",
        ],
        json: "blocks/**/*.json",
        css: [],
        reactEntry: "./reactModules/reactindex.js",
        sass: [
            "setting.block/bootstrap.scss",
            "setting.block/custom.scss",
            "node_modules/nouislider/distribute/nouislider.min.css",
            "node_modules/jquery-nice-select/css/nice-select.css",
        ],
        images: [],
        type: {
            css   : "blocks/**/**/*.css",
            sass  : "blocks/**/**/*.scss",
            js    : "blocks/**/**/*.js",
            images: "blocks/**/**/*.{gif,jpg,png,ico,svg}"
        }
    },
    plugins: {
        gulp         : require("gulp"),
        concat       : require("gulp-concat"),
        rename       : require("gulp-rename"),
        path         : require("path"),
        url          : require("gulp-css-url-adjuster"),
        autoprefixer : require("autoprefixer"),
        postcss      : require("gulp-postcss"),
        pug          : require("gulp-pug"),
        gcmq         : require('gulp-group-css-media-queries'),
        babel        : require("gulp-babel"),
        jshint       : require("gulp-jshint"),
        plumber      : require("gulp-plumber"),
        uglify       : require("gulp-uglify"),
        sass         : require("gulp-sass"),
        fs           : require("fs"),
        clean        : require("gulp-clean"),
        replace      : require("gulp-replace"),
        merge        : require("gulp-merge-json"),
        htmlmin      : require("gulp-htmlmin"),
        csso         : require("postcss-csso"),
        bs           : bs,
        reload       : reload
    }
};