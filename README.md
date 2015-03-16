# gulp-map-replace
根据树文件清单将原来的路径映射到修改路径的gulp插件

#使用

**待处理的html文件——a.html**

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title></title>
    <meta name="description" content=" />
    <meta name="keywords" content="" />
    <link href="css/base.css "/>
    <script src="js/common.js"></script>
</head>
```

 **build后的——a.html**
 
```
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title></title>
      <meta name="description" content=" />
      <meta name="keywords" content="" />
      <link href="css/base-7e1dc409.css" />
      <script src="js/common-f5a1381a.js"></script>
  </head>
```
 
 
gulp任务

```
var mapReplace = require('gulp-map-replace');
gulp.task('html', function () {
    return gulp.src("a.html")
        .pipe(mapReplace({
            path: "map.json"
        }))
        .pipe(gulp.dest("dist"));
});
```





map.json

```
{
     "js/common.js": "js/common-f5a1381a.js" ,
     "css/base.css": "js/base-7e1dc409.css"
     .....
}
```

map文件的生成可前往[gulp-rev](https://github.com/sindresorhus/gulp-rev)查看


#API说明

##mapReplace(options);
###options {}
###path
Type: `string`  
例子： path.join(__dirname, config.sourceMapName + ".json")






