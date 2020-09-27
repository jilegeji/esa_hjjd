<template>
  <div class="layout" style="width:100%;height:100%">
        <Layout style="width:100%;height:100%">
            <CHeader :style="{position: 'fixed',width:'100%', height: '80px', top: 0,left: 0}"/>
            <Layout :style="{marginTop:'80px', overflow: 'auto'}">
                <Content style="overflow:auto">
                  <AccountList/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import CHeader from '@/components/Header.vue'
import AccountList from '@/components/AccountList.vue'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    CHeader,
    AccountList
  }
}
</script>
<style lang="scss" scoped>
  .app-layout-spin {
    z-index: 99999;
    background-color: rgba(255,255,255, 1);
  }
</style>