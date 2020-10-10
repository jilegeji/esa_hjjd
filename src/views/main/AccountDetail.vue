<template>
  <div>
        <CHeader :showBack="true" :showAdd="false" :style="{position: 'fixed',width:'100%', height: '80px', top: 0,left: 0}"/>
        <Layout :style="{marginTop:'80px', overflow: 'auto'}">
            <Content style="overflow:auto">
                <div style="position:relative;">
                    <div style="width:200px;position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;">
                        <img style="max-height:80%;max-width:80%;" :src="'data:image/jpeg;base64,'+$route.query.picture"/>
                    </div>
                    <div style="margin-left:200px; height:100%;">
                        <Row>
                            <Col span="6"><div style="height:50px;display:flex;align-items:center;">姓名：{{$route.query.name}}</div></Col>
                            <Col span="6"><div style="height:50px;display:flex;align-items:center;">性别：{{$route.query.gender | sexFormat}}</div></Col>
                            <Col span="6"><div style="height:50px;display:flex;align-items:center;">民族：{{$route.query.nation}}</div></Col>
                            <Col span="6"><div style="height:50px;display:flex;align-items:center;">出生日期：{{$route.query.birthday}}</div></Col>
                        </Row>
                        <Row>
                            <Col><div style="height:50px;display:flex;align-items:center;">住址：{{$route.query.address}}</div></Col>
                        </Row>
                        <Row>
                            <Col><div style="height:50px;display:flex;align-items:center;">身份证号：{{$route.query.cardNo}}</div></Col>
                        </Row>
                    </div>
                </div>
            </Content>
        </Layout>
    </div>
</template>
<script>
import CHeader from '@/components/common/Header.vue'

export default {
    name: 'AccountDetail',
    data () {
        return {
        }
    },
    methods: {
    },
    created() {
        console.log("AccountDetail created");
    },
    activated() {
        console.log("AccountDetail activated");
    },
    components: {
        CHeader
    },
    filters: {
        sexFormat: (val)=> {
            if(val===1 || val==='1'){
                return '男'
            }
            if(val===0 ||  val==='0'){
                return '女'
            }
        }
    }
}
</script>