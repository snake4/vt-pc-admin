
export default {
  name: 'projectSetting',
  data() {
    return {
      formInline:{},
      tableData: [{
        projectId:1,
        projectDate: '2015-05-22',
        projectName: '项目1',
        projectDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        projectId:2,
        projectDate: '2016-05-07',
        projectName: '项目2',
        projectDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        projectId:3,
        projectDate: '2017-07-02',
        projectName: '项目3',
        projectDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        projectId:4,
        projectDate: '2018-04-02',
        projectName: '项目4',
        projectDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        projectId:5,
        projectDate: '2011-05-02',
        projectName: '项目5',
        projectDescribe: '上发发区金沙江路 1518 弄'
      }, {
        projectId:6,
        projectDate: '2019-01-02',
        projectName: '项目6',
        projectDescribe: '发发金沙江路 1518 弄'
      }, {
        projectId:7,
        projectDate: '2019-03-02',
        projectName: '项目7',
        projectDescribe: '上海市普顶顶顶顶路 1518 弄'
      }, {
        projectId:8,
        projectDate: '2013-05-02',
        projectName: '项目8',
        projectDescribe: '上海市普陀区金沙江路 1518 弄v尺寸v吧v成本报表胜多负少发射点发射点发射点发射点发射点防腐蚀方式方式'
      }, {
        projectId:9,
        projectDate: '2012-01-02',
        projectName: '项目9',
        projectDescribe: '上海市普顶顶顶顶顶顶顶弄'
      }],
      currentPage1: 1,
      addProjectForm:{
        projectName:'',
        projectDescribe:''
      },
      dialogAddFormVisible:false,
      dialogTitleType :'',
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        projectDescribe: [
          { min: 2, max: 160, message: '长度在 2 到 160 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 查询项目
     */
    handleSearch() {

      let vName = this.formInline.projectName;
      alert(vName);
      console.log("查询项目");
    },
    /**
     * 点击添加项目按钮触发函数
     */
    handleAdd() {
      let self = this;
      //设置visible属性，当为true时,添加项目窗口显示.
      self.dialogAddFormVisible=true;
      self.dialogTitleType  ="添加项目";
      console.log("添加项目窗口显示");
    },
    /**
     * 点击编辑按钮触发函数,编辑当前选中要修改的项目数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleEdit(index, row) {
      let self = this;
      //设置visible属性，当为true时,编辑项目窗口显示.
      self.dialogAddFormVisible = true;
      self.dialogTitleType  = "编辑项目";
      //let vId = row.projectId;
      let vName = row.projectName;
      let vDescribe = row.projectDescribe;
      self.addProjectForm.projectName = vName;
      self.addProjectForm.projectDescribe = vDescribe;

      console.log("编辑项目窗口显示");
    },
    /**
     *  删除当前选中的项目数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleDelete(index,row) {
      let i=-1;
      let indexDt;
      this.tableData.forEach(function(s){
        i++;
        if (s.projectId==row.projectId){
          // alert(i +'========='+s.projectId +'=========='+s.projectDate+'=='+row.projectId);
          indexDt = i;
          return;
        }
      });
      this.tableData.splice(indexDt,1);
      console.log(index, row.projectId);
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
          this.$refs['addProjectForm'].resetFields();
          this.dialogAddFormVisible = false;
          done();
        })
        .catch(_ => {});
    },
    /**
     * 保存验证过后的项目数据
     * @param formName 表单名
     */
    saveProject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!'+this.addProjectForm.projectName +this.addProjectForm.projectDescribe);
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
