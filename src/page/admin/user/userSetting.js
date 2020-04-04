import {validatePhone} from '../../validateUtils/validate';
import {nation_data} from '../../commonUtils/nationData';
import {qualification_data} from '../../commonUtils/qualificationData';
import {getUserList} from '@/api/getData'

export default {
  name: 'userSetting',
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>;
      },
      ok: false,
      options: [{
        value: '选项1',
        label: '掌上网优'
      }, {
        value: '选项2',
        label: '网格宝'
      }, {
        value: '选项3',
        label: '网优平台'
      }, {
        value: '选项4',
        label: '大数据平台'
      }, {
        value: '选项5',
        label: '移动用户'
      }],
      value1: [],
      value2: [],
      value: [1, 4],
      roleData: generateData(),
      dialogFormVisible: false,
      formLabelWidth: '120px',
      user: {},
      formInline: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        userId: 1,
        createTime: '2016-05-02',
        account: 'admin',
        name: '王小虎',
        deptName: '开发部',
        positionName: '董事长',
        phone: '13426479384',
        userStatus: '1'
      }, {
        userId: 2,
        createTime: '2016-05-02',
        account: 'yyyy',
        name: '王大拿',
        deptName: '开发部',
        positionName: '总经理',
        phone: '13426479384',
        userStatus: '1'
      }],
      currentPage1: 1,
      pageSizes:[10, 20, 30, 40],
      pageSize:10,
      totalUser:40,
      addUserForm: {
        userAccount: '',
        userName: '',
        userSex:'1',
        userBirthday:'',
        nationality: '',
        qualification:'',
        userDept:'',
        userPosition:'',
        userPhone:'',
        userEmail:'',
        userAddress: {
          province: '350000',
          city: '350100',
          area: '350104',
          town: '350104008'
        },
        userAddressDetail:'',
        userRemarks:''
      },
      dialogAddFormVisible: false,
      dialogTitleType: '',
      rules: {
        userAccount: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          {min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: ['blur', 'change']}
        ],
        userPhone: [
          {required: true, message: '请输入手机电话号码', trigger: 'blur'},
          { validator: validatePhone, trigger: 'blur' }
        ],
        userEmail: [
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      nationalityOptions:nation_data,
      qualificationOptions: qualification_data
    }
  },
  async created (){


    let test= await getUserList()
    console.log(test);
    this.tableData=test.object;
    console.log(this.tableData);

  },

  methods: {

    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    /**
     * 查询用户
     */
    handleSearch() {

      let vName = this.formInline.userName;
      alert(vName);
      console.log("查询用户");
    },
    /**
     * 点击添加用户按钮触发函数
     */
    handleAdd() {


      let self = this;
      //设置visible属性，当为true时,添加用户窗口显示.
      self.dialogAddFormVisible = true;
      self.dialogTitleType = "添加用户";
      console.log("添加用户窗口显示");
    },
    /**
     * 查看用户详细信息
     */
    handleClick() {

      let vName = this.formInline.userName;
      alert(vName);
      console.log("查看用户详细信息");
    },
    /**
     * 点击编辑按钮触发函数,编辑当前选中要修改的用户数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleEdit(index, row) {
      let self = this;
      //设置visible属性，当为true时,编辑用户窗口显示.
      self.dialogAddFormVisible = true;
      self.dialogTitleType = "编辑用户";
      // let vId = row.userId;
      let vName = row.name;
      let vAccount = row.account;
      self.addUserForm.userName = vName;
      self.addUserForm.userAccount = vAccount;
      self.addUserForm.userPhone=row.phone;
      self.addUserForm.userPhone=row.phone;

      console.log("编辑用户窗口显示");
    },
    /**
     *  删除当前选中的用户数据
     * @param  当前选中行的索引
     * @param row 当前选中行
     */
    handleDelete(index, row) {
      let i = -1;
      let indexDt;
      this.tableData.forEach(function (s) {
        i++;
        if (s.userId == row.userId) {
          // alert(i +'========='+s.userId +'=========='+s.userDate+'=='+row.userId);
          indexDt = i;
          return;
        }
      });
      this.tableData.splice(indexDt, 1);
      console.log(index, row.userId);
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
          this.$refs['addUserForm'].resetFields();
          this.dialogAddFormVisible = false;
          done();
        })
        .catch(_ => {
        });
    },
    /**
     * 保存验证过后的用户数据
     * @param formName 表单名
     */
    saveUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!' + this.addUserForm.userName + this.addUserForm.userDescribe);
          this.$confirm('确认保存？')
            .then(async _ => {
              let res= await  this.$myapi.addUser(this.addUserForm);
              //清除缓存数据
              this.$refs[formName].resetFields();
              this.dialogAddFormVisible = false;
            })
            .catch(_ => {
            });
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
