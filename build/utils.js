'use strict'
<<<<<<< HEAD
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

=======
// 略
const path = require('path')
// 引入config/index.js(就是vue-cli的配置文件)
const config = require('../config')
// 用于抽离css样式，防止将样式打包在js中引起的样式错乱
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 获取packa.json
const packageConfig = require('../package.json')

// 处理静态资源路径？
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
<<<<<<< HEAD

=======
// 生成静态资源文件夹下的路径 根据process.env.NODE_ENV来区分路径
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
<<<<<<< HEAD
=======
      // 这里因为loaders是从右往左处理，所以直接从concat即可，最终解析样式生成style标签，用的是vue-style-loader 
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
<<<<<<< HEAD
=======

  // 1.JS文件无非就是做babel处理，所以无需在utils中额外处理
  // 2.样式文件包含多种情况，有css、less、sass、scss、stylus、postcss所以在utils中预先处理了
  // 3.这里最终返回的是对应哪些文件具体要用哪些loader
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

<<<<<<< HEAD
// Generate loaders for standalone style files (outside of .vue)
=======
// 1.这里就直接生成了对应module.rules下的东西，可以直接引用
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
<<<<<<< HEAD

=======
// 编译出错时，弹窗提示。原来是这个鬼（编译出错提示）
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
