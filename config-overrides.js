// const { override, fixBabelImports, addLessLoader } = require("customize-cra");
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin')

// const path = require("path");
// const { updateConfig } = require("react-app-rewire-antd-theme");

// const options = {
//   varFile: path.join(__dirname, "./src/assets/styles/modules/variables.less"),
//   stylesDir: path.join(__dirname, "./src/assets/styles/modules"),
//   antDir: path.join(__dirname, "./node_modules/antd"),
//   colorFilePath: path.join(__dirname, "./public/color.less"),
//   themeVariables: [
//     "@primary-color",
//     "@secondary-color",
//     "@text-color-secondary",
//     "@text-color"
//   ]
// };

// function myOverRides(config, env) {
//   config = updateConfig(config, env, options);
//   return config;
// }

// module.exports = override(
//   // fixBabelImports("import", {
//   //   libraryName: "antd",
//   //   libraryDirectory: "es",
//   //   style: true
//   // }),
//   myOverRides,
//   addLessLoader({
//     //   strictMath: true,
//     // noIeCompat: true,
//     // localIdentName: "[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
//     javascriptEnabled: true
//   })
// );

const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const path = require("path");
const { override, addWebpackPlugin, addLessLoader } = require("customize-cra");
const options = {
  stylesDir: path.join(__dirname, "./src/assets/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/assets/styles/vars.less"),
  mainLessFile: path.join(__dirname, "./src/assets/styles/index.less"),
  themeVariables: [
    "@primary-color",
    "@theme-col-light-blue",
    "@text-color",
    "@text-color-secondary",
    "@heading-color",
    "@primary-color",
    "@link-color",
    "@success-color",
    "@warning-color",
    "@error-color",
    "@disabled-color",
    "@border-color-base",
    "@box-shadow-base",
    "@theme-col-light-blue",
    "@background-transparent",
    "@background-white",
    "@background-gray",
    "@white",
    "@black",
    "@light-gray",
    "@section-title-light-gradient-start",
    "@section-title-light-gradient-end",
    "@sidebar-wrap",
    "@dashboard-nav-active-bg",
    "@dashboard-navbar-icon-color",
    "@tab-content",
    "@thead-bg",
    "@item-active-bg",
    "@item-hover-bg",
    "@filter-gradiant"
  ],
  indexFileName: "index.html",
  generateOnce: false // generate color.less on each compilation
};

module.exports = override(
  addLessLoader({
    modifyVars: {
      // "@primary-color": "#00375B"
      // "@text-color-secondary": "#fffff"
    },
    javascriptEnabled: true
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options))
);
