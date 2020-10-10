<template>
  <Header style="background-color:#338ae6;vertical-align:middle;">
    <Row type="flex" align="middle">
      <Col span="12">
        <div style="position:relative;height:80px;">
          <img style="position:absolute;top:0;bottom:0;margin:auto;" src="../../assets/images/login/logo.png"/>
        </div>
      </Col>
      <Col span="12">
        <Row type="flex" justify="end" align="middle">
          <Col>
            <Button v-show="showBack" @click="back()" type="warning" style="margin-right:25px;">返回</Button>
            <Button v-show="showAdd" @click="addAccount()" type="warning" style="margin-right:25px;">添加人员</Button>
            <Button type="warning" @click="modifyPassword()" style="margin-right:25px;">修改密码</Button>
            <Button type="error" @click="exit()">退出</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Header>
</template>
<script>
import { mapState } from 'vuex'
import store from '@/store'

export default {
  name: 'CHeader',
  computed: {
    ...mapState(['website'])
  },
  components: {
  },
  props: {
    showBack :{
      type: Boolean,
      default: false
    },
    showAdd :{
      type: Boolean,
      default: false
    },
  },
  methods: {
    back() {
      this.$router.replace({path: '/main/accountList'});
    },
    addAccount() {
      this.$emit('accountProfileClick','add');
    },
    modifyPassword() {
      this.$emit('modifyPasswordClick');
    },
    exit() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("loginName");
      this.$router.replace({path: '/login'});
    }
  }
}
</script>
<style scoped>
</style>
