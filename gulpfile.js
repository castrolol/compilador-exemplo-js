var gulp = require("gulp");
var babel = require("gulp-babel");
var mocha = require("gulp-mocha");

gulp.task("es6", function(){

	gulp.src("src/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest("build"));
	
});


gulp.task("watch", function(){

	gulp.watch("src/**/*.js", ["es6"]);
		
});

gulp.task("test", function() {
	
	return gulp
		.src("./test/**/*.js", {read: false})
		.pipe(mocha({reporter: "nyan"}));
	
});

gulp.task("default", ["es6", "watch"]);
