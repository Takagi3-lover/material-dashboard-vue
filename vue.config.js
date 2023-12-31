const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, //关闭语法检查
//  解决跨域问题，允许访问https://55518v60i8.zicp.fun
    devServer: {
        //记住，别写错了devServer//设置本地默认端口  选填
        port: 8080,
        proxy: {
            //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://localhost:9090',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/api': ''                     //选择忽略拦截器里面的单词
                }
            },
            '/json': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://localhost:8080',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/json': ''                     //选择忽略拦截器里面的单词
                }
            }
        }
    }
})
