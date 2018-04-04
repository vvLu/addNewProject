<template>
  <div id="app">
    <router-view v-if="$route.path === '/login'"></router-view>
    <div class="contents" v-if="$route.path !== '/login'">
      <transition name="fold" >
      <div class="left"  v-if="leftstatus">
        <mu-paper class="demo-menu leftmenues">
          <mu-appbar class="title" title="房先生项目上新平台"></mu-appbar>
          <mu-menu>
            <mu-menu-item leftIcon="description" activeClass to="/ProjectList" title="项目列表"/>
            <mu-menu-item leftIcon="note_add" to="/" title="新增页面" />
            <mu-menu-item v-if="$store.state.userTag === '2'"  leftIcon="person_add" to="/addstaff" title="新增员工" />
            <!-- {{$store.state.userTag}} -->
          </mu-menu>
        </mu-paper>
       </div>
      </transition>
        <div class="rightcontent" >
          <mu-appbar class="righttitle" title="">
          <mu-icon-button icon="menu" slot="left" @click="leftshow"/>
          <mu-icon-menu icon="person"  class="user" slot="right" :open="opens" >
            <mu-menu-item  value="1" title="退出登录" @click="logout"/>
            <mu-menu-item  value="2" title="修改密码" @click="changepaw"/>
          </mu-icon-menu>
        </mu-appbar>
        <router-view v-if="$route.path !== '/login'"></router-view>
        </div>
      </div>
  </div>
</template>

<script>
import menus from 'components/menu/menu'
// import {getCookie} from 'common/js/Cookies'
// import { mapActions} from 'vuex'
export default {
  name: 'app',
  components: {
    menus
  },
  data () {
    return {
      leftstatus: true,
      opens: false,
      userName: '',
      userPwd: '',
      tag: 2
    }
  },
  created () {
    var that = this
    setTimeout(function () {
      console.log(window.document.cookie.indexOf('userName='))
      if (window.document.cookie.indexOf('userName=') === -1) {
        that.$router.push('/login')
      } else {
        that.$store.state.userTag = window.document.cookie.split(';')[2].split('=')[1]
        console.log(window.document.cookie.split(';')[2].split('=')[1])
      }
    }, 500)
  },
  methods: {
    leftshow () {
      if (this.leftstatus === true) {
        this.leftstatus = false
      } else {
        this.leftstatus = true
      }
    },
    toggle () {
      this.opens = true
    },
    // 退出登录
    logout () {
      this.setCookie('', '', '', -1)
      this.$router.push('/login')
    },
    setCookie (name, pass, tag, exdays) {
      let exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      window.document.cookie = 'userName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userPwd' + '=' + pass + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userTag' + '=' + tag + ';path=/;expires=' + exdate.toGMTString()
    },
    // 修改密码
    changepaw () {
      this.$router.push('/usercenter')
    }
  }
}
</script>

<style>
#app{
	height:100%;
	display: flex
}
@media (min-width: 480px){
	.mu-appbar-title {
    font-size: 16px;
}
}
.contents{
  display: flex;
  width: 100%;
}
.left .mu-paper{
   background: #50504E;
   height: 100%
}
.left .mu-menu-item-wrapper{
	font-size: 14px
}
.rightcontent{
	width: 100%	;
  box-sizing: border-box;
  /* overflow: hidden; */
}
.leftmenues .mu-menu-item-wrapper{color: #fff}
.user .mu-menu-item-wrapper{color: #333}
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}
.userclass{
  color: #000
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
}
@keyframes fold-in {
  0% {
    width: 0;
    opacity: 0
  }
  100% {
    width: 130px;
    opacity: 1
  }
}
@keyframes fold-out {
  0% {
    width: 130px;
    opacity: 1
  }
  100% {
    width: 0;
    opacity: 0
  }
}
.router-link-exact-active{
  background: #000
}
.rightcontent .mu-appbar{
	background: #fff
}
.rightcontent .mu-appbar{
	color: #9F9F9F
}
input:-webkit-autofill{
  background-color:#fff !important
}
.mu-checkbox-wrapper .mu-checkbox-icon{
  margin-right: 2px
}
.mu-radio-wrapper .mu-radio-icon {
  margin-right: 2px
}
/*.mu-text-field-input{
   padding-left: 15px
 }*/ 
</style>
