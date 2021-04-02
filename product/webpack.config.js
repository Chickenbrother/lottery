const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    lottery:path.join(__dirname,'/src/lottery/index.js'),
    welcome:path.join(__dirname, "/src/welcome/welcome.js"),
    settings:path.join(__dirname, "/src/settings/settings.ts")
    
},
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',// 打包后的文件名称
              outputPath: '', // 默认是dist目录
              publicPath: '../font/', // 图片的url前面追加'../font'
              useRelativePath: true, // 使用相对路径
              limit: 50000 // 表示小于1K的图片会被转化成base64格式
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:3]_[name].[ext]',// 打包后的文件名称
              outputPath: '',
              publicPath: '../img/',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(ts)$/,
        use: 'ts-loader'
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"//,
            // options: {
            //   modules: true,
            //   getLocalIdent: (context, localIdentName, localName, options) =>{
            //       return localName
            //   }
      
          //}
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery"
    }),
    new webpack.BannerPlugin("版权所有，翻版必究"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
      filename: "./index.html",
      chunks: ['lottery'],
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },
      hash: true,
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/welcome.html"),
      filename: "./welcome.html",
      chunks: ['welcome'],
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },
      hash: true,
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/settings.html"),
      filename: "./settings.html",
      chunks: ['settings'],
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },
      hash: true,
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/css",
        to: "./css"
      },
      {
        from: "./src/data",
        to: "./data"
      },
      {
        from: "./src/img",
        to: "./img"
      },
      {
        from: "./src/lib",
        to: "./lib"
      }
    ]),
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
};
