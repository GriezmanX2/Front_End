/*
  webpack.config.js webpack的配置文件
    作用： 指示webpack的工作逻辑（运行webpack指令时，会加载这个配置）

    所有构建工具都是基于nodejs运行的，模块化默认采用commonjs

*/
// resolve()是用来拼接绝对路径的方法
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin')
const t = require('terser-webpak-plugin')

// 设置nodejs环境变量
process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  // 值为对象是可以通过key指定打包后的文件名，并将多个js分开打包为多个
  entry: ['./src/index.js','./src/index.html'],
  output: {
    // 输出文件名
    // 可包含路径，命名规则 js/[name].contenthash:10].js
    filename: 'js/built.js',
    // 输出路径
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
    // 所有资源引入的公共路径前缀
    // publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名
    // library: '[name]',
    // 变量名添加到哪个上
    // libraryTarget: 'window'
  },
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名： 可以简写路径
    alias: {
      $css: resolve(_dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extentions: ['.js', '.json'],
    // 告诉webpack解析模块时去哪个目录找
    modules: ['node_modules']
  },
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件类型配置不同loader
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // loader的执行顺序是从右到左依次执行
          // 创建style标签，将js中的样式资源插入其中，添加到head中生效
          // 'style-loader',
          // 将css样式从html中抽离为单独的文件
          MiniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载到js中，里面是内容的样式字符串
          'css-loader',
          // css版本兼容性处理: postcss --> postcss-loader postcss-preset-env
          // postcsss找到package.json中browserslist的配置，通过配置加载指定的css兼容性样式
          // "browserslist": {
          // 开发环境中需要设置node环境变量： process.env.NODE_ENV = "development"
          //   "development": [
          //     "last 1 chrome version",
          //     "last 1 firefox version",
          //     "last 1 safari version"
          //   ],
          //   "production": [
          //     ">0.2%",
          //     "not dead",
          //     "not op_mini all"
          //   ]
          // }
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')()]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          // 将css样式从html中抽离为单独的文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理图片资源
        // 处理需要下载url-loader, file-loader（url-loader依赖于file-loader）
        // options配置项必须和loader配置项一起出现，否则报错。
        test: /\.jpg|png|gif$/,
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb时，会处理为base64。可以减少请求数量，但会导致图片体积变大
          limit: 5 * 1024,
          // 可能存在引入解析问题[Object Module]
          // 解决方法： 关闭url-loader的es6模块化，使用commonjs模块化
          esModule: false,
          // 重命名图片
          // [hash:10]取图片hash值的前十位
          // 文件原本的拓展名
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件中引入img,从而能被url-loader处理
        loader: 'html-loader'
      },
      {
        // 处理之前loader没有处理过的其他文件类型
        exclude: /\.(css|js|html|jpg|png|gif|less|json)$/,
        loader: 'file-loader'
      },
      // /*
      //   eslint语法检查，需要安装eslint-loader, eslint
      //   只检查自己写的代码，不检查第三方库
      //   在package.json中设置检查规则 （ToDO！！ eslint-loader已经废弃）
      // */
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   include: resolve(__dirname, 'src')
      //   loader: 'eslint-loader',
      //   options: {

      //   }
      // }
    ]
  },
  plugins: [
    // 详细的plugins配置
    // 默认创建一个空的html,自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 复制模板html，并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩html文件
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    // 将css样式从html中抽离为单独的文件
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    // 压缩CSS减小体积
    new OptimizeCssAssetsWebpackPlugin()
  ],
  /*
    将node_modules中代码单独打包一个chunk
    自动分析多入口chunk中，有没有公共的引入依赖文件，如果由会单独打包成一个chunk，以此避免重复引入相同代码
  */
  //  单文件入口时，也可以通过js代码，让某个单文件被单独打包成一个chunk => 动态导入（import(/* webpackChunkName: 'test', webpackPrefetch: true*/'./test'))
  //  通过webpackChunkName指定单独打包后的文件名
  //  webpackPrefetch为true时，会使文件在其他必须资源加载完成后的空闲时预先加载完成，后续调用就可以直接从缓存读取
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 分割的chunk最小为30kb
      minSize: 30 * 1024,
      // 没有限制
      maxSize: 0,
      // 要提取的chunk最少被引用一次
      minChunks: 1,
      // 按需加载时并行加载的文件的最大数量
      maxAsyncRequests: 5,
      // 入口js文件最大并行请求数量
      maxInitialRequests: 3,
      // 名称连接符
      automaticNameDelimiter: '~',
      // 使用命名规则
      name: true,
      // 分割chunk的组
      cacheGroups: {
        // node_modules文件会被打包到vendors组的chunk中
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // 要提的chunk最少被引用2次
          minChunks: 2,
          priority: -20,
          // 复用同一个打包模块
          reuseExistingChunk: true
        }
      }
    },
    // 将当前模块记录其他模块的hash单独打包为一个文件 runtim
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案（js和css）
      new t({
        cache: true,
        // 开启多进程打包
        parallel: true,
        sourceMap: true
      })
    ]
  },
  // 打包时忽略指定包，包可以在index.html中通过cdn外部引入，提高响应速度
  externals: {
    // jquery: 'jquery'
  },
  // 模式，值为development(开发模式)或production(生产模式)
  mode: 'development',

  // 开发服务器devServer: 用来自动化（编译、打开浏览器、刷新浏览器）
  // 需要下载webpack-dev-server包
  // 启动devServer指令为： npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 开发服务器访问端口
    port: 3000,
    // 是否自动打开浏览器
    open: true,
    // 是否开启HMR（模块热更新）功能
    // 样式文件通过style-loader内部实现了HMR功能
    // js文件默认不能使用HMR功能
    // html文件默认不能使用HMR功能，同时会导致html不能热更新了(需要在entry中添加html路径)
    hot: true,
    // 服务器代理
    proxy: {
      '/api': {
        target: 'xxx',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}