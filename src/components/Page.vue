<template>
  <Page :total="pageQuery.total" :current="pageQuery.current" :page-size="pageQuery.size"
        @on-change="changeCurrent" @on-page-size-change="changePageSize" :page-size-opts="sizeOpts"
        show-sizer show-elevator show-total style="font-size: 14px;"/>
</template>
<script>
/**
 * 封装分页组件
 * 使用时请注意，在父页面手动对pageQuery赋值
 * 请参考角色管理页面:
 *     this.listQuery = Object.assign({}, this.listQuery, {total: data.total})
 */
export default {
  name: 'CPage',
  props: {
    value: {
      type: Object,
      default: () => ({
        current: 1, size: 10, total: 1
      }),
      required: true
    },
    sizeOpts: {
      type: Array,
      default: () => ([10, 20, 30, 40]),
      required: false
    }
  },
  mounted () {
    // 有默认值时
    this.pageQuery = this.value
  },
  watch: {
    value (val) {
      this.pageQuery = val
    },
    pageQuery (val) {
      this.$emit('input', val)
    }
  },
  data: function () {
    return {
      pageQuery: {current: 1, size: 10, total: 100}
    }
  },
  created () {
  },
  methods: {
    changeCurrent (current) {
      this.pageQuery.current = current
      this.$emit('on-list', '')
    },
    changePageSize (pageSize) {
      this.pageQuery.size = pageSize
      this.$emit('on-list', '')
    },
    rest () {
      this.pageQuery.current = 1
      // this.pageQuery.size = 10
    }
  }
}
</script>
