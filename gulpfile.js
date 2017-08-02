let gulp 	= require('gulp'), 
 connect 	= require('gulp-connect'),
 htmlmin 	= require('gulp-htmlmin'),
 less    	= require('gulp-less'),
 path    	= require('path'),
 sass	    = require('gulp-sass'),
 stylus 	= require('gulp-stylus'),
 scss  	    = require('gulp-scss'),
 cssmin 	= require('gulp-cssmin'),
 rename  	= require('gulp-rename'),
 del     	= require('del'),
 concat  	= require('gulp-concat'),
 babel   	= require('gulp-babel'),
 sourcemaps = require('gulp-sourcemaps'),
 uglify  	= require('gulp-uglify'),
 eslint  	= require('gulp-eslint'),
 imagemin   = require('gulp-imagemin'),
 pngquant   = require('imagemin-pngquant'),
 plumber    = require('gulp-plumber'),
 spritesmith = require('gulp.spritesmith')
 ;
 
 var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
/*
gulp.task('sleep', () => console.log('sleeping'));

gulp.task('eat', () => console.log('eating'));

gulp.task('study', ['sleep', 'eat'], () => console.log('studying'));
*/
gulp.task('default', ['watch', 'server', 'dist'], () => {
	console.log('ok');
});

//生成目标代码
gulp.task('dist', ['clean','copy-html','less', 'sass', 'stylus', 'compile-js', 'compress-image', 'sprite'])

//实时监听index.html,如果发生变化则让copy-html
gulp.task('watch', ['watch-html', 'watch-less', 'watch-sass', 'watch-stylus', 'watch-js', 'lint'], () => { });

gulp.task('watch-html', () => {
	return gulp.watch('index.html', ['copy-html']);
})

gulp.task('watch-less', () => {
	return gulp.watch('src/styles/*.less', ['less']);
})

gulp.task('watch-sass', () => {
	return gulp.watch('src/style/*.s(a|c)ss', ['sass']);
});

gulp.task('watch-stylus', () => {
	return gulp.watch('src/styles/*.styl', ['stylus']);
});

gulp.task('watch-js', () => {
	return gulp.watch('src/**/*.js', ['compile-js']);
});

//开启一个服务器, 实时预览
gulp.task('server', () => {
	connect.server({
		root: 'dist', //服务器目录
		port: 8080, // 端口号
		livereload: true
	})
})

//清除dist目录下的所有内容
gulp.task('clean', () => {
	del(['dist/*']);
});

//拷贝文件到指定的目标
//HTML文件最小化
gulp.task('copy-html', () => {
	return gulp.src('index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/'))
	.pipe(connect.reload());
});

//编译less文件并压缩， 并放入生产环境
gulp.task('less', () => {
	return gulp.src([
		'src/styles/reset.less',
		'src/styles/header.less'
	])
	//编译，加兼容性
	.pipe(less({
		plugins: [autoprefix]
	}))
	//最小化
	.pipe(cssmin())
	//合并到一个文件
	.pipe(concat('bundle-less.css'))
	//加.min后缀
	.pipe(rename({suffix: '.min'}))
	//放入目标目录
	.pipe(gulp.dest('dist/css/'))
	//重载,实时刷新编译
	.pipe(connect.reload());
});

//编译sass文件并压缩， 并放入生产环境
gulp.task('sass', () => {
	console.log("sass test")
	return gulp.src([
		'src/styles/index.sass',
    	'src/styles/footer.scss',
        'src/styles/comm.scss'
	])
	//编译，如果有错误就打印错误
	.pipe(sass().on('error', sass.logError))
	//最小化
	.pipe(cssmin())
	//合并到一个文件
	.pipe(concat('bundle-sass.css'))
	//添加后缀
    .pipe(rename({suffix: '.min'}))
    //放入目标目录
    .pipe(gulp.dest('dist/css'))
    //重载,实时刷新编译
    .pipe(connect.reload());
});

//编译stylus文件并压缩， 并放入生产环境
gulp.task('stylus', () => {
	return gulp.src([
		'src/styles/layout.styl',
    	'src/styles/main.styl'
	])
	//源代码图的init方法
	.pipe(sourcemaps.init())
	.pipe(stylus({
		//是否压缩
		compress: true,
		//
		linenos: true
	}))
	//源代码图的写入
	.pipe(sourcemaps.write())
	//合并到一个文件
	.pipe(concat('bundle-stylus.css'))
	//添加后缀
	.pipe(rename({suffix: '.min'}))
	//放入目标目录
	.pipe(gulp.dest('dist/css'))
	//重载,实时刷新编译
	.pipe(connect.reload());
});

//编译js文件并压缩， 并放入生产环境
gulp.task('compile-js', () => {
	return gulp.src('src/**/*.js')
	//源代码图的init方法
	.pipe(sourcemaps.init())
	//babel 编译
	.pipe(babel())
	//合并到一个文件
	.pipe(concat('all.js'))
	//添加后缀
	.pipe(rename({suffix: '.min'}))
	//源代码图的写入
	.pipe(sourcemaps.write("."))
	//放入目标目录
	.pipe(gulp.dest("dist/js"));
});

//js代码检查
gulp.task('lint', () => {
	return gulp.src([
		'src/**/*.js', '!node_modules/**'
	])
	.pipe(eslint({configFile: './eslint.json'}))
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

//压缩图片
gulp.task('compress-image', () => {
	return gulp.src('src/images/*')
	.pipe(imagemin({
		progressive: true,
		//使用pngquant来压缩png图片
		use: [pngquant()] 
	}))
	.pipe(gulp.dest('dist/images/'));
})

//进一步压缩成雪碧图
gulp.task('sprite', () => {
	return gulp.src('src/images/*.png')
	.pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}))
	.pipe(gulp.dest('dist/images/'));
});


