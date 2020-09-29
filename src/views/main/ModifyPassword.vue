<template>
  <div>
    <Modal
        :value="showStatus"
        title="修改密码"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
export default {
    props: {
        showStatus: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    },
    data () {
        return {
        }
    },
    methods: {
        ok () {
            this.$emit('modifyPasswordClose');
            console.log('Clicked ok');
        },
        cancel () {
            this.$emit('modifyPasswordClose');
            console.log('Clicked cancel');
        }
    }
}
</script>
