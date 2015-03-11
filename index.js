var through = require("through2");
var fs = require("fs");
var gutil = require("gulp-util");

var gulpSourceMap = function (options) {
    var mapPath, mapBuf, mapParse;
    var isEmpty = function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };
    var isObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };

    if (options) {
        mapPath = options.path || "";
    }
    // 检测是否有配置文件的传参
    if (!mapPath) {
        throw gutil.PluginError("sourceMaps", 'Missing map file!');
    }

    fs.exists(mapPath, function (exists) {
        if (!exists) {
            new gutil.PluginError("sourceMaps", 'Missing map file!');
        } else {
            mapBuf = fs.readFileSync(mapPath);
            // 将配置文件转换为对象
            mapParse = JSON.parse(mapBuf);
        }
    });

    // 当任何文件对象通过管道传输过来时，
    // 无论操作结果如何，都返回一个stream以便其他的操作能衔接流畅
    return through.obj(function (file, enc, cb) {
        var contents = file.contents.toString();
        var lines = contents.split("\r\n"),
            length = lines.length;

        if (isObject(mapParse) && !isEmpty(mapParse)) {
            Object.keys(mapParse).forEach(function (key) {
                for (var i = 0; i < length; i++) {
                    if (lines[i].search(key) > -1) {
                        lines[i] = lines[i].replace(key, mapParse[key]);
                    }
                }
            });
        }

        file.contents = new Buffer(lines.join("\r\n"));
        // 执行回调，和下一个操作对接
        cb(null, file);
    });
};

module.exports = gulpSourceMap;
