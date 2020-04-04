<template>
  <div id="app" class="fillcontain">

     <router-view></router-view>


  </div>
</template>

<script>
  export default {
    data(){
      return{

       // test: this.store.adminInfo.avatar,
      }
    }
  }
</script>

<style lang="less">
  @import './style/common';
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }

  //element中表格中的表头与表格内容边框错位的解决方法
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>
