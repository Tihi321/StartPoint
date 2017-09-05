var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename'); 
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

//script paths
var jsFiles = ['src/js/master.js'];

var jsDest = 'dist/js';
var cssDest = 'dist/css';
var sassSrcPath = 'src/sass/**/*.scss';
var imageSrcPath = 'src/images/*';
var imageDest = 'dist/images';

// convert sass styles into css and create sourcemaps for it
gulp.task('css',function(){
	return gulp.src(sassSrcPath)
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest(cssDest))
	.pipe(browserSync.stream())
});


// copy images and minifies it
gulp.task('images', function(){
	return gulp.src(imageSrcPath)
	.pipe(imagemin())
	.pipe(gulp.dest(imageDest))
});

// copies html files on change
gulp.task('copy', function(){
	return gulp.src('src/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream())
});

// sets direstory for browsersync
gulp.task('browserSync',function(){
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
});


// concatenates js files and minifies them
gulp.task('scripts-min', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.stream());
});


gulp.task('script-min', function() {  
    return gulp.src('dist/js/libraries/codemirror/inlet.js')
        .pipe(rename('inlet.min2.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/libraries/codemirror'));
});


gulp.task('watch', ['browserSync', 'css'], function(){
	gulp.watch('src/sass/**/*.scss', ['css']);
	gulp.watch('src/*.html', ['copy']);
	gulp.watch('src/js/*.js', ['scripts-min']);
});




/*

// create bundle of css dependencies
gulp.task('bundlecss', function () {
  return gulp.src(cssDepFiles)
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest(cssDest));
});


// concatenates js dependecies and minifies them
gulp.task('dep-scripts-min', function() {  
    return gulp.src(jsDepCodemirrorFull2)
        .pipe(concat('cmbundle2.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/libraries/codemirror'));
});

*/