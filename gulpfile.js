var gulp = require('gulp');
//var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
//var gulpSequence = require('gulp-sequence');
var nodemon = require('gulp-nodemon');
var apidoc = require('gulp-apidoc');
//var shell = require('gulp-shell');

gulp.task('server-api', ['browser-sync'], function() {

});

gulp.task('browser-sync', ['nodemon'],function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["/api/public/**/*.*"],
        browser: "chrome.exe",
        port: 5000,
	});
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: './api/bin/www'
	}).on('start', function () {
      browserSync.reload();
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

 
gulp.task('apidoc',function(done){
	apidoc({
			src: "src/",
			dest: "public/apidoc/",
			//template: "template/",
			debug: true,
			//includeFilters: [ ".*\\.js$" ]
	},done);
});



 
gulp.task('pastaApidoc', function () {
  return gulp.src('*.js', {read: false})
  .pipe(shell([
    'rd public\\apidoc mkdir public\\apidoc'
	]))
})

