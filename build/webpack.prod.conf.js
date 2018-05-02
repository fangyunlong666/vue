'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
<<<<<<< HEAD
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
=======
// 拷贝插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 各种解析后会生成style标签，但是还是通过js操作生成的。这个插件的目的是在编译的时候就生成css文件，提高加载速度。
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 不同的文件可能会引入相同的css文件，用来去除那些重复的文件
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
<<<<<<< HEAD
  stats: 'errors-only',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
=======
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: '.'
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // 配置环境变量
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 压缩js
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false
            }
          },
          sourceMap: config.build.productionSourceMap,
          parallel: true
        }),
        // 生成.css文件
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        // 对生成的.css文件去重
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
        }),
        // 生成html文件
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        // 当第三方依赖没有修改时，不对其进行打包修改
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // 提升作用域，号称让代码文件更小、运行更快。没什么软用
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        // 提取第三方依赖代码到vender
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // minChunks也可以是一个函数，见上方,如果是一个函数则表示一个chunk满足它的条件即可放入公共的chunk中
            minChunks(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                  // module.context: 文件储存的文件夹名称 例如 '/my_project/node_modules/example-dependency'
                  // module.resource: 文件储存的路径（带文件名）例如 /my_project/node_modules/example-dependency/index.js
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // 
        // 提取公共部分代码
        new webpack.optimize.CommonsChunkPlugin({
            // 指定了name会从entry中寻找，如果有直接将其对应的模块放入公共区块中。如果没有就新增一个以该name命名的区块
            name: 'manifest',
            // minChunks代表要提取这个chunk到公共模块中必须这个chunk必须被多少代码引用过，如果minChunks设置为Infinity无穷大，则代表不提取任何代码进去。只创立一个公共区块，将webpack的运行环境放进去
            // minChunks也可以是一个函数，见上方,如果是一个函数则表示一个chunk满足它的条件即可放入公共的chunk中
            minChunks: Infinity
        }),

        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk

        // app里面引用的vendor不跟你抢，直接打包到app.[hash].js里面，那是否只是一层？
        // TODO
        // 假如app.js 引用了a.js a.js又引用了c.js，c.js是在app.[hash].js里面还是vendor?
        // TODO:同时提取多个script标签，如何设置加载顺序？
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            // TODO
            async: 'vendor-async',
            // TODO
            children: true,
            minChunks: 3
        }),

        // 拷贝文件夹到指定路径，这里拷贝到指定的静态资源路径
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
>>>>>>> b5ac4a8988b911f4ec086c1ee78747715d2505fd
