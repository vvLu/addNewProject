<template>
  <div id="add" :ids="ids" :projectid="projectid">
    <div></div>
    <div class="item" >
    	<label class="labeltitle">最新动态<i></i></label>
    	<mu-text-field v-model="project.dynamic" multiLine hintText="请输入动态" @change="addnewdongtai"/>
    </div>
    <div class="item" >
      <label class="labeltitle">是否发短信<i class="icon-star"></i></label>
      <mu-radio v-for="(i,indexr3) in project.radios3"    :key="indexr3" :label="i.label" name="phonebiaozhun"  :nativeValue="i.value"   class="demo-radio" @change="linechangephone(i)"/>
    </div>
    <div class="footBtn">
        <mu-raised-button   label="修改" class="demo-raised-button" primary @click="subInfo"/>
      </div>
    <mu-toast v-if="toast" :message="message" />
    <mu-dialog :open="dialog" title="提示">
      <span>{{info}}</span>
    </mu-dialog>
  </div>
</template>

<script>
import {changedtinfo} from 'api/getdetail'
export default {
  name: 'add',
  props: ['projectid', 'ids', 'projects'],
  data () {
    return {
      project: {
        radios3: [{
          label: '是',
          value: '1'
        }, {
          label: '否',
          value: '0'
        }],
        dynamic: '',
        projectId: '',
        msg: ''
      },
      toast: false,
      message: '不能超过60k',
      dialog: false,
      info: '',
      error: {
        zhutuerror: false,
        name: '',
        shouzimu: '',
        area: '',
        min: '',
        max: '',
        jieyong: '',
        sheng: '',
        shi: '',
        qu: '',
        danjia: '',
        zongjia: ''
      }
    }
  },
  created () {
    setTimeout(() => {
      this.project.dynamic = this.projects.dynamic
      this.project.projectId = this.projects.projectId
    }, 300)
  },
  methods: {
    // 提交项目
    subInfo () {
      const formdata = new FormData()
      const _self = this
      formdata.append('dynamic', this.project.dynamic)
      formdata.append('msg', _self.project.msg)
      formdata.append('id', _self.project.projectId)
      this._postproject(formdata)
    },
    _postproject (data) {
      changedtinfo(data).then((res) => {
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
    },
    addnewdongtai () {
      this.$emit('addnewdongtai', this.project.dynamic)
    },
    // 是否发送短信
    linechangephone (val) {
      this.project.msg = val.value
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#add
  background:#fff
  padding: 30px 10px
  li 
  	list-style: none
  ul
  	padding: 0
  	margin: 0
  .item
    display: flex
    margin-bottom: 25px
    .errortext
      color: red
    .mu-text-field
      width: 80%
    .labeltitle
      width: 130px
      //color: #ff5f00
      line-height: 48px
    .duanline
      display: flex
      line-height: 48px
      .mu-text-field
        width: 100px
    .diqu
      .mu-text-field
        width: 150px
    .mu-checkbox
      margin-right:15px
  	label
      // width: 100px
      // line-height: 48px 
      i
        font-size: 28px
        color: red
  .zut
  	display: flex
  	label
  	  width: 100px
  	.left
  	  width: 100%
	  .zhutu
	  	display: flex
	  	margin: 0
	  	padding: 0
	  	li
	  	  list-style: none
	  	  width: 100px
	  	  height: 100px
	  	  margin-right: 10px
	  	  border: 1px solid #ccc
	  	  position: relative
	  	  input
	  	  	position: absolute
	  	  	left: 0
	  	  	top: 0
	  	  	opacity: 0
	  	  	display: inline-block
	  	  	width: 100%
	  	  	height: 100%
	  .btns
	  	margin: 10px 0
	  	text-align: center
	  	color: #ccc
  .yongjin
  	.mu-text-field
  	  width:100px
  .loupan
    width: 100%
  	.right
      width: 80%
      border: 1px solid #ccc
      padding: 30px 20px
      border-radius: 10px 
	  .danjia, .item
        display: flex
        .danjiaright
          width: 100%
          display: flex
          .rights
            label
              display: block
              margin-right: 0
              margin-bottom: 10px 
              color: #ff5f00
          ul
            width: 70%
            border-right: 1px dashed #ccc
            margin-right: 10px
            li
              margin-right: 10px
              display: flex
              span
                width: 100px
              .mu-text-field-content
                .mu-text-field-input
                  padding-left: 15px
  .loupanimg
    width: 100%
    ul
      width: 600px
      over-flow: hidden
      li
        display: inline-block
        margin-right: 10px 
        width: 100px
        height: 100px
        border: 1px solid #ccc
        position: relative
        cursor:pointer
        img
          width: 100%
          height: 100%
        i
          position: absolute
          right: 8px
          top: 3px
          color: #fff
          display: none
      .active
        border: 1px solid #ff5f00
        box-shadow: 0px 0px 5px #ff3b00
      .active:before
        content:" "
        background-color:rgba(0,0,0,.3)
        display: inline-block
        width: 100%
        height: 100%
        position: absolute
    .btns
      position:relative
      margin-bottom: 15px
      input
        position:absolute
        top: 0
        left: 0
        opacity: 0
        display: inline-block
        width: 100%
        height: 100%
</style>
