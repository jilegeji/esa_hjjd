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
        <!-- 注意4.0版本及以上每个类名前都要加上animate__。(ie浏览器中,dev模式下动画有效,build发布后无效,不清楚原因) -->
        <Card class="animate__animated animate__fadeInRight">
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
  },
  methods: {
    /**
     * 修改密码输入框可见类型
     */
    changePWType () {
      this.pwType = this.pwType === 'password' ? 'text' : 'password';
      this.pwEyeType = this.pwEyeType === 'md-eye' ? 'md-eye-off' : 'md-eye';
    },
    /**
     * 登录
     */
    loginHandle () {
      this.isDisabled = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          loginByNameAndPassword(this.loginForm.username,this.loginForm.password).then(data => {
            if (data.isSuccess) {
              sessionStorage.setItem("token", data.message);  //添加到sessionStorage
              sessionStorage.setItem("loginName", this.loginForm.username);
              this.$router.replace({path: '/'});
            }else{
              this.isDisabled = false;
              Message.error(data.message);
            }
          })
        } else {
          this.isDisabled = false;
        }
      })
    },
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/login/login.scss';
</style>
