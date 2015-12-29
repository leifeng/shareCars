var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require("gulp-util"),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    csso = require('gulp-csso'),
    merge = require('merge-stream'),
    webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");


gulp.task('webpack', function (callback) {
    var myConfig = Object.create(webpackConfig);
    webpack(
        myConfig
        , function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({}));
            callback();
        });
});

gulp.task('html', function () {
    return gulp.src('src/html/*.html')
        .pipe(gulp.dest('dist'));
});

//scss
gulp.task('scss', function () {
    return sass('src/scss/pages/*.scss')
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('jsLib', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js/lib'))
});

//图片压缩
gulp.task('imgMini', function () {
    return gulp.src('src/images/*.png').
        pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })).pipe(gulp.dest('dist/images'));
});


gulp.task('sprite', function () {
    var spriteData = gulp.src('src/images/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.min.css'
    }));
    var imgStream = spriteData.img
        .pipe(gulp.dest('src/images'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
});

gulp.task('sprite_point', function () {
    var spriteData = gulp.src('src/images/pointImages/*.png').pipe(spritesmith({
        imgName: 'pointImages.png',
        cssName: 'pointImages.min.css'
    }));
    var imgStream = spriteData.img
        .pipe(gulp.dest('src/images'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
});

gulp.task('sprite_yy', function () {
    var spriteData = gulp.src('src/images/yyImages/*.png').pipe(spritesmith({
        imgName: 'yyImages.png',
        cssName: 'yyImages.min.css'
    }));
    var imgStream = spriteData.img
        .pipe(gulp.dest('src/images'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
});

gulp.task('sprite_uc', function () {
    var spriteData = gulp.src('src/images/ucImages/*.png').pipe(spritesmith({
        imgName: 'ucImages.png',
        cssName: 'ucImages.min.css',
        padding: 10
    }));
    var imgStream = spriteData.img
        .pipe(gulp.dest('dist/css'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
});

gulp.task('sprite_pay', function () {
    var spriteData = gulp.src('src/images/payImages/*.png').pipe(spritesmith({
        imgName: 'payImages.png',
        cssName: 'payImages.min.css'
    }));
    var imgStream = spriteData.img
        .pipe(gulp.dest('dist/css'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
});
gulp.task('sprite_carInfo', function () {
    var spriteData = gulp.src('src/images/carInfoImages/*.png').pipe(spritesmith({
        imgName: 'carInfoImages.png',
        cssName: 'carInfoImages.min.css'
    }));
    var imgStream = spriteData.img
        .pipe(gulp.dest('dist/css'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
});