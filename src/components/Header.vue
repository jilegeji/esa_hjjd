<template>
  <Header>
    <Row type="flex" justify="end">
      <Col span="14">
        <Row type="flex" justify="start" align="middle">
          <Col span="1" style="line-height:80px;text-align:center;height:80px">
          </Col>
          <Col span="23" style="line-height:0px">
            <p class="systemTitle">{{website.title.header}}</p>
            <p class="systemTitle" style="margin-top:20px;">Operational Maintenance System</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Header>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CHeader',
  computed: {
    ...mapState(['website'])
  },
  components: {
  },
  props: {
    system: {type: Boolean, default: true, required: false}
  }
}
</script>
<style scoped>
  .systemTitle{
    color: white !important;
    font-size: 16px !important;
    font-family: "Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu
  }
</style>
