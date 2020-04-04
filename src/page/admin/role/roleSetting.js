export default {
  name: 'roleSetting',
  data() {
    return {
      formInline:{},
      tableData: [{
        roleId:1,
        roleName: '超级管理员',
        roleDescribe: '查看编辑所有事件数据',
        roleStatus: '1'
      }, {
        roleId:2,
        roleName: '管理员1',
        roleDescribe: '查看所有事件数据',
        roleStatus: '1'
      }, {
        roleId:3,
        roleName: '管理员2',
        roleDescribe: '删除所有事件数据',
        roleStatus: '1'
      }, {
        roleId:4,
        roleName: '管理员3',
        roleDescribe: '修改所有事件数据',
        roleStatus: '1'
      }, {
        roleId:5,
        roleName: '管理员4',
        roleDescribe: '增加所有事件数据',
        roleStatus: '1'
      }, {
        roleId:6,
        roleName: '管理员5',
        roleDescribe: '让用户查看资产数据',
        roleStatus: '0'
      }, {
        roleId:7,
        roleName: '管理员6',
        roleDescribe: '用户可以查看漏洞数据',
        roleStatus: '0'
      }, {
        roleId:8,
        roleName: '管理员7',
        roleDescribe: '查看部分数据',
        roleStatus: '1'
      }, {
        roleId:9,
        roleName: '管理员8',
        roleDescribe: '查看部分数据',
        roleStatus: '0'
      }, {
        roleId:10,
        roleName: '管理员9',
        roleDescribe: '查看部分数据',
        roleStatus: '0'
      }],
      currentPage1: 1,
      multipleSelection: [],
      dialogFormVisible: false,
      permissionForm: {
        permissionData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }

      },
      addRoleForm:{
        roleName:'',
        roleDescribe:'',
        roleChecked:true
      },
      dialogAddFormVisible:false,
      dialogTitleType :'',
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        roleDescribe: [
          { min: 2, max: 160, message: '长度在 2 到 160 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 查询角色
     */
    handleSearch() {

      let vName = this.formInline.roleName;
      alert(vName);
      console.log("查询角色");
    },
    /**
     * 点击添加角色按钮触发函数
     */
    handleAdd() {
      let self = this;
      //设置visible属性，当为true时,添加角色窗口显示.
      self.dialogAddFormVisible=true;
      self.dialogTitleType  ="添加角色";
      console.log("添加角色窗口显示");
    },
    /**
     * 点击编辑按钮触发函数,编辑当前选中要修改的角色数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleEdit(index, row) {
      let self = this;
      //设置visible属性，当为true时,编辑角色窗口显示.
      self.dialogAddFormVisible = true;
      self.dialogTitleType  = "编辑角色";
      //let vId = row.roleId;
      let vName = row.roleName;
      let vDescribe = row.roleDescribe;
      let vStatus=row.roleStatus;
      self.addRoleForm.roleName = vName;
      self.addRoleForm.roleDescribe = vDescribe;
      if(vStatus==='1'){
        self.addRoleForm.roleChecked = true;
      }else{
        self.addRoleForm.roleChecked = false;
      }

      console.log("编辑角色窗口显示");
    },
    /**
     *  删除当前选中的角色数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleDelete(index,row) {
      let i=-1;
      let indexDt;
      this.tableData.forEach(function(s){
        i++;
        if (s.roleId==row.roleId){
          // alert(i +'========='+s.roleId +'=========='+s.roleDate+'=='+row.roleId);
          indexDt = i;
          return;
        }
      });
      this.tableData.splice(indexDt,1);
      console.log(index, row.roleId);
    },
    /**
     *
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    /**
     *
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * before-close 关闭前的回调，会暂停 Dialog 的关闭function(done)，done 用于关闭 Dialog
     * @param done
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          //清除缓存数据
          this.$refs['addRoleForm'].resetFields();
          this.dialogAddFormVisible = false;
          done();
        })
        .catch(_ => {});
    },
    /**
     * 保存验证过后的角色数据
     * @param formName 表单名
     */
    saveRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!'+this.addRoleForm.roleName +this.addRoleForm.roleDescribe);
          this.$confirm('确认保存？')
            .then(_ => {
              //清除缓存数据
              this.$refs[formName].resetFields();
              this.dialogAddFormVisible = false;
            })
            .catch(_ => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 重置表单数据
     * @param formName 表单名
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
