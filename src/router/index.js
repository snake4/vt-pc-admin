import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const manage = r => require.ensure([], () => r(require('@/page/main.vue')), 'main');
const moduleList = r => require.ensure([], () => r(require('@/page/admin/moduleList.vue')), 'moduleList');
const backUserList = r => require.ensure([], () => r(require('@/page/admin/userList.vue')), 'backUserList');
const pictureList = r => require.ensure([], () => r(require('@/page/admin/pictureList.vue')), 'pictureList');
const userSetting = r => require.ensure([], () => r(require('@/page/admin/user/userSetting.vue')), 'userSetting');
const platformSetting = r => require.ensure([], () => r(require('@/page/admin/platf/platformSetting.vue')), 'platformSetting');
const projectSetting = r => require.ensure([], () => r(require('@/page/admin/project/projectSetting.vue')), 'projectSetting');
const roleSetting = r => require.ensure([], () => r(require('@/page/admin/role/roleSetting.vue')), 'roleSetting');
const menuSetting = r => require.ensure([], () => r(require('@/page/admin/menu/menuSetting.vue')), 'menuSetting');
const login = r => require.ensure([], () => r(require('@/page/login/login.vue')), 'login');
Vue.use(Router)
const routes=[

  {
    path:'/',component:login
  },
  {
    path:'/login',component:login
  },
  {
    path:'/main',component:manage,children: [

      {path:'/moduleList',component:moduleList,meta: ['系统设置', '模块列表'],},
      {path:'/backUserList',component:backUserList,meta: ['系统设置', '用户列表'],},
      {path:'/pictureList',component:pictureList,meta: ['系统设置', '图片列表'],},
      {path:'/userSetting',component:userSetting,meta: ['系统设置', '用户设置'],},
      {path:'/platformSetting',component:platformSetting,meta: ['系统设置', '平台设置'],},
      {path:'/projectSetting',component:projectSetting,meta: ['系统设置', '项目设置'],},
      {path:'/roleSetting',component:roleSetting,meta: ['系统设置', '角色设置'],},
      {path:'/menuSetting',component:menuSetting,meta: ['系统设置', '菜单设置'],},
    ]
  }

];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
