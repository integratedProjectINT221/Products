module.exports = {
    devServer: {
        proxy: {
            '^/products': {
                target: 'http://localhost:8081/',
                changeOrigin: true
            },
            '^/colors': {
                target: 'http://localhost:8081/',
                changeOrigin: true
            },
            '^/brands': {
                target: 'http://localhost:8081/',
                changeOrigin: true
            },
            '^/files': {
                target: 'http://localhost:8081/',
                changeOrigin: true
            }
        }
    }
}