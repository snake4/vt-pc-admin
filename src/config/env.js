/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;
let baseAuthenUrl='';

if (process.env.NODE_ENV == 'development') {
  //baseUrl = '';
  baseAuthenUrl='http://localhost:8380/authen-center';
  baseUrl = 'http://localhost:8388/adminBack';
  baseImgPath = '/img/';
} else {
  baseAuthenUrl='http://111.23.83.22:8380';
  baseUrl = 'http://111.23.83.22:8380';
  baseImgPath = '//elm.cangdu.org/img/';
}

export {
  baseUrl,
  baseAuthenUrl,
  routerMode,
  baseImgPath
}
