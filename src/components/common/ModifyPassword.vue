<template>
  <div>
    <Modal
        :value="showStatus"
        title="修改密码"
        :loading="loading"
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        <Form ref="modifyPasswordForm" :model="modifyPasswordForm" :rules="modifyPasswordRules" :label-width="80">
            <FormItem label="旧密码"  prop="oldPassword">
                <Input :type="oldPasswordType" :autofocus="true" v-model.trim="modifyPasswordForm.oldPassword" :maxlength="20">
                    <Icon slot="suffix" :type="oldEyeType" @click="changeOldPasswordType"/>
                </Input>
            </FormItem>
            <FormItem label="新密码"  prop="newPassword">
                <Input :type="newPasswordType" v-model.trim="modifyPasswordForm.newPassword" :maxlength="20">
                    <Icon slot="suffix" :type="newEyeType" @click="changeNewPasswordType"/>
                </Input>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>
<script>
import { modifyPassword } from '@/api/backUser'

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
        const validateOldPassword = (rule, value, callback) => {
            console.log('validateOldPassword');
            if (value === '') {
                callback(new Error('请输入旧密码!'));
            } 
            callback();
        };
        const validateNewPassword = (rule, value, callback) => {
            console.log('validateNewPassword');
            if (value === '') {
                callback(new Error('请输入新密码!'));
            } else if (value.length<6) {
                callback(new Error('密码长度不小于6位!'));
            }else if (value == this.modifyPasswordForm.oldPassword) {
                callback(new Error('修改前后密码不能相同!'));
            } else {
                callback();
            }
        };
        return {
            loading: true,
            oldEyeType: 'md-eye-off',
            newEyeType: 'md-eye-off',
            oldPasswordType: 'password',
            newPasswordType: 'password',
            modifyPasswordForm: {
                oldPassword: '',
                newPassword: ''
            },
            modifyPasswordRules: {
                oldPassword: {required: true, validator: validateOldPassword, trigger: 'blur' },
                newPassword: {required: true, validator: validateNewPassword, trigger: 'blur' }
            },
        }
    },
    methods: {
        ok () {
            this.$refs.modifyPasswordForm.validate((valid) => {
                if (valid) {
                    modifyPassword(this.modifyPasswordForm.oldPassword,this.modifyPasswordForm.newPassword).then(data => {
                    console.log(data);
                    if (data.isSuccess) {
                        this.$Message.success('修改成功!');
                        this.$emit('modifyPasswordClose');
                    }else{
                        this.$Message.error(data.message);
                        //表单规则验证失败后，按钮无法点击，处于loading状态。
                        //官方目前没有解决方案
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true
                        }, 0)
                    }
                    })
                } else {
                    //表单规则验证失败后，按钮无法点击，处于loading状态。
                    //官方目前没有解决方案
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true
                    }, 0)
                }
            });
            console.log('Clicked ok');
        },
        cancel () {
            this.$emit('modifyPasswordClose');
            console.log('Clicked cancel');
        },
        changeOldPasswordType () {
            this.oldPasswordType = this.oldPasswordType === 'password' ? 'text' : 'password';
            this.oldEyeType = this.oldEyeType === 'md-eye' ? 'md-eye-off' : 'md-eye'
        },
        changeNewPasswordType () {
            this.newPasswordType = this.newPasswordType === 'password' ? 'text' : 'password';
            this.newEyeType = this.newEyeType === 'md-eye' ? 'md-eye-off' : 'md-eye'
        },
        visibleChange() {
            if(this.showStatus==false) {
                this.modifyPasswordForm.oldPassword = '';
                this.modifyPasswordForm.newPassword = '';
            }
        }
    }
}
</script>
