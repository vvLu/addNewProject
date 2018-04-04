<template>
  <div id="addnew">
    <div class="panal">
    	<p class="title"><span class="title2">新增页面</span></p>
      <div class="content">
        <div class="left">
          <Leftadd @addData="addData" :projects="projects"/>
        </div>
        <div class="right">
          <Deta :detailList="detailList" :id="isId"></Deta>
        </div>
      </div>
    	
    </div>
  </div>
</template>

<script>
import Deta from 'components/detail/detail.vue'
import Leftadd from 'components/addproject/addproject.vue'
import {getplist} from 'api/getdetail'
export default {
  name: 'Addnewpj',
  components: {
    Deta,
    Leftadd
  },
  data () {
    return {
      detailList: {},
      projects: {},
      isId: 0 // 0没有id,1有id
    }
  },
  created () {
    console.log(this.$store.state.isLogin)
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
    _getplist (id) {
      getplist(id).then((res) => {
        if (res.data.code === 0) {
          this.detailList = res.data.data
        }
      })
    },
    addData (val) {
      console.log(val)
      this.detailList = Object.assign({}, {}, val)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#addnew
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
      display: flex
      padding: 30px 
      .left
        width:70%
        border-right: 1px dashed #ccc
        padding-right: 30px
      .right 
        width:30%
        margin-left: 30px
        //width: 380px
</style>
