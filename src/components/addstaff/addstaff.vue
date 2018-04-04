<template>
  <div id="projectList">
  	<div class="panal">
    	<p class="title"><span class="title2">增加新员工</span></p>
      <div class="content">
      	<div class="item">
	    	<label>姓名<i class="icon-star"></i></label>
	    	<mu-text-field v-model="name" :errorText="nameerrorText" hintText=""/>
	    </div>
	    <div class="item">
	    	<label>电话<i class="icon-star"></i></label>
	    	<mu-text-field v-model="phone" :errorText="phoneerrorText" hintText=""/>
	    </div>
	    <div class="item photo">
	    	<label>经纪人照片<i class="icon-star"></i></label>
	    	<div class="photo">
	    		<img :src="photo.data" width="100%" height="100%"/>
	    		<input type="file" accept="image/jpg"  @change="selectimg($event)"/>
	    	</div>
        <span class="tip">（限60k以下，JPG格式）</span>
        <div class="tip">{{photoerror}}</div>
	    </div>
	    <div class="item congye">
	    	<label>年限<i class="icon-star"></i></label>
	    	从业<mu-text-field v-model="cytime" :errorText="yearerrorText" hintText=""/>年
	    </div>
	    <div class="item">
	    	<label>擅长<i class="icon-star"></i></label>
	    	<mu-text-field v-model="ShaC" :errorText="shancherrorText" hintText="政策解读，现场逼定"/>
	    </div>
	    <div class="item">
	    	<label>格言<i class="icon-star"></i></label>
	    	<mu-text-field v-model="Glanguage" :errorText="geyanerrorText" hintText=""/>
	    </div>
	    <div class="item Bchip">
	    	<label>标签<i class="icon-star"></i></label>
	    	<ul >
	    		<li v-for="i,index in tips"  @mouseenter="onmouseover(i, index)" @mouseleave="mouseleave(i, index)"><input ref="tips"   v-model="i.value" placeholder="添加标签" :disabled="i.disabled" @change="tipadd(i, index)" /><i ref="tipicon" @click="removetipIcon(i, index)">x</i></li>
	    	</ul>
        <div class="tip" v-if="istip">*至少一个标签</div>
	    </div>
	    <div class="item">
	    	<label >自我介绍<i class="icon-star"></i></label>
	    	<mu-text-field v-model="selfJs" :errorText="selferrorText" multiLine hintText=""/>
	    </div>
      </div>
      <div class="footBtn">
	    	<!-- <mu-raised-button label="重填" class="demo-raised-button"/> -->
 		    <mu-raised-button label="提交" class="demo-raised-button" primary @click="subInfo"/>
        <!-- <mu-circular-progress v-if="loading" :size="20"/>
        <div class=""></div> -->
	    </div>
    </div>
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
  </div>	
</template>

<script>
import { addStaff } from 'api/getdetail'
export default {
  name: 'menus',
  data () {
    return {
      name: '',
      phone: '',
      phonepath: {},
      photo: {
        data: ''
      },
      cytime: '',
      ShaC: '',
      Glanguage: '',
      tips: [{
        value: '',
        disabled: false
      }],
      selfJs: '',
      toast: false,
      selferrorText: '',
      geyanerrorText: '',
      shancherrorText: '',
      yearerrorText: '',
      phoneerrorText: '',
      nameerrorText: '',
      photoerror: '',
      istip: false,
      message: '照片不能超过60k'
    }
  },
  methods: {
    // 提交
    subInfo () {
      console.log(this.tips[0].value)
      this.selferrorText = ''
      this.geyanerrorText = ''
      this.shancherrorText = ''
      this.yearerrorText = ''
      this.phoneerrorText = ''
      this.nameerrorText = ''
      this.photoerror = ''
      this.istip = false
      // 员工标签
      const tips = this.tips
      tips.filter((i) => {
        delete i.disabled
        return tips
      })
      const Tip = []
      for (var i = 0; i < tips.length; i++) {
        Tip[i] = tips[i].value
      }
      const moto = Tip.join(' ')
      console.log(moto)
      // 员工照片
      console.log(this.phonepath)
      // 判断是否有漏填
      if (this.name === '') {
        this.nameerrorText = '不能为空'
        // return
      } else if (this.phone === '' || this.phone.length !== 11) {
        this.phoneerrorText = '请输入正确电话号码'
        // return
      } else if (this.photo.data === '') {
        this.photoerror = '请上传照片'
        // return
      } else if (this.cytime === '') {
        this.yearerrorText = '不能为空'
        // return
      } else if (this.ShaC === '') {
        this.shancherrorText = '不能为空'
        // return
      } else if (this.Glanguage === '') {
        this.geyanerrorText = '不能为空'
        // return
      } else if (this.selfJs === '') {
        this.selferrorText = '不能为空'
        // return
      } else if (this.tips[0].value === '') {
        this.istip = true
        // return
      }
      // name, phone, img, workingLife, goodAt, motto, label, selfEvaluation
      addStaff(this.name, this.phone, this.phonepath, this.cytime, this.ShaC, this.Glanguage, moto, this.selfJs).then((res) => {
        if (res.data.code === 0) {
          this.name = ''
          this.phone = ''
          this.photo.data = ''
          this.cytime = ''
          this.ShaC = ''
          this.Glanguage = ''
          this.selfJs = ''
          this.tips = [{value: '', disabled: false}]
          this.toast = true
          this.message = '添加成功！'
          setTimeout(() => {
            this.toast = false
          }, 2000)
        }
      })
    },
    selectimg (e) {
      let img = this.photo
      let file = e.target
      let reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      if (file.files[0].size > 60 * 1024) {
        console.log('超过60k')
        this.message = '照片不能超过60k'
        this.toast = true
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        this.phonepath = file.files[0]
        reader.onload = function () {
          img.data = this.result
        }
      }
    },
    tipadd (i, index) {
      const value = {
        value: '',
        disabled: false
      }
      this.tips.push(value)
      this.tips[index].disabled = true
    },
    onmouseover (i, index) {
      if (i.disabled === true) {
        this.$refs.tips[index].style.background = '#ff6914'
        this.$refs.tips[index].style.color = '#fff'
        this.$refs.tipicon[index].style.display = 'inline-block'
      }
    },
    mouseleave (i, index) {
      if (i.disabled === true) {
        this.$refs.tips[index].style.background = '#fff'
        this.$refs.tips[index].style.color = '#333'
        this.$refs.tipicon[index].style.display = 'none'
      }
    },
    removetipIcon (i, index) {
      if (i.disabled === true) {
        this.tips.splice(index, 1)
      }
    },
    hideToast () {
      this.toast = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/reset"
#projectList
  background:#E9E9E9
  padding: 30px 10px
  .panal
  	border: 1px solid #DCDCDC
  	background:#fff
  	border-radius: 5px
  	margin: 0 auto
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
        .tip
          font-size: 12px
          color: red
        .photo
          position: relative
          width: 100px
          height: 100px
          input
            position: absolute
            left: 0
            top: 0
            opacity: 0
            display: inline-block
            width: 100%
            height: 100%  
      .Bchip label
        line-height: 0px
      .congye
        line-height:48px
        .mu-text-field
      	  width: 100px
         .mu-text-field-input
           text-align: center 
      .Bchip
      	ul
      	  padding-left: 0
      	  display: flex
      	  li
      	    list-style:none
      	    width: 80px
      	    border-radius:50px
      	    border: 1px dashed #ccc
      	    position: relative
      	    margin-right: 10px
      	    input
      	      width:100%
      	      padding: 0 10px
      	      border-radius: 50px
      	      margin-right:5px
      	      display: inline-block
      	    input:focus
      	      outline-offset: 0
      	    :focus
      	      outline: none
      	    i
      	      position: absolute
      	      top: 0
      	      right: 2px
      	      margin-left:5px
      	      padding: 0 3px
      	      display: none
      	      color: #fff
      .photo
        input
          text-align:center 
    .footBtn
      text-align: center
      margin-bottom: 50px
</style>
