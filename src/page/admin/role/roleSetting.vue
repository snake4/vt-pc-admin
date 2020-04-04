<template>
  <div   >

    <div >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.roleName" placeholder="角色名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus"  @click="handleAdd()">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%" size="medium">
        <el-table-column
          label="序号"
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="ID"
          prop="roleId"
          v-if="false">
        </el-table-column>
        <el-table-column
          label="角色名"
          prop="roleName"
          width="200">
        </el-table-column>
        <el-table-column
          label="角色描述"
          prop="roleDescribe"
          show-overflow-tooltip
          width="547">
        </el-table-column>
        <el-table-column
          label="启用状态"
          align="center"
          width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.roleStatus === '1'">
            <i class="el-icon-success" style="color: #67C23A"></i>
            </div>
            <div v-else>
              <i class="el-icon-error" style="color: red"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="250">
          <template slot-scope="scope">

            <el-button
              type="success"  size="mini"
              @click="dialogFormVisible=true">权限配置</el-button>
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
    </div>

    <el-dialog title="权限配置" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="permissionForm">
        <el-form-item>
          <el-tree
            :data="permissionForm.permissionData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="permissionForm.defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog v-el-drag-dialog :title="dialogTitleType" :visible.sync="dialogAddFormVisible" width="50%" :before-close="handleClose">
      <el-form :model="addRoleForm" label-width="90px" :rules="rules" ref="addRoleForm" size="medium">
        <el-form-item label="角色名称:"  prop="roleName" >
          <el-input v-model="addRoleForm.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:"  prop="roleDescribe">
          <el-input type ='textarea' :rows="4" v-model="addRoleForm.roleDescribe" placeholder="角色描述" maxlength="250" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="启用状态:"  prop="roleChecked">
          <el-checkbox v-model="addRoleForm.roleChecked"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="resetForm('addRoleForm')" icon="el-icon-refresh">重 置</el-button>
        <el-button type="primary" @click="saveRole('addRoleForm')" icon="el-icon-check">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import roleSetting from './roleSetting';
  export  default  roleSetting;

</script>

<style lang="less" scoped>

</style>
