

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}
const base = 'http://localhost:9066'


module.exports = {
    publicPath: "./",
    outputDir: 'dist',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: process.env.NODE_ENV === 'development',
    devServer: {
        port: 81,
        open: true,
        proxy: {
            '/api': {
                target: base,
                changeOrigin: true,
                pathRewrite:
                    { '^/api': '' }
            },
        }
    },
    configureWebpack: {
        name: process.env.VUE_APP_NAME,
        resolve: {
            alias: {
                '@': resolve('src'),
            }
        },
        externals: {},
        plugins: [],
    },
}