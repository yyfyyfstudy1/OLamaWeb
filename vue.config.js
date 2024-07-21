// vue.config.js
module.exports = {
  devServer: {
    https: false,  // 启用 HTTPS
    host: '0.0.0.0',  // 允许外部访问
    port: 8080,  // 指定端口
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: [
      'all'  // 允许所有主机访问，这可以包括 ngrok 提供的动态域名
    ],
    client: {
      webSocketURL: {
        protocol: 'wss',
        hostname: '4083-122-151-149-14.ngrok-free.app',  // 使用 ngrok 提供的域名，不含协议前缀
        port: 443  // HTTPS 端口
      }
    },
    historyApiFallback: true,  // 如果使用单页应用，启用历史记录回退
    static: {
      directory: './public',  // 静态资源目录，根据实际项目路径调整
    },
    proxy: {
      '/rpg': { // 假设你的 API 路径以 /api 开始
        target: 'https://effe-122-151-149-14.ngrok-free.app ', // 后端服务地址
        changeOrigin: true, // 必须设置为true
        pathRewrite: {'^/rpg' : ''} // 如果后端没有/api前缀，需要重写URL
      }
    }
  }
}
