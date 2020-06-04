// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px-to-viewport":{
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750.
        viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334.
        unitPrecision: 5, // (指定`px`转换为视窗单位值的小数位数（很多时候无法整除).
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw.
        //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名.'.nav-bar','.title-item','.detail-nav-bar'
        selectorBlackList: [ '.tab-bar'], 
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值.
        mediaQuery: false, // 允许在媒体查询中转换`px`.
        // exclude:[/TabControl/,/CartBottom/,/SideBar/]
    }
  },
}
//1  在js中使用正则： /正则相关规则/
//2  在exclude中存放的元素，必须是正则表达式
//3  按照排除的文件写对应的正则
//   ^abc：  表示 匹配的内容必须以abc 开头
//   abc$    表示 匹配的内容必须以abc 结尾
//   ^abc$     表示只匹配abc     直接一个abc表示，包含abc的所有匹配