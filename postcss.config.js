/**
 * postCSS 配置
 * */
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 5 versions']
    })
  ]
}
