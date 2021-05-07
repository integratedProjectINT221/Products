module.exports = {
    devServer: {
        proxy: {
            '^/products': {
                target: 'http://104.215.183.81:8081/',
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/products": "/"
                }
            },
            '^/brands': {
                target: 'http://104.215.183.81:8081/',
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/brands": "/"
                }
            },
            '^/colors': {
                target: 'http://104.215.183.81:8081/',
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/colors": "/"
                }
            },
        }
    }
}
