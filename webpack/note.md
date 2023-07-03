# Webpack
## 五个核心概念
  1. Entry 指示以哪个文件作为入口开始打包，分析构建内部以来图。
  2. Output 指示打包后的资源bundles输出到哪里，以及如何命名。
  3. Loader让Webpack能有去处理那些非Javascript文件。
  4. Plugins可以用于执行范围更广的任务，包括从打包优化和压缩，一直到重新定义环境中的变量等。
  5. Mode 指示Webpack运行的模式(developement, production)。

## 安装
  - npm i webpack webpack-cli -g
  - npm i webpack webpack-cli -D
  可能会存在版本对应问题webpack4对应cli3版本，webacpk5对应cli4及更新版本