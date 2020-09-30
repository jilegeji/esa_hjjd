<template>
    <Card dis-hover :bordered="false" class="view-title-card">
      <Row :gutter="16">
        <Col span="4">
          <Input type="text" v-model.trim="listQuery.username" :maxlength="50" clearable placeholder="按姓名查询"/>
        </Col>
        <Col span="20">
          <Button icon="ios-search" type="warning" class="search-btn" @click="search">查询</Button>
        </Col>
      </Row>
    </Card>
</template>
<script>
export default {
  name: 'Search',
  components: {
  },
  data () {
    return {
      listQuery: {
        username: null,
        current: 1,
        size: 10,
        total: 0
      },
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    /**
     * 检索用户信息
     */
    search () {
      this.$refs.userPage.rest()
      this.initList()
    },
  }
}
</script>