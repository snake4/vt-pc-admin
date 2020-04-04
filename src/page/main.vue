<template>
  <el-container style="margin: 0 50px 0 50px">

      <el-aside :style="[$store.state.sideMenu.isCollapse?obj1:obj2]" >


        <el-menu
          default-active="moduleList"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#324057"
          text-color="#fff"
          style="height: 100%; min-height: 750px;"
          active-text-color="#20a0ff"
          :collapse="$store.state.sideMenu.isCollapse"
          router>
          <el-menu-item index="#"  @click="hidef">
            <i class="el-icon-d-arrow-left" v-show="!$store.state.sideMenu.isCollapse"></i>
            <i class="el-icon-d-arrow-right" v-show="$store.state.sideMenu.isCollapse"></i>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <!-- <el-menu-item-group>-->
            <!-- <template slot="title">分组一</template>-->
            <!--<el-menu-item index="moduleList">模块列表</el-menu-item>
            <el-menu-item index="backUserList">用户列表</el-menu-item>-->

            <el-menu-item index="userSetting">用户设置</el-menu-item>
            <el-menu-item index="platformSetting">平台设置</el-menu-item>
            <el-menu-item index="projectSetting">项目设置</el-menu-item>
            <el-menu-item index="roleSetting">角色设置</el-menu-item>
            <el-menu-item index="menuSetting">菜单设置</el-menu-item>
            <!-- </el-menu-item-group>-->

          </el-submenu>

          <!-- <el-menu-item index="2">
             <i class="el-icon-menu"></i>
             <span slot="title">导航二</span>
           </el-menu-item>
           <el-menu-item index="3" disabled>
             <i class="el-icon-document"></i>
             <span slot="title">导航三</span>
           </el-menu-item>
           <el-menu-item index="4">
             <i class="el-icon-setting"></i>
             <span slot="title">导航四</span>
           </el-menu-item>-->
        </el-menu>
      </el-aside>



    <el-container>
      <el-header style="padding: 0 10px">
        <head-top></head-top>

      </el-header>
      <el-main style="padding: 0 10px">
        <hr/>
        <keep-alive style="width: 100%">
          <router-view></router-view>
        </keep-alive></el-main>
    </el-container>
  </el-container>
</template>

<script>
  import store from '@/store/index.js'
  import headTop from '@/components/headTop'
  export default {
    data(){
      return {
        test:false,

        isCollapse: store.state.sideMenu.isCollapse,
        obj1:{width:'66px',height:'100%'},
        obj2:{width:'200px',height:'100%'},
      }
    },
    methods:{
      handleOpen(){

      },
      handleClose(){

      },
      hidef(){
        if(store.state.sideMenu.isCollapse){
          store.state.sideMenu.isCollapse=false;
          // this.isCollapse=false;
          console.log(store.state.sideMenu.isCollapse)
        }else{
          store.state.sideMenu.isCollapse=true;
          //  this.isCollapse=true;
          console.log(store.state.sideMenu.isCollapse)
        }

      }
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    mounted () {
      console.log(this.$refs.mybody);

    },
    components:{
      headTop,
    }
  }
</script>


<style lang="less" scoped>
  @import '../style/mixin';
  .manage_page{

  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 199px;

  }

  .menuShow{
    width: 199px;
  }
  .menuHide{
    width: 64px;
  }
</style>

