// vue.config.js
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: [
      'all'  // 允许所有主机访问，这可以包括 ngrok 提供的动态域名
    ],
    client: {
      webSocketURL: {
        protocol: 'wss',
        hostname: '21f5-122-151-149-14.ngrok-free.app',  // 使用 ngrok 提供的域名，不含协议前缀
        port: 443  // HTTPS 端口
      }
    },
    https: false,  // 启用 HTTPS
    host: '0.0.0.0',  // 允许外部访问
    port: 8080,  // 指定端口
    // proxy: {
    //   '/rpg': { // 假设你的 API 路径以 /api 开始
    //     target: 'http://127.0.0.1:11434', // 后端服务地址
    //     changeOrigin: true, // 必须设置为true
    //     pathRewrite: {'^/rpg' : ''} // 如果后端没有/api前缀，需要重写URL
    //   }
    // }
  }
}
