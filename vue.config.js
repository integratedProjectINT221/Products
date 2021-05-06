module.exports = {
    devServer: {
        proxy: {
            '/products': {
                target: 'http://products_backend/',
                ws: true,
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/brands': {
                target: 'http://products_backend/',
                ws: true,
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/colors': {
                target: 'http://104.215.183.81:8081/',
                ws: true,
                changeOrigin: true,
                logLevel: 'debug'
            },
        }
    }
}