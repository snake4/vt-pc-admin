export default {
  name: 'menuSetting',
  data() {
    return {
      formInline:{},
      tableData: [{
        platformId:1,
        platformDate: '2015-05-22',
        platformName: '掌上网优',
        platformDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        platformId:2,
        platformDate: '2016-05-07',
        platformName: '网格宝',
        platformDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        platformId:3,
        platformDate: '2017-07-02',
        platformName: '网优平台',
        platformDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        platformId:4,
        platformDate: '2018-04-02',
        platformName: '大数据平台',
        platformDescribe: '上海市普陀区金沙江路 1518 弄'
      }, {
        platformId:5,
        platformDate: '2011-05-02',
        platformName: '移动平台',
        platformDescribe: '上发发区金沙江路 1518 弄'
      }, {
        platformId:6,
        platformDate: '2019-01-02',
        platformName: '淘宝平台',
        platformDescribe: '发发金沙江路 1518 弄'
      }, {
        platformId:7,
        platformDate: '2019-03-02',
        platformName: '微信平台',
        platformDescribe: '上海市普顶顶顶顶路 1518 弄'
      }, {
        platformId:8,
        platformDate: '2013-05-02',
        platformName: 'QQ平台',
        platformDescribe: '上海市普陀区金沙江路 1518 弄v尺寸v吧v成本报表胜多负少发射点发射点发射点发射点发射点防腐蚀方式方式'
      }, {
        platformId:9,
        platformDate: '2012-01-02',
        platformName: '京东平台',
        platformDescribe: '上海市普顶顶顶顶顶顶顶弄'
      }],
      currentPage1: 1,
      addPlatformForm:{
        platformName:'',
        platformDescribe:''
      },
      dialogAddFormVisible:false,
      dialogTitleType :'',
      rules: {
        platformName: [
          { required: true, message: '请输入平台名称', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        platformDescribe: [
          { min: 2, max: 160, message: '长度在 2 到 160 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 查询平台
     */
    handleSearch() {

      let vName = this.formInline.platformName;
      alert(vName);
      console.log("查询平台");
    },
    /**
     * 点击添加平台按钮触发函数
     */
    handleAdd() {
      let self = this;
      //设置visible属性，当为true时,添加平台窗口显示.
      self.dialogAddFormVisible=true;
      self.dialogTitleType  ="添加平台";
      console.log("添加平台窗口显示");
    },
    /**
     * 点击编辑按钮触发函数,编辑当前选中要修改的平台数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleEdit(index, row) {
      let self = this;
      //设置visible属性，当为true时,编辑平台窗口显示.
      self.dialogAddFormVisible = true;
      self.dialogTitleType  = "编辑平台";
      //let vId = row.platformId;
      let vName = row.platformName;
      let vDescribe = row.platformDescribe;
      self.addPlatformForm.platformName = vName;
      self.addPlatformForm.platformDescribe = vDescribe;

      console.log("编辑平台窗口显示");
    },
    /**
     *  删除当前选中的平台数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleDelete(index,row) {
      let i=-1;
      let indexDt;
      this.tableData.forEach(function(s){
        i++;
        if (s.platformId==row.platformId){
          // alert(i +'========='+s.platformId +'=========='+s.platformDate+'=='+row.platformId);
          indexDt = i;
          return;
        }
      });
      this.tableData.splice(indexDt,1);
      console.log(index, row.platformId);
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
          this.$refs['addPlatformForm'].resetFields();
          this.dialogAddFormVisible = false;
          done();
        })
        .catch(_ => {});
    },
    /**
     * 保存验证过后的平台数据
     * @param formName 表单名
     */
    savePlatform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!'+this.addPlatformForm.platformName +this.addPlatformForm.platformDescribe);
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
