<template>
    <div>
        <CHeader :showBack="false" :showAdd="true" :style="{'z-index':1000,position: 'fixed',width:'100%', height: '80px', top: 0,left: 0}" @accountProfileClick="toggleAccountProfileShowStatus" @modifyPasswordClick="toggleModifyPasswordShowStatus()"/>
        <Layout :style="{marginTop:'80px', overflow: 'auto'}">
            <Content style="overflow:auto">
                <Card dis-hover :bordered="false" class="view-title-card">
                    <Row :gutter="16">
                    <Col span="4">
                        <Input type="text" v-model.trim="listQuery.name" :maxlength="5" clearable placeholder="按姓名查询"/>
                    </Col>
                    <Col span="20">
                        <Button icon="ios-search" type="warning" class="search-btn" @click="search">查询</Button>
                    </Col>
                    </Row>
                </Card>
                <Table border :columns="columns" :data="tableData" :loading="listLoading"/>
                <Row type="flex" justify="center" align="middle" style="margin-top:10px;">
                    <Col>
                        <CPage v-model="listQuery" @on-list="initList" ref="accountPage"/>
                    </Col>
                </Row>
            </Content>
        </Layout>
        <AccountProfile :originAccountForm="accountInfo" :type="accountProfileType" :showStatus="accountProfileStatus" @accountProfileClose="toggleAccountProfileShowStatus()" @refreshList="search()"></AccountProfile>
        <ModifyPassword :showStatus="modifyPasswordShowStatus" @modifyPasswordClose="toggleModifyPasswordShowStatus()"></ModifyPassword>
    </div>
</template>
<script>
import CHeader from '@/components/common/Header.vue'
import CPage from '@/components/common/Page.vue'
import ModifyPassword from '@/components/common/ModifyPassword'
import AccountProfile from '@/components/account/AccountProfile'
import { listAccount, delAccount } from '@/api/account'

export default {
    name: 'AccountList',
    data () {
        return {
            accountInfo: {
                name: '',
                gender: '',
                nation: '',
                birthday: '',
                address: '',
                cardNo: '',
                picture: ''
            },
            listQuery: {
                name: '',
                current: 1,
                size: 10,
                total: 0
            },
            tableData: [],
            accountProfileType:'add',
            accountProfileStatus:false,
            modifyPasswordShowStatus:false,
            sexFilter: { 1: '男', 0: '女' },
            listLoading: false,
            columns: [
                {
                    type: 'index',
                    width: 100,
                    align: 'center',
                    title: '序号'
                },
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: '性别',
                    key: 'gender',
                    render: (h, params) => { 
                        return h('span', this.sexFilter[params.row.gender])
                    }
                },
                {
                    title: '身份证号',
                    key: 'cardNo'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 250,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.detail(params.index)
                                    }
                                }
                            }, '情绪报告'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editInfo(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
        }
    },
    methods: {
        detail (index) {
            //这里携带的参数过长，ie浏览器地址栏显示有问题，但不影响程序的正常运行，垃圾ie。
            this.$router.push({path:'/main/accountDetail',query:this.tableData[index]});
        },
        editInfo (index) {
            this.accountInfo = Object.assign({}, this.tableData[index]);
            this.toggleAccountProfileShowStatus('modify');
        },
        remove (index) {
            this.$Modal.confirm({
                title: '警告',
                content: '确定删除此数据?',
                onOk: () => {
                    delAccount(this.tableData[index].cardNo).then((data) => {
                        if(data.result){
                            this.search();
                            this.$Message.success('删除成功');
                        }else{
                            this.$Message.error('删除失败');
                        }
                    })
                },
            });
        },
        toggleAccountProfileShowStatus(type){
            if(!this.accountProfileStatus){
                this.accountProfileType = type;
            }
            this.accountProfileStatus = !this.accountProfileStatus;
        },
        toggleModifyPasswordShowStatus(){
            this.modifyPasswordShowStatus = !this.modifyPasswordShowStatus;
        },
        initList () {
            this.listLoading = true;
            listAccount(this.listQuery).then(data => {
                this.tableData = data.result.rows;
                this.listQuery = Object.assign({},this.listQuery, {total: data.result.total});
                this.listLoading = false;
            }).catch((error)=>{
                console.error(error);
            })
        },
        search () {
            this.$refs.accountPage.rest();
            this.initList();
        },
    },
    components: {
        CHeader,CPage,ModifyPassword,AccountProfile
    },
    created() {
        this.initList();
    },
}
</script>
