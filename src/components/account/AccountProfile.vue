<template>
    <Modal
      width="600"
      :value="showStatus"
      title="添加人员"
      @on-cancel="cancel"
      @on-visible-change="visibleChange">
      <object id="CVR_IDCard" height=0 width=0 classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7" name="CVR_IDCard"></object>
      <Form :label-width="100">
      <!-- <FormItem>
        <Button type="primary" @click=readIDCard()>读取身份证</Button>
        <span :style="'color:'+messageColor">{{message}}</span>
      </FormItem> -->
      <div style="position:relative;">
        <div style="width:200px;position:absolute;top:0;bottom:0;height:100%;text-align:center;margin:auto;">
            <img src="../../assets/images/login/logo.png"/>
        </div>
        <div style="margin-left:200px; height:100%;">
            <FormItem label="姓名">
                <span>{{accountForm.name}}</span>
            </FormItem>
              <FormItem label="性别">
                <span>{{accountForm.gender}}</span>
            </FormItem>
            <FormItem label="民族">
                <span>{{accountForm.nation}}</span>
            </FormItem>
            <FormItem label="出生">
                <span>{{accountForm.birthday}}</span>
            </FormItem>
        </div>
      </div>
      <div>
        <FormItem label="住址">
              <span>{{accountForm.address}}</span>
          </FormItem>
          <FormItem label="公民身份证号">
              <span>{{accountForm.cardNo}}</span>
          </FormItem>
      </div>
      </Form>
      <div slot="footer">
          <Button type="primary" shape="circle" :loading="loading" @click="readIDCard()">读取身份证</Button>
      </div>
    </Modal>
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
        }
    },
    methods: {
        // ok () {
        //     this.$refs.modifyPasswordForm.validate((valid) => {
        //         if (valid) {
        //             modifyPassword(this.modifyPasswordForm.oldPassword,this.modifyPasswordForm.newPassword).then(data => {
        //             console.log(data);
        //             if (data.isSuccess) {
        //                 this.$Message.success('修改成功!');
        //                 this.$emit('modifyPasswordClose');
        //             }else{
        //                 this.$Message.error(data.message);
        //                 this.loading = false;
        //                 setTimeout(() => {
        //                     this.loading = true
        //                 }, 0)
        //             }
        //             })
        //         } else {
        //             this.loading = false;
        //             setTimeout(() => {
        //                 this.loading = true
        //             }, 0)
        //         }
        //     });
        //     console.log('Clicked ok');
        // },
        cancel () {
            //this.$emit('modifyPasswordClose');
            console.log('Clicked cancel');
        },
        visibleChange() {
            if(this.showStatus==false) {
            }
        },
        readIDCard() {
          var ret = CVR_IDCard.ReadCard();
          if (ret == "0"){
              this.accountForm.name=CVR_IDCard.Name; 
              this.accountForm.gender=CVR_IDCard.Sex;
              this.accountForm.nation=CVR_IDCard.Nation;
              this.accountForm.birthday =CVR_IDCard.Born;
              this.accountForm.address=CVR_IDCard.Address;
              this.accountForm.cardNo=CVR_IDCard.CardNo;
              this.accountForm.picture="data:image/jpeg;base64,"+CVR_IDCard.Picture;
              //this.insertAccount(this.formItem);
          }else{
              this.$Message.info("读卡错误:" + ret);
              this.accountForm={};
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
        }
    }
}
</script>
