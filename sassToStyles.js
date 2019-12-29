// https://github.com/kszitt/react-native-sass-to-stylesheet

const ToStyles = require("react-native-sass-to-stylesheet");
const path = require("path");
// space{number} css文件缩进值，默认2
// postfix{string} 转换生成的js文件后缀，默认Style.js。例如：home.scss转换生成homeStyle.js
// initTransform{boolean} 启动服务后，是否自动转换所有的css文件，默认false
// adaptation{boolean} 适配各种手机，默认true。如果单个样式不需要适配，请添加 !important标志
// templatePath{string} 自动转换文件模板路径，默认./template.js
// ignored{array} 忽略文件"xxx.scss"，忽略文件夹"home"或者"component/home"，默认[]。

ToStyles.init("./src", {
  postfix: ".ts",
  templatePath: path.resolve("./sassToStylesTemplate.js"),
  ignored: ["src/styles"]
});
