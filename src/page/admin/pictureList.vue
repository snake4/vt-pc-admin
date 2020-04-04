<template>

  <div   >

    <div style="margin: 20px 0 0 20px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="图片介绍">
          <el-input v-model="formInline.user" placeholder="图片介绍"></el-input>
        </el-form-item>
        <el-form-item label="图片介绍">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      </el-form>

      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="图片"
            width="180">
            <template scope="scope">
              <img src="../../assets/img/avator.jpg" style="height: 50px;width: 50px"/>

            </template>
          </el-table-column>
          <el-table-column
            label="图片介绍"
            width="180">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>款式: {{ scope.row.name }}</p>
                <p>材质: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.name }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              操作
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">添加</el-button>
            </template>
            <template scope="scope">
              <div style="overflow: auto">
                <div style="display: inline-block">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </div>

                <div style="margin: 0 0 0 20px;display: inline-block">
                  <el-switch
                    style="display: block"
                    v-model="scope.row.name=='王小虎'?true:false"
                    active-color="#13ce66"
                    inactive-color="#999999"
                    active-text="上架"
                    inactive-text="下架"
                    @change="handleSwitch(scope.$index, scope.row)"
                  >
                  </el-switch>
                </div>

              </div>


            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin: 20px 0 0 0;text-align: center">

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>

        <el-dialog title="修改图片" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>

  </div>



</template>

<script>

  export default {
    name:'userList',
    data() {
      return {
        value4:true,
        currentPage4: 1,
        dialogFormVisible:true,
        formLabelWidth: '120px',
        form:{},
        user:{},
        formInline:{},
        tableData: [{
          date: '2016-05-02',
          name: '中式婚纱，充满东方魅力',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '经典婚纱,xxxxx',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '西式婚纱,xxxxxx',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '高贵婚纱',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      onSubmit(){

      },
      async updatePicture(){

      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        console.log(index, row);

      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSwitch(index, row){
        if(row.name=='王小虎'){
          row.name="王大虎"
        }else{
          row.name="王小虎"
        }
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(val)
        this.currentPage4 = val;
        this.offset = (val - 1)*this.limit;
       // this.getResturants()
      },
    }
  }


</script>

<style lang="less" scoped>
  @import '../../style/mixin';
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table_container{
    padding: 20px;
  }
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
</style>
