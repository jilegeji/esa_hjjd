<template>
  <div>
        <CHeader :showBack="true" :showAdd="false" :style="{position: 'fixed',width:'100%', height: '80px', top: 0,left: 0}"/>
        <Layout :style="{marginTop:'80px', overflow: 'auto'}">
            <Content style="overflow:auto">
                this is detail content!
            </Content>
        </Layout>
    </div>
</template>
<script>
import CHeader from '@/components/common/Header.vue'

export default {
    data () {
        return {
        }
    },
    methods: {
    },
    components: {
        CHeader
    }
}
</script>