// vue.config.js
module.exports = {
  devServer: {
    https: false,  // 启用 HTTPS
    host: '0.0.0.0',  // 允许外部访问
    port: 8080,  // 指定端口
    proxy: {
      '/rpg': { // 假设你的 API 路径以 /api 开始
        target: 'https://3896-122-151-149-14.ngrok-free.app/lama', // 后端服务地址
        changeOrigin: true, // 必须设置为true
        pathRewrite: {'^/rpg' : ''} // 如果后端没有/api前缀，需要重写URL
      }
    }
  }
}
