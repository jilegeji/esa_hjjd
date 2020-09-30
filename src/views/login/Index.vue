<template>
  <Layout class="login">
    <div style="position: absolute; top: 20px; left: 50px;">
      <img src="../../assets/images/login/logo.png"/>
    </div>
    <div style="position: absolute; bottom: 0px;">
      <img src="../../assets/images/login/bg.png"/>
    </div>
    <Row class="content">
      <Col offset="9" span="6">
        <Card class="animated fadeInRight">
          <p slot="title"> {{website.title.login}} </p>
          <Form ref="loginForm" :rules="loginRules" :model="loginForm">
            <FormItem prop="username">
              <Input type="text" v-model.trim="loginForm.username" :maxlength="50"
                     :autofocus="true" prefix="ios-person-outline" placeholder="请输入登录名称" />
            </FormItem>
            <FormItem prop="password">
              <Input :type="pwType" suffix="ios-eye-outline" v-model.trim="loginForm.password" :maxlength="20"
                     prefix="ios-lock-outline" placeholder="请输入登录密码" >
                <Icon slot="suffix" :type="pwEyeType" @click="changePWType"/>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" long @click="loginHandle" :loading="isDisabled" >登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 录</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { Message } from 'view-design'
import website from '@/const/website'
import {mapState} from 'vuex'
import { loginByNameAndPassword } from '@/api/backUser'
export default {
  name: 'Login',
  computed: {
    ...mapState([
        'website',
      ]),
  },
  data () {
    return {
      isDisabled: false,
      pwType: 'password',
      pwEyeType: 'md-eye-off',
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginRules: {
        username: {required: true, message: '请输入登录名称', trigger: 'blur'},
        password: {required: true, message: '请输入登录密码', trigger: 'blur'},
      }
    }
  },
  created () {
    if(!this.isIe()){
      Message.error('请使用ie浏览器')
    };
  },
  methods: {
    /**
     * 检查浏览器
     */
    isIe () {
      if (window.ActiveXObject || 'ActiveXObject' in window) { // IE
        return true;
      } else {
        return false;
      }
    },
    /**
     * 修改密码输入框可见类型
     */
    changePWType () {
      this.pwType = this.pwType === 'password' ? 'text' : 'password';
      this.pwEyeType = this.pwEyeType === 'md-eye' ? 'md-eye-off' : 'md-eye'
    },
    /**
     * 登录
     */
    loginHandle () {
      if(!this.isIe()){
        Message.error('请使用ie浏览器')
        //return false;
      };
      this.isDisabled = true

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
        //store.commit('SET_TOKEN', "testToken");
        loginByNameAndPassword(this.loginForm.username,this.loginForm.password).then(data => {
          console.log(data);
          if (data.isSuccess) {
            sessionStorage.setItem("token", data.message);  //添加到sessionStorage
            sessionStorage.setItem("loginName", this.loginForm.username);
            this.$router.replace({path: '/'})
          }else{
            this.isDisabled = false
            Message.error(data.message)
          }
        })
        } else {
          this.isDisabled = false
        }
      })
    },
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/login/login.scss';
</style>
