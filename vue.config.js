<<<<<<< HEAD
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
=======

// module.exports = {
//     devServer: {
//         proxy: 'http://104.215.183.81:8081/'
//     }
// }

>>>>>>> f8a0b226a02b9f86895a2b80f03c911c17d6bddd
