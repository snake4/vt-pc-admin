<template>
  <div   >

    <div >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.projectName" placeholder="项目名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加项目</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        :default-sort = "{prop: 'projectDate', order: 'descending'}"
        style="width: 100%" size="medium">
        <el-table-column
          label="序号"
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="ID"
          prop="projectId"
          v-if="false">
        </el-table-column>
        <el-table-column
          sortable
          label="创建日期"
          prop="projectDate"
          width="150">
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="projectName"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          label="项目描述"
          prop="projectDescribe"
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
      <el-form :model="addProjectForm" label-width="90px" :rules="rules" ref="addProjectForm" size="medium">
        <el-form-item label="项目名称:"  prop="projectName" >
          <el-input v-model="addProjectForm.projectName" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目描述:"  prop="projectDescribe">
          <el-input type ='textarea' :rows="4" v-model="addProjectForm.projectDescribe" placeholder="项目描述" maxlength="250" show-word-limit></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="resetForm('addProjectForm')" icon="el-icon-refresh">重 置</el-button>
        <el-button type="primary" @click="saveProject('addProjectForm')" icon="el-icon-check">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import projectSetting from './projectSetting.js'
  export default projectSetting;
</script>

<style lang="less" scoped>

</style>
