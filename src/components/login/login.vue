<template>
  <div class="login">
    <div class="panal">
    	<p>房先生项目上新系统</p>
      <mu-text-field v-model="user" :errorText="usererror" hintText="用户名"  icon="person"/><br/>
      <mu-text-field type="password" v-model="password" :errorText="pawerror"  hintText="请输入6位密码"  icon="lock_outline"/><br/>
      <!-- <div class="zidong">
        <mu-checkbox label="一周内自动登录" class="demo-checkbox" :value="checkde" @change="checked"/>
      </div> -->
      
      <div class="subtn">
        <mu-raised-button label="登录" @click="loginbtn" class="demo-raised-button tijiao"/>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from 'api/getdetail.js'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: '',
      password: '',
      usertag: '',
      checkde: false,
      usererror: '',
      pawerror: ''
    }
  },
  created () {
    this.getCookie()
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapActions(['Login']),
    loginbtn () {
      let name = this.user
      let pass = this.password
      let tag = this.usertag
      this.usererror = ''
      this.pawerror = ''
      if (pass === '' && name === '') {
        this.pawerror = '密码不能为空'
        this.usererror = '用户名不能为空'
        return
      } else if (pass === '' || pass === null) {
        this.pawerror = '密码不能为空'
        return
      } else if (name === '' || name === null) {
        this.usererror = '用户名不能为空'
        return
      }
      if (this.checkde === true) {
        this.setCookie(name, pass, tag, 7)
      }
      this._login(name, pass)
    },
    setCookie (name, pass, tag, exdays) {
      let exdate = new Date()
      // exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      exdate.setTime(exdate.getTime() + 60 * 1000 * 1)
      window.document.cookie = 'userName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userPwd' + '=' + pass + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userTag' + '=' + tag + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          console.log(arr2)
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.user = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.password = arr2[1]
          } else if (arr2[0] === 'userTag') {
            this.usertag = arr2[1]
          }
        }
        this._login(this.user, this.password)
      }
    },
    _login (name, pass) {
      login(name, pass).then((res) => {
        if (res.data.code === 1) {
          this.usererror = '账号或密码错误'
          this.pawerror = '账号或密码错误'
          this.clearCookie()
          this.$router.push('/login')
        } else if (res.data.code === 0) {
          this.Login()
          window.localStorage.setItem('loginInfo', true)
          localStorage.token_expire = 30
          this.setCookie(this.user, this.password, res.data.data.tag, 1)
          this.$router.push('/')
        }
      })
    },
    // 清除cookie
    clearCookie () {
      this.setCookie('', '', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    checked () {
      if (this.checkde === true) {
        this.checkde = false
      } else {
        this.checkde = true
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.login
  height:100%
  width: 100%
  background:#CF8644
  background:linear-gradient(to right, #CF8644, #E97C3F)
  background:-moz-linear-gradient(left, #CF8644, #E97C3F) 
  background:-webkit-linear-gradient(left, #CF8644, #E97C3F) 
  background:-o-linear-gradient(right, #CF8644, #E97C3F)
  display: flex
  justify-content: center
  align-items: center
  .panal
    background: #fff
    padding: 90px 180px
    border-radius: 15px
    box-shadow: 0px 0px 5px #888888;
    p
      font-size: 30px
      font-weight: bold
      text-align: center
      color: #DB5800
      margin-bottom: 20px
    .has-icon
      .mu-text-field-icon
        position: absolute
        left: 0px
    div
      width: 100%
      margin-bottom: 15px
      input
        width: 100%
        height: 46px
        border-radius: 5px
        border: 1px solid #F3F3F3
        padding-left: 10px
        box-shadow: 0px 5px 5px #ececec
    .subtn
      margin-top: 25px
      display: flex
      justify-content: center
      .tijiao
        background:linear-gradient(to right, #E87C3F, #EF9B4E)
        color: #fff
      .demo-raised-button
        padding: 20px 30px
    .zidong
      text-align: right
      margin-top: 15px
      font-size:10px
      .mu-checkbox-icon
        width: 12px
        height: 12px
      .mu-checkbox-label
        color: #ccc
</style>
