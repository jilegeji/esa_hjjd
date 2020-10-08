<template>
  <div class="layout" style="width:100%;height:100%">
        <Layout style="width:100%;height:100%">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
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
  }
}
</script>
<style lang="scss" scoped>
</style>