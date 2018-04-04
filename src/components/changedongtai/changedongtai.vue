<template>
  <div id="changeproject">
    <div class="panal">
    	<p class="title"><span class="title2">修改动态信息</span></p>
      <div class="content">
        <div class="left">
          <Leftadd @addnewdongtai="addnewdongtai" :ids="isId" :projectid="projectId" :projects="projects"/>
        </div>
        <div class="right">
          <Deta :detailList="detailList" :id="isId"></Deta>
        </div>
      </div>
    	
    </div>
  </div>
</template>

<script>
import Deta from 'components/detail/changedetail.vue'
import Leftadd from 'components/changedongtai/details.vue'
import {getplist} from 'api/getdetail'
export default {
  name: 'changeproject',
  components: {
    Deta,
    Leftadd
  },
  data () {
    return {
      detailList: {},
      projects: {},
      isId: '', // 0没有id,1有id,
      projectId: ''
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.query.id) {
      console.log(this.$route.query.id)
      this._getplist(this.$route.query.id)
      this.isId = 1
      this.projectId = this.$route.query.id
    } else {
      this.isId = 0
    }
  },
  methods: {
    _getplist (id) {
      getplist(id).then((res) => {
        if (res.data.code === 0) {
          this.detailList = res.data.data
          this.detailList = Object.assign({}, {}, res.data.data)
          this.projects.dynamic = res.data.data.dynamic
          this.projects.projectId = res.data.data.id
        }
      })
    },
    addnewdongtai (val) {
      this.detailList.dynamic = val
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#changeproject
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
        //width:30%
        margin-left: 30px
        width: 380px
</style>
