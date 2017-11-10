'use strict';

/*
	利用gulp-sass编译css
		* requie(): 导入模块
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var path={
    sass:'./src/sass/*.scss',
    js:'./src/js/*.js'
}

// 创建一个任务
// 用来编译sass
gulp.task('mySass',function(){
	// 查找文件位置
	gulp.src(path.sass) //得到文件流（文件在内存中的状态）

		.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))	//编译sass文件
		.pipe(gulp.dest('./src/css/'))			//输出到硬盘
});


// 监听文件的任务
gulp.task('jtSass',function(){
	// 监听home.scsss文件
	// 如果有修改，则执行compileSass任务
	gulp.watch(path.sass,['mySass'])
})

var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
//合并文件
gulp.task('concatJS',function(){
    gulp.src(path.js)
    //合并文件（合并后的文件名）
    .pipe(concat('home.js'))
    //合并文件后输出的地址（未压缩）
    .pipe(gulp.dest('./dist/js'))

    //压缩文件
     .pipe(uglify())
     //压缩文件改名（防止与未压缩文件同名覆盖）
     .pipe(rename({suffix:".min"}))
     //输出压缩后文件的地址（压缩）
     .pipe(gulp.dest('./dist/js'))
});

gulp.task('default',function(){
    console.log(666);
})