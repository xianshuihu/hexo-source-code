var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var pump = require('pump');

gulp.task('minify-html', function() {
	return gulp.src('public/**/*.html')
	.pipe(htmlclean())
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		minifyCSS: true,
		minifyJS: true,
		minifyURLs: true
	}))
	.pipe(gulp.dest('public'));
});

gulp.task('minify-css', function() {
	return gulp.src(['public/**/*.css', '!public/**/*.min.css'])
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('public'));
});

gulp.task('minify-js', function(cb) {
	pump([
		gulp.src(['public/**/*.js', '!public/**/*.min.js']),
		babel({
			presets: ['es2015']
		}),
		uglify(),
		gulp.dest('public')
	], cb);
});

gulp.task('default', ['minify-html', 'minify-css', 'minify-js']);