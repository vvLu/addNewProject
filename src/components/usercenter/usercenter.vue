<template>
  <div id="usercenter">
    <div class="panal">
    	<p class="title"><span class="title2">修改密码</span></p>
      <div class="content">
        <div class="item">
          <label>用户名<i class="icon-star"></i></label>
          <mu-text-field v-model="username" :errorText="usernameerror"  hintText=""/>
        </div>
        <div class="item">
          <label>原密码<i class="icon-star"></i></label>
          <mu-text-field v-model="odlepwa" type="password"  :maxLength="6" :errorText="odlepwaerror" hintText=""/> <!-- @input="checkOldpwa" -->
        </div>
        <div class="item">
          <label>新密码<i class="icon-star"></i></label>
          <mu-text-field v-model="newpwa" type="password" :errorText="newpwaerror" :maxLength="6" @input="newpwae" hintText=""/>
        </div>
        <div class="item">
          <label>重复密码<i class="icon-star"></i></label>
          <mu-text-field v-model="twiceNewpwa" type="password" :errorText="twiceNewpwaerror" :maxLength="6"  hintText="" @input="twicepwa"/>
        </div>
        <div class="footBtn">
          <mu-raised-button label="提交" class="demo-raised-button" primary @click="subsure"/>
        </div>
      </div>
    	
    </div>
  </div>
</template>

<script>
import {getCookie} from 'common/js/Cookies'
import {changelogin} from 'api/getdetail'
export default {
  name: 'Addnewpj',
  data () {
    return {
      username: '',
      odlepwa: '',
      newpwa: '',
      twiceNewpwa: '',
      usernameerror: '',
      odlepwaerror: '',
      newpwaerror: '',
      twiceNewpwaerror: '',
      cookieuserName: '',
      cookieuserPwd: ''
    }
  },
  created () {
    getCookie((res) => {
      console.log(res)
      if (res === undefined) {
        console.log(this.$route.path)
        // return
      } else {
        if (res[0] === 'userName') {
          this.cookieuserName = res[1]
        } else if (res[0] === 'userPwd') {
          this.cookieuserPwd = res[1]
        }
      }
    })
  },
  methods: {
    // 检查原密码是否正确
    checkOldpwa () {
      this.odlepwaerror = ''
      if (this.odlepwa.length === 6) {
        if (this.odlepwa !== this.cookieuserPwd) {
          this.odlepwaerror = '原密码不正确'
        }
      } else {
        this.odlepwaerror = '原密码不正确'
      }
    },
    twicepwa () {
      this.twiceNewpwaerror = ''
      if (this.twiceNewpwa.length === 6) {
        if (this.newpwa !== this.twiceNewpwa) {
          this.twiceNewpwaerror = '两次密码不一致'
          // return
        }
      } else {
        this.twiceNewpwaerror = '密码必须为6位'
        // return
      }
    },
    newpwae () {
      this.newpwaerror = ''
      if (this.newpwa.length !== 6) {
        this.newpwaerror = '密码必须为6位'
      }
    },
    subsure () {
      this.usernameerror = ''
      this.odlepwaerror = ''
      this.newpwaerror = ''
      this.twiceNewpwaerror = ''
      if (this.username === '') {
        this.usernameerror = '用户名不能为空'
        return
      } else if (this.odlepwa === '') {
        this.odlepwaerror = '原密码不能为空'
        return
      } else if (this.newpwa === '') {
        this.newpwaerror = '新密码不能为空'
        return
      } else if (this.twiceNewpwa === '') {
        this.twiceNewpwaerror = '请重复新密码'
        return
      }
      this.newpwae()
      this.twicepwa()
      console.log(333)
      changelogin(this.username, this.odlepwa, this.newpwa).then((res) => {
        if (res.data.code === 0) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#usercenter
  background:#E9E9E9
  padding: 30px 10px
  .panal
  	border: 1px solid #DCDCDC
  	background:#fff
  	border-radius: 5px
  	.title
  	  height:30px
  	  line-height:30px
  	  background:#F5F5F5
  	  margin:0
  	  padding-left:10px
  	  .title2
  	  	border-left:2px solid #EC6C37
  	  	padding-left:8px
    .content
      padding: 30px
      padding-left: 200px 
      .item
        display: flex
        margin-bottom: 20px
        label
          width: 100px
          line-height: 48px
          text-align: right
          margin-right: 10px
          i
            font-size: 14px
            color: red
      .footBtn
        padding-left: 200px
        margin-bottom: 50px
</style>
