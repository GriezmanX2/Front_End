/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url && url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  }\n\n  if (options.maybeNeedQuotes && /[\\t\\n\\f\\r \"'=<>`]/.test(url)) {\n    return \"\\\"\".concat(url, \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/html-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/data.json":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/*! exports provided: name, age, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"firmino\\\",\\\"age\\\":31}\");\n\n//# sourceURL=webpack:///./src/data.json?");

/***/ }),

/***/ "./src/iconfont.css":
/*!**************************!*\
  !*** ./src/iconfont.css ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/iconfont.css?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ \"./node_modules/html-loader/dist/runtime/getUrl.js\");\nvar ___HTML_LOADER_IMPORT_0___ = __webpack_require__(/*! ./pic_002.jpg */ \"./src/pic_002.jpg\");\n// Module\nvar ___HTML_LOADER_REPLACEMENT_0___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_0___);\nvar code = \"<!DOCTYPE html>\\r\\n<html lang=\\\"en\\\">\\r\\n<head>\\r\\n  <meta charset=\\\"UTF-8\\\">\\r\\n  <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\r\\n  <title>Webpack</title>\\r\\n</head>\\r\\n<body>\\r\\n  <h1 id=\\\"title\\\">标题</h1>\\r\\n  <div>\\r\\n    <span class=\\\"iconfont icon-Home\\\"></span>\\r\\n    <span class=\\\"iconfont icon-Flag\\\"></span>\\r\\n    <span class=\\\"iconfont icon-Highlight\\\"></span>\\r\\n    <span class=\\\"iconfont icon-Face\\\"></span>\\r\\n  </div>\\r\\n  <div id=\\\"main\\\">\\r\\n    <div class=\\\"box\\\"></div>\\r\\n    <div class=\\\"box\\\"></div>\\r\\n    <div class=\\\"box\\\"></div>\\r\\n  </div>\\r\\n  <div>\\r\\n    <img src=\\\"\" + ___HTML_LOADER_REPLACEMENT_0___ + \"\\\" alt=\\\"\\\">\\r\\n  </div>\\r\\n</body>\\r\\n</html>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack:///./src/index.html?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.json */ \"./src/data.json\");\nvar _data_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data.json */ \"./src/data.json\", 1);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.less */ \"./src/index.less\");\n/* harmony import */ var _iconfont_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iconfont.css */ \"./src/iconfont.css\");\n/*\r\n  index.js: webpack入口文件\r\n  1.运行指令：\r\n   开发环境： webpack ./src/index.js -o ./build/built.js --mode=development\r\n   webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.j\r\n   生产环境： webpack ./src/index.js -o ./build/built.js --mode=production\r\n   webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js\r\n\r\n  2.结论：\r\n    - webpack能偶处理js,json资源，不能处理其他类型资源。\r\n    - 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化\r\n    - 生产环境比开发环境多一个压缩js代码处理。\r\n*/\r\n\r\n\r\n\r\n\r\n\r\n\r\nconsole.log('data', _data_json__WEBPACK_IMPORTED_MODULE_0__)\r\n\r\nfunction add(x, y){\r\n  return x + y;\r\n}\r\n\r\nconsole.log(add(4, 5))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index.less":
/*!************************!*\
  !*** ./src/index.less ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/index.less?");

/***/ }),

/***/ "./src/pic_002.jpg":
/*!*************************!*\
  !*** ./src/pic_002.jpg ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"imgs/2382ef4745.jpg\";\n\n//# sourceURL=webpack:///./src/pic_002.jpg?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/index.js ./src/index.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.html */\"./src/index.html\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/index.html?");

/***/ })

/******/ });