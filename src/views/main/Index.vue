<template>
  <div class="layout" style="width:100%;height:100%">
        <Layout style="width:100%;height:100%">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </Layout>
    </div>
</template>
<script>

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  components: {
  },
  created() {
    this.$router.replace("/main/accountList");
  }
}
</script>
<style lang="scss" scoped>
</style>