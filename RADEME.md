# Gulp
- 用自动化构建工具增强你的工作流程！
 
# 工作流程：
-   HTML,CSS, JS
-   HTML5,CSS3,ES6,ES7,ES8, NodeJS, Vue, React, Angular, TyeScript, Less, Sass, Stylus, Postcss
-   通过类似webstorm的IDE工具，实现自动编译

# 构建工具：
-   帮我们把Less,Sass, Stylus实时编译成css
-   帮我们把ES6, ES7, ES8, TypeScript实时编译成ES5或ES3
-   帮我们把压缩文件， 合并文件
-   提供一个实时同步的服务器
# 自动化：
-   gulpfile.js
-   gulp

# Gulp的使用
##     安装：一些用到的插件
-   npm i -g gulp
-   npm i -S gulp
-   var gulp = require('gulp');
-   gulp.task('default', function() {
-    默认代码都放在这里
-   }) 
-   输入gulp， 默认名为default的任务将会被运行

#     一些用到的插件 ：-S 当前 或者 -D 添加到package.json
```
       npm i -S或者-D del    清除=>插件 
       npm i -S或者-D gulp-less  css编译=>插件 
       npm i -S或者-D gulp-sass  css编译=>插件 
       npm i -S或者-D gulp-scss  css编译=>插件 
       npm i -S或者-D gulp-stylus  css编译=>插件 
                        编译文件自带的    需要require  path  
       npm i -S或者-D gulp-htmlmin   html压缩=>插件 
       npm i -S或者-D gulp-cssmin   css压缩=>插件
       npm i -S或者-D gulp-rename   文件添加后缀=>插件
       npm i -S或者-D gulp-concat   合并多个文件=>插件
       npm i -S或者-D gulp-babel    把ES6 编译成 ES5 =>插件
       npm i -S或者-D gulp-sourcemaps  还原源代码=>插件 
       npm i -S或者-D gulp-uglify   js压缩=>插件
       npm i -S或者-D gulp-eslint   检查js代码=>插件
       npm i -S或者-D gulp-imagemin  压缩img=>插件
       npm i -S或者-D imagemin-pngquant   压缩img的进阶=>插件
       npm i -S或者-D gulp-plumber   阻止程序挂掉 => build 流程不会停止 =>插件
       npm i -S或者-D gulp-connect   链接服务器 =>插件
       npm i -S或者-D gulp.spritesmith  压缩image成雪碧图
```
##       eslint 插件如果有问题  需要些一个 eslint.json ，内容如下
```
{
    "rules": {
        "eqeqeq": "off",
        "curly": "warn",
        "quotes": ["warn", "double"]
    }
}
```
#     如果已经使用过的, 想在其他地方用 简单点就是复制 package.json 
##     把json文件放入项目文件夹  npm i 或者 cnpm i
```
{
  "dependencies": {
    "babel-preset-es2015": "^6.24.1",
    "eslint": "^4.3.0",
    "gulp": "^3.9.1",
    "gulp-less": "^3.3.2",
    "gulp-sass": "^3.1.0",
    "gulp-scss": "^1.4.0",
    "gulp-stylus": "^2.6.0",
    "gulp.spritesmith": "^6.5.1"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.24.1",
    "concat": "^1.0.3",
    "del": "^3.0.0",
    "eslint": "^4.3.0",
    "gulp": "^3.9.1",
    "gulp-babel": "^6.1.2",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.0.0",
    "gulp-cssmin": "^0.2.0",
    "gulp-eslint": "^4.0.0",
    "gulp-htmlmin": "^3.0.0",
    "gulp-imagemin": "^3.3.0",
    "gulp-plumber": "^1.1.0",
    "gulp-rename": "^1.2.2",
    "gulp-sourcemaps": "^2.6.0",
    "gulp-uglify": "^3.0.0",
    "gulp.spritesmith": "^6.5.1",
    "imagemin-pngquant": "^5.0.1",
    "less-plugin-autoprefix": "^1.5.1"
  }
}
```


#     常用的指令：task, src ,watch, dest
##     gulp.task(name, [deps] , fn)
-   name : 任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。
-   deps : 类型： Array
-   一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
-   fn :
-   该函数定义任务所要执行的一些操作。通常来说，它会是这种形式：gulp.src().pipe(someplugin())


##   gulp.src(globs,[options]):
```
		gulp.src('client/templates/*.jade') 
		  .pipe(jade()) 
		  .pipe(minify())
		  .pipe(gulp.dest('build/minified_templates'));
```

###  globs: 类型： String 或 Array
-   所要读取的 glob 或者包含 globs 的数组。
###   options
-	类型： Object
-	通过 glob-stream 所传递给 node-glob 的参数。
-	除了 node-glob 和 glob-stream 所支持的参数外，gulp 增加了一些额外的选项参数：
###			options.buffer
-	类型： Boolean 默认值： true
-	如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用。**注意：**插件可能并不会实现对 stream 的支持。
###			options.read
-	类型： Boolean 默认值： true
-	如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。
###			options.base
-	类型： String 默认值： 将会加在 glob 之前 (请看 glob2base)
-	如, 请想像一下在一个路径为 client/js/somedir 的目录中，有一个文件叫 somefile.js ：
```
			gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
			  .pipe(minify())
			  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
			
			gulp.src('client/js/**/*.js', { base: 'client' })
			  .pipe(minify())
			  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
```



##     gulp.dest(path,[options]):
-	 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，
-	 因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。
```
		gulp.src('./client/templates/*.jade')
  			.pipe(jade())
  			.pipe(gulp.dest('./build/templates'))
  			.pipe(minify())
  			.pipe(gulp.dest('./build/minified_templates'));
```
###       path : 类型： String or Function
-    文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径
###       options
-	类型： Object
###			options.cwd
-	类型： String 默认值： process.cwd()
-	输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效。
###			options.mode
-	类型： String 默认值： 0777
-	八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。




#       监听： gulp.watch(glob, [opts], tasks) 或 gulp.watch(glob, [opts, cb])
##      gulp.watch(glob,[opts], tasks)
###        glob　：　类型： String or Array
－　　　一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。
###        opts : 类型： Object
-    传给 gaze 的参数。
###        tasks : 类型： Array
-    需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字，
```
          	var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
			watcher.on('change', function(event) {
			  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			});
```



##      gulp.watch(glob,[opts, cb])
-   前面俩个参数和上面一样
###        cb(event) : 类型： Function
-   每次变动需要执行的 callback。
```
			 gulp.watch('js/**/*.js', function(event) {
 				 console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			  });
```
###          event.type  : 类型： String
-   发生的变动的类型：added, changed 或者 deleted。
###          event.path:  类型： String
-   触发了该事件的文件的路径。

##     gulp.task('default', [], fn)
###      default : 默认  所有任务最终在这里执行 
###      []  : Array : 放入最终执行的任务
###      fn  : Function 

#     处理HTML：
-       拷贝文件到指定的目标
-       监控对应的文件，实时编译
-       开启一个服务器，实时预览

#     处理CSS：
-  编译Less, sass, stylus文件
-  使用autoprefix插件
-  CSS文件最小化
-  CSS文件合并
      