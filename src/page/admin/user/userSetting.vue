<template>
  <div>

    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="账号/姓名/手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">添加用户</el-button>
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
          prop="userId"
          v-if="false">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="account"
          label="登录账号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="部门"
          width="120">
        </el-table-column>
        <el-table-column
          prop="positionName"
          label="职位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
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
        <el-table-column
          fixed="right"
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="dialogFormVisible=true">授权</el-button>
            <el-button size="mini" @click="handleClick(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="danger" size="mini">密码重置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="用户授权" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="form">
        <el-form-item label="选择平台" :label-width="formLabelWidth">

          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="success">获取已选平台的项目</el-button>
        </el-form-item>
        <hr>
        <el-form-item label="选择项目" :label-width="formLabelWidth">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['可选项目', '已选项目']"
            :button-texts="['', '']"
            :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
            @change="handleChange"
            :data="roleData">

          </el-transfer>
        </el-form-item>
        <hr>
        <el-form-item label="选择角色" :label-width="formLabelWidth">
          <el-button type="success" style="margin: 0 0 10px 0">获取已选项目的角色</el-button>
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['可选角色', '已选角色']"
            :button-texts="['', '']"
            :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
            @change="handleChange"
            :data="roleData">

          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


    <div class="Pagination">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalUser">
      </el-pagination>
    </div>

    <el-dialog v-el-drag-dialog  :title="dialogTitleType" :visible.sync="dialogAddFormVisible" width="65%" :before-close="handleClose">
      <el-form :model="addUserForm" label-width="90px" :rules="rules" ref="addUserForm" size="medium">
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录账户:" prop="userAccount">
              <el-input v-model="addUserForm.userAccount" placeholder="请输入登录账户"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="userName">
              <el-input v-model="addUserForm.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别:" prop="userSex">
              <el-radio v-model="addUserForm.userSex" label="1">男</el-radio>
              <el-radio v-model="addUserForm.userSex" label="0">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期:" prop="userBirthday">
              <el-date-picker
                v-model="addUserForm.userBirthday"
                type="date"
                placeholder="请选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族:" prop="nationality">
              <el-select v-model="addUserForm.nationality" clearable placeholder="请选择民族">
                <el-option
                  v-for="item in nationalityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历:" prop="qualification">
              <el-select v-model="addUserForm.qualification" clearable placeholder="请选择学历">
                <el-option
                  v-for="item in qualificationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门:" prop="userDept">
              <el-input v-model="addUserForm.userDept" placeholder="请输入部门"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位:" prop="userPosition">
              <el-input v-model="addUserForm.userPosition" placeholder="请输入职位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码:" prop="userPhone">
              <el-input v-model="addUserForm.userPhone" placeholder="请输入手机号码" maxlength="11" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱:" prop="userEmail">
              <el-input v-model="addUserForm.userEmail" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="住址:" prop="userAddress">
              <!-- Use default region caller button -->
              <v-region :town="true"  class="form-control"  :ui="true" :selected="addUserForm.userAddress"></v-region>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  prop="userAddressDetail" style="margin-top: -10px;">
              <el-input v-model="addUserForm.userAddressDetail" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简介:" prop="userRemarks">
              <el-input type ='textarea' :rows="4" v-model="addUserForm.userRemarks" placeholder="请输入简介" maxlength="250" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="resetForm('addUserForm')" icon="el-icon-refresh">重 置</el-button>
        <el-button type="primary" @click="saveUser('addUserForm')" icon="el-icon-check">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script >
  import userSetting from './userSetting';
  export default userSetting;
</script>

<style lang="less" scoped>

</style>
