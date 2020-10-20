<template>
    <Modal
      width="600"
      :value="showStatus"
      :title="title"
      @on-cancel="cancel"
      @on-visible-change="visibleChange">
      <object id="CVR_IDCard" height=0 width=0 classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7" name="CVR_IDCard"></object>
      <Form ref="accountForm" :model="accountForm" :label-width="80">
        <div style="position:relative;">
            <div style="width:200px;position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;">
                <img v-if="accountForm.picture==''" style="max-height:80%;max-width:80%;" src="../../assets/images/account/defaultPic.png"/>
                <img v-else style="max-height:80%;max-width:80%;" :src="'data:image/jpeg;base64,'+accountForm.picture"/>
            </div>
            <div style="margin-left:200px; height:100%;">
                <FormItem label="姓名" prop="name">
                    <Input v-model="accountForm.name" :readonly="inputReadonly"/>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <Input :value="accountForm.gender | sexFormat" :readonly="inputReadonly" :disabled="!inputReadonly"/>
                </FormItem>
                <FormItem label="民族" prop="nation">
                    <Input v-model="accountForm.nation" :readonly="inputReadonly"/>
                </FormItem>
                <FormItem label="出生" prop="birthday">
                    <Input :value="accountForm.birthday | formatBirthday" :readonly="inputReadonly" :disabled="!inputReadonly"/>
                </FormItem>
            </div>
        </div>
        <div>
            <FormItem label="住址" prop="address">
                <Input v-model="accountForm.address" :readonly="inputReadonly"/>
            </FormItem>
            <FormItem label="身份证号" prop="cardNo">
                <Input v-model="accountForm.cardNo" :readonly="inputReadonly"/> 
            </FormItem>
        </div>
      </Form>
      <div slot="footer">
          <Button v-show="type=='add'?true:false" type="primary" shape="circle" :loading="loading" @click="readIDCard()">读取身份证</Button>
          <Button v-show="type=='add'?false:true" shape="circle" @click="cancel()">取消</Button>
          <Button v-show="type=='add'?false:true" type="primary" shape="circle" :loading="loading" @click="modify()">保存</Button>
      </div>
    </Modal>
</template>
<script>
import { insertAccount, modifyAccount} from '@/api/account'

export default {
    props: {
        showStatus: {
            type: Boolean,
            default: false
        },
        type: {//add And modify
            type: String,
            default: 'add'
        },
        originAccountForm: {
            type: Object,
            default: {
                name: '',
                gender: '',
                nation: '',
                birthday: '',
                address: '',
                cardNo: '',
                picture: ''
            }
        }
    },
    computed: {
        title() {
            return this.type=='add'?'添加用户':'查看/修改用户'
        },
        inputReadonly() {
            return this.type=='add'?true:false
        },
    },
    created() {
    },
    watch: {
        originAccountForm (val) {
            this.accountForm = Object.assign({},val);
        },
    },
    data () {
        return {
            loading: false,
            accountForm: {
                name: '',
                gender: '',
                nation: '',
                birthday: '',
                address: '',
                cardNo: '',
                picture: ''
            },
            sexFilter: { 1: '男', 0: '女' },
        }
    },
    methods: {
        cancel () {
            this.$emit('accountProfileClose');
        },
        visibleChange() {
            if(this.showStatus==false) {
                this.$refs.accountForm.resetFields();
                this.accountForm.picture = '';
            }
        },
        readIDCard() {
            this.loading = true;
            var ret = CVR_IDCard.ReadCard();
            if (ret == "0"){
                let formParams = {};
                formParams.name = CVR_IDCard.Name; 
                formParams.gender = CVR_IDCard.Sex;
                formParams.nation = CVR_IDCard.Nation;
                formParams.birthday = CVR_IDCard.Born;
                formParams.address = CVR_IDCard.Address;
                formParams.cardNo = CVR_IDCard.CardNo;
                formParams.picture = CVR_IDCard.Picture;
                this.add(formParams);
            }else{
                this.$refs.accountForm.resetFields();
                this.accountForm.picture = '';
                this.loading = false;
                this.$Message.info("读卡错误:" + ret);
            }
        },
        add(params) {
            insertAccount(params).then(data => {
                if (data.result) {
                    this.accountForm = Object.assign({},params);
                    this.$Message.success('身份证录入成功!');
                    this.$emit("refreshList");
                }else{
                    this.$refs.accountForm.resetFields();
                    this.accountForm.picture = '';
                    this.$Message.error(data.message);
                }
                this.loading = false;
            }).catch((error)=>{
                this.$refs.accountForm.resetFields();
                this.accountForm.picture = '';
                this.loading = false;
                console.error(error)
            })
        },
        modify() {
            modifyAccount(this.accountForm).then(data => {
                if (data.result) {
                    this.$Message.success('修改成功!');
                    this.$emit("refreshList");
                    this.cancel();
                }else{
                    this.$Message.error(data.message);
                }
                this.loading = false;
            }).catch((error)=>{
                this.loading = false;
                console.error(error)
            })
        },
    },
    filters: {
        sexFormat: (val)=> {
            if(val===1 || val==='1'){
                return '男'
            }
            if(val===0 ||  val==='0'){
                return '女'
            }
        },
        formatBirthday: (birthday)=> {
            return birthday.replace(/(.{4})(.{2})/,"$1-$2-")
        }
    }
}
</script>
