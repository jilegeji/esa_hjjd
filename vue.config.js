const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = "微表情心理采集分析系统";
        return args;
      })
  }
};