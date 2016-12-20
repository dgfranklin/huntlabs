var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell')
var runSequence = require('run-sequence');

gulp.task('copy:common', function () {
	gulp.src('common/**/*.ts')        
	.pipe(gulp.dest('server/common'))
	
	gulp.src('common/**/*.ts')        
	.pipe(gulp.dest('client/src/common'))
});

gulp.task('watch-common', function () {
	gulp.watch('common/**/*.ts', ['copy:common']);
});


gulp.task('build:server', function () {
    var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
    var tsResult = gulp.src([
        'server/**/*.ts',
    ])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
    return tsResult.js
        .pipe(sourcemaps.write({'sourceRoot': '../server'}))
        .pipe(gulp.dest(path.resolve('./build')))
});

gulp.task('watch-server', ['build:server'], function () {
	gulp.watch('server/**/*.ts', ['build:server']);
});

gulp.task('build:client:watch', function () {
	return gulp.src('')
	.pipe(
		shell(['ng build -w --output-path ../build/client'],{cwd:'client'})
	)
});

gulp.task('build', function (callback) {   
    runSequence('copy:common','build:server','watch-common','watch-server','build:client:watch', callback);
});

gulp.task('default', ['build']);
