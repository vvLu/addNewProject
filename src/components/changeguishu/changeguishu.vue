<template>
  <div id="changeproject">
    <div class="panal">
    	<p class="title"><span class="title2">项目归属</span></p>
      <div class="content">
        <div class="item" >
            <label class="labeltitle">项目名称<i></i></label>
            <div>{{projectname}}</div>
        </div>
        <div class="item">
            <label class="labeltitle">修改项目归属人<i class="icon-star"></i></label>
            <mu-select-field v-model="people" :maxHeight="300" @change="changepeople">
              <mu-menu-item v-for="(i,index) in peoples" :key="i.key" :value="i.key" :title="i.value" />
            </mu-select-field>
        </div>
        <div class="footBtn">
          <mu-raised-button   label="修改" class="demo-raised-button" primary @click="subInfo"/>
        </div>
      </div>
    </div>
    <mu-toast v-if="toast" :message="message" />
    <mu-dialog :open="dialog" title="提示">
      <span>{{info}}</span>
    </mu-dialog>
  </div>
</template>

<script>
import Deta from 'components/detail/changedetail.vue'
import Leftadd from 'components/changeproject/details.vue'
import {allpeople, duijie, changeguishu} from 'api/getdetail'
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
      projectId: '',
      peoples: [],
      people: '',
      projectname: '',
      toast: false,
      message: '不能超过60k',
      dialog: false,
      info: ''
    }
  },
  created () {
    this._getplist()
    this.projectname = this.$route.query.item
    setTimeout(() => {
      this._duijie(this.$route.query.id)
    }, 800)
  },
  methods: {
    _getplist () {
      allpeople().then((res) => {
        if (res.data.data !== null) {
          this.peoples = res.data.data
        }
      })
    },
    _duijie (id) {
      duijie(id).then((res) => {
        if (res.data.data !== null) {
          this.people = res.data.data.key
        }
      })
    },
    addData (val) {
      // this.detailList = val
      this.detailList = Object.assign({}, {}, val)
    },
    changepeople () {
      console.log(this.people)
    },
    // 提交
    subInfo () {
      const formdata = new FormData()
      const _self = this
      formdata.append('person_id', _self.people)
      formdata.append('project_id', _self.$route.query.id)
      this._changeguishu(formdata)
    },
    _changeguishu (data) {
      changeguishu(data).then((res) => {
        if (res.data.code === 0) {
          var that = this
          this.dialog = true
          this.info = '修改成功！'
          setTimeout(function () {
            that.dialog = false
          }, 2000)
          setTimeout(function () {
            that.$router.go(0)
          }, 800)
        }
      })
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
      padding: 30px 
      .item
        display: flex
        margin-bottom: 25px
        .labeltitle
          width: 150px
          color: #ff5f00
</style>
