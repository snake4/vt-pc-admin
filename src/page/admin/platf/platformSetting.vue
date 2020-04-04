<template>
  <div   >

    <div >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.platformName" placeholder="平台名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  @click="handleSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加平台</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        :default-sort = "{prop: 'platformDate', order: 'descending'}"
        style="width: 100%" size="medium">
        <el-table-column
          label="序号"
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="ID"
          prop="platformId"
          v-if="false">
        </el-table-column>
        <el-table-column
          sortable
          label="创建日期"
          prop="platformDate"
          width="150">
        </el-table-column>
        <el-table-column
          label="平台名称"
          prop="platformName"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          label="平台描述"
          prop="platformDescribe"
          width="580"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" fixed="right"  width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="Pagination">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[9, 18, 27, 36]"
        :page-size="9"
        layout="total, sizes, prev, pager, next, jumper"
        :total="36">
      </el-pagination>
    </div>
    <el-dialog v-el-drag-dialog :title="dialogTitleType" :visible.sync="dialogAddFormVisible" width="50%" :before-close="handleClose">
      <el-form :model="addPlatformForm" label-width="90px" :rules="rules" ref="addPlatformForm" size="medium">
        <el-form-item label="平台名称:"  prop="platformName" >
          <el-input v-model="addPlatformForm.platformName" placeholder="平台名称"></el-input>
        </el-form-item>
        <el-form-item label="平台描述:"  prop="platformDescribe">
          <el-input type ='textarea' :rows="4" v-model="addPlatformForm.platformDescribe" placeholder="平台描述" maxlength="250" show-word-limit></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="resetForm('addPlatformForm')" icon="el-icon-refresh">重 置</el-button>
        <el-button type="primary" @click="savePlatform('addPlatformForm')" icon="el-icon-check">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import platformSetting from './platformSetting.js'
  export default platformSetting

</script>

<style lang="less" scoped>

</style>
