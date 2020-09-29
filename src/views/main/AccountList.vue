<template>
    <div>
        <CHeader :showBack="false" :showAdd="true" :style="{'z-index':1000,position: 'fixed',width:'100%', height: '80px', top: 0,left: 0}"  @modifyPasswordClick="toggleModifyPasswordShowStatus()"/>
        <Layout :style="{marginTop:'80px', overflow: 'auto'}">
            <Content style="overflow:auto">
                <Search/>
                <Table border :columns="columns12" :data="data6">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="detail(index)">情绪报告</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click="editInfo(index)">查看</Button>
                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
                <Row type="flex" justify="center" align="middle">
                    <Col>
                    <CPage/>
                    </Col>
                </Row>
            </Content>
        </Layout>
        <ModifyPassword :showStatus="modifyPasswordShowStatus" @modifyPasswordClose="toggleModifyPasswordShowStatus()"></ModifyPassword>
    </div>
</template>
<script>
import CHeader from '@/components/Header.vue'
import Search from '@/components/Search.vue'
import CPage from '@/components/Page.vue'
import ModifyPassword from '@/views/main/ModifyPassword'

export default {
    data () {
        return {
            modifyPasswordShowStatus:false,
            columns12: [
                {
                    type: 'index',
                    width: 100,
                    align: 'center',
                    title: '序号'
                },
                {
                    title: 'Name',
                    slot: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 250,
                    align: 'center'
                }
            ],
            data6: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                },
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                },
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                },
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                },
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                }
                ,{
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                }
            ]
        }
    },
    methods: {
        detail (index) {
            this.$router.push('/main/accountDetail/'+this.data6[index].age);
        },
        editInfo (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.$Modal.confirm({
                title: '警告',
                content: '确定删除此数据?',
                onOk: () => {
                    this.data6.splice(index, 1);
                },
            });
        },
        toggleModifyPasswordShowStatus(){
            this.modifyPasswordShowStatus = !this.modifyPasswordShowStatus
        }
    },
    components: {
        CHeader,Search,CPage,ModifyPassword
    }
}
</script>
