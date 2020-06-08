const webpack = require('webpack');
const merge = require('webpack-merge');
// const path = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  stats: 'minimal',
  mode: 'development',
  // 开发环境本地启动的服务配置
  devServer: {
    port: 28000,
    hot: true,
    open: false,
    historyApiFallback: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 接口代理转发
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
});
