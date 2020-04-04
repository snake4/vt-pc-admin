<template>
  <div   >

    <div >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.platformName" placeholder="菜单名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search"  @click="handleSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加菜单</el-button>
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
          label="菜单名称"
          prop="platformName"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          label="菜单类型"
          prop="platformDescribe"
          width="580"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="一级序号"
          prop="platformDescribe"
          width="580"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="二级序号"
          prop="platformDescribe"
          width="580"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="路由地址"
          prop="platformDescribe"
          width="580"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="启用状态"
          align="center"
          width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.userStatus === '1'">
              <i class="el-icon-success" style="color: #67C23A"></i>
            </div>
            <div v-else>
              <i class="el-icon-error" style="color: red"></i>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right"  width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

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
        <el-form-item label="菜单名称:"  prop="platformName" >
          <el-input v-model="addPlatformForm.platformName" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型:"  prop="platformName" >
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级序号:"  prop="platformName" >
          <el-input v-model="addPlatformForm.platformName" placeholder="一级序号"></el-input>
        </el-form-item>
        <el-form-item label="二级序号:"  prop="platformName" >
          <el-input v-model="addPlatformForm.platformName" placeholder="二级序号"></el-input>
        </el-form-item>
        <el-form-item label="路由地址:"  prop="platformName" >
          <el-input v-model="addPlatformForm.platformName" placeholder="路由地址"></el-input>
        </el-form-item>
        <el-form-item label="启用:"  prop="platformName" >
          <el-checkbox v-model="checked"></el-checkbox>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="resetForm('addMenuForm')" icon="el-icon-refresh">重 置</el-button>
        <el-button type="primary" @click="savePlatform('addMenuForm')" icon="el-icon-check">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import menuSetting from './menuSetting';
  export default menuSetting;
</script>

<style scoped>

</style>
