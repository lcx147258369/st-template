const path = require("path");
const timeStamp = new Date().getTime();
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 8080; // TODO: get this variable from setting.ts
module.exports = {
	// 基本路径
    lintOnSave: false,
    productionSourceMap: false,
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss"
        }
    }
    //   configureWebpack: { // webpack 配置
    //     output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
    //         filename: `[name].${process.env.VUE_APP_VERSION}.${timeStamp}.js`,
    //         chunkFilename: `[name].${process.env.VUE_APP_VERSION}.${timeStamp}.js`
    //       }
    //   },
};
