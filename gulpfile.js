var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("es6", function(){

	gulp.src("src/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest("build"));
	
});


gulp.task("watch", function(){

	gulp.watch("src/**/*.js", ["es6"]);
		
});

gulp.task("default", ["es6", "watch"]);
