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
            <div style="width:200px;position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:flex-end;">
                <img style="max-height:80%;max-width:80%;" src="../../assets/images/account/defaultPic.png"/>
            </div>
            <div style="margin-left:200px; height:100%;">
                <FormItem label="姓名" prop="name">
                    <Input v-model="accountForm.name" :readonly="inputReadonly"/>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <Input v-model="accountForm.gender" :readonly="inputReadonly"/>
                </FormItem>
                <FormItem label="民族" prop="nation">
                    <Input v-model="accountForm.nation" :readonly="inputReadonly"/>
                </FormItem>
                <FormItem label="出生" prop="birthday">
                    <Input v-model="accountForm.birthday" :readonly="inputReadonly"/>
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
          <Button v-show="type=='add'?false:true" type="primary" shape="circle" :loading="loading" @click="saveAccount()">保存</Button>
      </div>
    </Modal>
</template>
<script>
import { insertAccount } from '@/api/account'

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
        accountForm: {
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
        }
    },
    created() {
    },
    data () {
        return {
            loading: false,
        }
    },
    methods: {
        cancel () {
            this.$emit('accountProfileClose');
        },
        visibleChange() {
            if(this.showStatus==false) {
                this.$refs.accountForm.resetFields();
            }
        },
        readIDCard() {
          var ret = CVR_IDCard.ReadCard();
          if (ret == "0"){
              this.accountForm.name = CVR_IDCard.Name; 
              this.accountForm.gender = CVR_IDCard.Sex;
              this.accountForm.nation = CVR_IDCard.Nation;
              this.accountForm.birthday = CVR_IDCard.Born;
              this.accountForm.address = CVR_IDCard.Address;
              this.accountForm.cardNo = CVR_IDCard.CardNo;
              this.accountForm.picture = "data:image/jpeg;base64,"+CVR_IDCard.Picture;
              this.addAccount(this.accountForm);
          }else{
              this.$Message.info("读卡错误:" + ret);
              this.$refs.accountForm.resetFields();
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
        },
        addAccount(params){
            insertAccount(params).then(data => {
                if (data.result) {
                    this.$Message.success('身份证录入成功!');
                    this.$emit("refreshList");
                }else{
                    this.$Message.error(data.message);
                    this.$refs.accountForm.resetFields();
                    //表单规则验证失败后，按钮无法点击，处于loading状态。
                    //官方目前没有解决方案
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 0)
                }
            }).catch((error)=>{
                console.error(error)
            })
        },
    }
}
</script>
