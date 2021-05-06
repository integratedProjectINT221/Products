module.exports = {
    devServer: {
      proxy: {
        '^/products': {
          target: 'http://localhost:8081/',
          ws: true,
          changeOrigin: true
        },
      }
    }
  }