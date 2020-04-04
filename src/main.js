// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import vRegion from 'v-region';


// import 'element-ui/lib/theme-chalk/index.css'
import './style/element-variables.scss'
// 拖拽弹
import elDragDialog from './directive/el-dragDialog/index'
import {http} from './http/http.js'
import * as myapi from './api/getData';
import * as mutil from './config/mUtils'
import * as constants from './config/constants'
Vue.prototype.$constants=constants;
Vue.prototype.$myapi=myapi;
Vue.prototype.$mutil=mutil;
//Vue.prototype.$http=http;
Vue.use(vRegion);
Vue.use(elDragDialog);

Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
export default  new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

