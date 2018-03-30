'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  // 使用哪些loaders，如果是数组则从右往左加载
  loader: 'eslint-loader',
  // loader加载顺序，'pre'最先加载 'post'最后加载，即使顺序被覆盖了！
  enforce: 'pre',
  // 包含哪些模块，有效提高加载速度。路径都为绝对路径
  include: [resolve('src'), resolve('test')],
  // 传递给loader的参数
  options: {
    // 可以让eslint的错误信息出现在终端上
    formatter: require('eslint-friendly-formatter'),
    // 是否总是新增warning（如果是hot reload模式最好设置为true，这样你修改了代码如果语法检测有问题的话就可以显示出来）
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // webpack执行上下文
  context: path.resolve(__dirname, '../'),
  // 入口
  entry: {
    app: './src/main.js'
  },
  // 输出
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    // 资源前缀host
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 解析模块的规则
  resolve: {
    // 自动添加拓展名（以下类型的文件不用额外写拓展名）
    extensions: ['.js', '.vue', '.json'],
    // 创建 import 或 require 的别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
// todo

// 1.url-loader的使用方法以及用途

// 2.resolve配置的意义 解析loader的规则
