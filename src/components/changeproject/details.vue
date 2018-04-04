<template>
  <div id="add" :projects="projects"  :ids="ids" :projectid="projectid">
    <div class="loupanimg item" >
      <label class="labeltitle">主页图<i clas="icon-star"></i></label>
      <div>
        <div class="btns">
          <mu-raised-button label="添加主页图" class="demo-raised-button" primary />
          <input type="file" accept="image/jpg"  @change="addzhutu($event)"/>(60以内,3张)
        </div>
        <ul class="loupanzhanshi">
          <li  ref="zhutu" @mouseenter="onmouseoverzhutu(i, index)" @mouseleave="mouseleavezhutu(i, index)" v-for="(i,index) in project.homePage"  :key="index">
            <img :src='"http://sofmanager.fangsir007.com/image/" + i'><i ref="zhuicon" @click="deletzhutu(index)">X</i>
          </li>
          <li  ref="zhutu2" @mouseenter="onmouseoverzhutu2(i, index)" @mouseleave="mouseleavezhutu2(i, index)" v-for="(i,index) in project.homePage2"  :key="index">
            <img :src='i.data'><i ref="zhuicon2" @click="deletzhutu2(index)">X</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="item" >
    	<label class="labeltitle">项目地址<i class="icon-star"></i></label>
    	<mu-text-field v-model="project.address" @change="addarea" hintText="项目地址"/>
      <a target="_Blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">拾取坐标</a>
    </div>
    <div class="item">
      <label class="labeltitle">地址坐标<i class="icon-star"></i></label>
      经度:<mu-text-field type="number" v-model="project.longitude" hintText="0" />
      纬度:<mu-text-field type="number" v-model="project.latitude" hintText="0"/>
    </div>
    <div class="item yongjin" >
    	<label class="labeltitle">项目佣金<i class="icon-star"></i></label>
    	<div class="input">
    		<mu-text-field type="number" v-model="project.startBrokerage" hintText="0" @change="startxm"/>万——<mu-text-field type="number" v-model="project.endBrokerage" hintText="0" @change="endxm"/>万
    		<span>(一个值时仅填第二格)</span> 
    	</div>
    </div>
    <div class="item yongjin" >
    	<label class="labeltitle">个人佣金<i class="icon-star"></i></label>
    	<div class="input">
    		<mu-text-field type="number" v-model="project.startCommission" hintText="0" @change="startyongjin"/>万——<mu-text-field type="number" v-model="project.endCommission" hintText="0" @change="endyongjin"/>万
    		<span>(一个值时仅填第二格)</span> 
    	</div>
    </div>
    <div class="item" >
    	<label class="labeltitle">结佣标准<i class="icon-star"></i></label>
    	<mu-text-field hintText="结佣标准" v-model="project.commission_junction" multiLine @change="addjybz"/>	
    </div>
    <div class="item" >
    	<label class="labeltitle">项目卖点<i></i></label>
    	<mu-text-field hintText="结佣标准" v-model="project.selling_point" multiLine @change="addmaidian"/>	
    </div>
    <div class="item" >
      <label class="labeltitle">政策法规<i></i></label>
      <mu-text-field v-model="project.Policy" multiLine hintText="请输入政策法规" @change="addzc"/>
    </div>
    <div class="item loupan" >
    	<label class="labeltitle">楼盘信息<i></i></label>
    	<div class="right">
        <div class="item">
          <label class="labeltitle">户型<i></i></label>
          <mu-text-field v-model="project.huxing" @change="addhuxing"/>
        </div>
    		<div class="item">
    			<label class="labeltitle">总价<i class="icon-star"></i></label>
    			<mu-text-field type="number" v-model="project.totalPrice" @change="addzj"/>万元起
    		</div>
        <div class="item">
          <label class="labeltitle">首付比例<i></i></label>
          <mu-text-field type="number" v-model="project.downPayment" @change="payment"/>%
        </div>
    		<div class="item">
    			<label class="labeltitle">交房时间<i></i></label>
    			<mu-text-field v-model="project.deliveryTime" @change="adddt"/>
    		</div>
        <!-- v-model="project.renovationCode" -->
    		<div class="item">
    			<label class="labeltitle">装修情况<i></i></label> 
    			<mu-select-field v-model="project.renovations"  :labelFocusClass="['label-foucs']" @change="zhuangxiuchange">
				    <mu-menu-item v-for="(text,index) in zhuangxiutype" :key="text.key" :value="text" :title="text.key" />
				</mu-select-field>
    		</div>
    	</div>
    </div>
    <div class="item" >
    	<label class="labeltitle">区域介绍<i></i></label>
      <mu-text-field v-model="project.regional_introduction" multiLine hintText="请输入区域介绍" @change="addqyjieshao"/>
    </div>
    <div class="item" >
    	<label class="labeltitle">项目介绍<i></i></label>
      <mu-text-field v-model="project.project_introduction" multiLine hintText="请输入项目介绍" @change="addpjieshao"/>
    </div>
    <div class="item" >
      <label class="labeltitle">配套设施<i></i></label>
      <mu-text-field v-model="project.supporting_facilities" multiLine hintText="请输入配套设施" @change="addptss"/>
    </div>
    <div class="loupanimg item" >
      <label class="labeltitle">楼盘图<i clas="icon-star"></i></label>
      <div>
        <div class="btns">
          <mu-raised-button label="添加楼盘图" class="demo-raised-button" primary />
          <input type="file" accept="image/jpg"  @change="addloupanimg($event)"/>(60以内,10张以内)
        </div>
        <ul class="loupanzhanshi">
          <li ref="lpimgs2" @mouseenter="onmouseover2(i, index)" @mouseleave="mouseleave2(i, index)"   v-for="(i,index) in propertyalbum" >
            <img :src="i.data"><i ref="lpicon2" @click="deletloupan2(index)">X</i>
          </li>
          <li  ref="lpimgs" @mouseenter="onmouseover(i, index1)" @mouseleave="mouseleave(i, index1)" v-for="(i,index1) in propertyAlbum" >
            <img :src='"http://sofmanager.fangsir007.com/image/" + i'><i ref="lpicon" @click="deletloupan(index1)">X</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="loupanimg item" >
      <label class="labeltitle">户型图<i clas="icon-star"></i></label>
      <div>
        <div class="btns">
          <mu-raised-button label="添加户型图" class="demo-raised-button" primary />
          <input type="file" accept="image/jpg"  @change="addhuxingimg($event)"/>(60以内,10张以内)
        </div>
        <ul class="loupanzhanshi">
          <li  ref="hximgs" @mouseenter="onmouseoverhuxing(i, index)" @mouseleave="mouseleavehuxing(i, index)" v-for="(i,index) in project.huxingImg"  :key="index">
            <img :src='"http://sofmanager.fangsir007.com/image/" + i'><i ref="hxicon" @click="delethuxing(index)">X</i>
          </li>
          <li  ref="hximgs2" @mouseenter="onmouseoverhuxing2(i, index)" @mouseleave="mouseleavehuxing2(i, index)" v-for="(i,index) in project.huxingImg2"  :key="index">
            <img :src='i.data'><i ref="hxicon2" @click="delethuxing2(index)">X</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="item" >
      <label class="labeltitle">是否垫佣<i class="icon-star"></i></label>
      <mu-radio v-model="project.dianyong" v-for="(i,indexra) in radios" :key="indexra" :label="i.label" name="dainyong"  :nativeValue="i.value"   class="demo-radio" @change="linechange($event, i.value)"/>
    </div>
    <div class="item" >
      <label class="labeltitle">报备途径<i class="icon-star"></i></label>
      <div class="duanline">
        <div>提前</div><mu-text-field v-model="project.way"  hintText="24" @change="addtujin"/><div>分钟</div>
      </div>
    </div>
    <div class="item" >
      <label class="labeltitle">报备姓名标准<i class="icon-star"></i></label>
      <mu-radio v-for="(i,indexr) in radios2" v-model="project.nameStandard"  :key="indexr" :label="i.label" name="namebiaohzhun"  :nativeValue="i.value"   class="demo-radio" @change="linechangename($event, i)"/>
    </div>
    <div class="item" >
      <label class="labeltitle">报备电话标准<i class="icon-star"></i></label>
      <mu-radio v-for="(i,indexr3) in radios3"  v-model="project.telCode"  :key="indexr3" :label="i.label" name="phonebiaozhun"  :nativeValue="i.value"   class="demo-radio" @change="linechangephone($event, i)"/>
    </div>
    <div class="item" >
      <label class="labeltitle">客户保护期<i class="icon-star"></i></label>
      <div class="duanline">
        <mu-text-field v-model="project.customerprotectDate"  hintText="30" @change="addbaohu"/><div>天</div>
      </div>
    </div>
    <div class="item" >
      <label class="labeltitle">报备有效时间<i class="icon-star"></i></label>
      <div class="duanline">
        <mu-text-field v-model="project.protectDate"  hintText="24" @change="addprotectDate"/><div>天</div>
      </div>
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
import {getduijiepeople, getprovince, getcity, getdistrict, changeLists} from 'api/getdetail'
export default {
  name: 'add',
  props: ['projects', 'projectid', 'ids'],
  data () {
    return {
      project: {
        province: '',
        districtCode: '',
        cityCode: '',
        renovationCode: '',
        renovations: {},
        nameStandard: '',
        homePage: [{
          data: '',
          name: ''
        }, {
          data: '',
          name: ''
        }, {
          data: '',
          name: ''
        }],
        longitude: '',
        latitude: '',
        homePage2: [],
        huxingImg: [],
        huxingImg2: [],
        zhuimg: [],
        name_standardCode: '',
        telCode: '',
        dianyongcode: 0,
        shengcode: '',
        shicode: '',
        qucode: '',
        projectName: '',
        titleszm: '',
        address: '',
        commission_junction: '',
        returnPresentation: '',
        formatIntroduction: '',
        selling_point: '',
        Policy: '',
        deliveryTime: '',
        dianyong: '',
        regional_introduction: '',
        project_introduction: '',
        supporting_facilities: '',
        areas: [],
        seletarea: [],
        selectSheng: '',
        yjbiaozhun: [{
          value: ''
        }],
        way: '',
        xmmaidian: [{
          value: ''
        }],
        selectfangchan: '',
        selectdanjia: [],
        fuzer: [],
        fuzeren: '',
        fctypes: [],
        fangchan: '',
        dongtai: '',
        danjia: '',
        unit_price: [],
        mainji: '',
        jiaofang: '',
        quyu: [{
          value: ''
        }],
        xmjs: [{
          value: ''
        }],
        huxing: '',
        userId: '',
        dynamic: '',
        protectDate: '1',
        customerprotectDate: '15',
        totalPrice: '',
        downPayment: '',
        startCommission: '',
        endCommission: '',
        startBrokerage: '',
        endBrokerage: ''
      },
      newloupan: [],
      radios: [{
        label: '是',
        value: '1'
      }, {
        label: '否',
        value: '0'
      }],
      radios2: [{
        label: '客户全名',
        value: '2'
      }, {
        label: '*先生（女士）',
        value: '1'
      }],
      radios3: [{
        label: '前三后四',
        value: '1'
      }, {
        label: '全号',
        value: '2'
      }, {
        label: '前三后六',
        value: '3'
      }],
      propertyalbum: [],
      propertyAlbum: [],
      property_albums: [],
      huxing_imgs: [],
      fangchantypes: [],
      mainjis: [],
      zhuangxiutype: [],
      danjias: [],
      projectId: '',
      sheng: [],
      shi: [],
      qu: [],
      loupanimgs: [],
      home_page: [],
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
  watch: {
    project: {
      handler (old, news) {
        // this.project.propertyAlbum = old.propertyAlbum
      },
      deep: true
    }
  },
  created () {
    this._getprovince()
    this._getduijiepeople()
    setTimeout(() => {
      this.changeline()
    }, 1000)
  },
  methods: {
    // 佣金
    startyongjin () {
      this.$emit('startyj', this.project.startCommission)
    },
    // 佣金
    endyongjin () {
      this.$emit('endyj', this.project.endCommission)
    },
    // 佣金项目
    startxm () {
      this.$emit('startxmyj', this.project.startBrokerage)
    },
    // 佣金项目
    endxm () {
      this.$emit('endxmyj', this.project.endBrokerage)
    },
    // 字符串更改
    changeline () {
      if (this.projects) {
        // 项目ID
        this.projectId = this.projects.id
        // 主页图
        this.project.homePage = this.projects.homePage
        // 楼盘图
        this.propertyAlbum = this.projects.propertyAlbum
        // 户型图
        this.project.huxingImg = this.projects.huxingImg
        // 项目地址
        this.project.address = this.projects.address
        // 经度
        this.project.longitude = this.projects.longitude
        // 纬度
        this.project.latitude = this.projects.latitude
        // 佣金个人
        this.project.startCommission = String(this.projects.startCommission)
        this.project.endCommission = String(this.projects.endCommission)
        // 佣金项目
        this.project.startBrokerage = String(this.projects.startBrokerage)
        this.project.endBrokerage = String(this.projects.endBrokerage)
        // 结佣标准
        if (this.projects.commissionJunction) {
          this.project.commission_junction = this.projects.commissionJunction.join('\n')
        }
        // 房产类型
        this.project.selectfangchan = this.projects.type
        // 所属区域
        setTimeout(() => {
          this._getcity(this.projects.provinceCode)
          this._getdistrict(this.projects.cityCode)
        }, 1200)
        setTimeout(() => {
          this.project.province = this.projects.provinceCode
          this.project.cityCode = this.projects.cityCode
          this.project.districtCode = this.projects.districtCode
        }, 1600)
        // 项目买点
        if (this.projects.sellingPoint) {
          this.project.selling_point = this.projects.sellingPoint.join('\n')
        }
        // 政策法规
        if (this.projects.policy) {
          this.project.Policy = this.projects.policy.join('\n')
        }
        // 户型
        this.project.huxing = this.projects.huxing
        // 总价
        this.project.totalPrice = this.projects.totalPrice
        // 首付比例
        if (this.projects.downPayment) {
          this.project.downPayment = String(this.projects.downPayment)
        }
        // 交房时间
        this.project.deliveryTime = this.projects.deliveryTime
        // 装修情况
        let renovations = {
          'key': this.projects.renovation,
          'value': this.projects.renovationCode
        }
        this.project.renovations = renovations
        this.project.renovationCode = this.projects.renovationCode
        // 区域介绍
        if (this.projects.regionalIntroduction) {
          this.project.regional_introduction = this.projects.regionalIntroduction.join('\n')
        }
        // 项目介绍
        if (this.projects.projectIntroduction) {
          this.project.project_introduction = this.projects.projectIntroduction.join('\n')
        }
        // 配套设施
        if (this.projects.supportingFacilities) {
          this.project.supporting_facilities = this.projects.supportingFacilities.join('\n')
        }
        // 是否垫拥
        this.project.dianyong = String(this.projects.mats)
        // 报备途径
        this.project.way = String(this.projects.way)
        // 姓名标准
        this.project.nameStandard = String(this.projects.nameCode)
        this.project.name_standardCode = String(this.projects.nameCode)
        // 电话标准
        this.project.telCode = String(this.projects.telCode)
        this.project.customertel_standardCode = String(this.projects.telCode)
        // 客户保护期
        this.project.customerprotectDate = String(this.projects.customerprotectDate)
        // 报备有效时间
        this.project.protectDate = String(this.projects.protectDate)
      }
    },
    // 修改项目
    subInfo () {
      const formdata = new FormData()
      const _self = this
      for (var i = 0; i < this.home_page.length; i++) {
        formdata.append('homePage', this.home_page[i]) // 主页图
      }
      for (var s = 0; s < this.property_albums.length; s++) {
        formdata.append('propertyAlbum', this.property_albums[s]) // 楼盘图
      }
      for (var m = 0; m < this.huxing_imgs.length; m++) {
        formdata.append('huxingImg', this.huxing_imgs[m]) // 户型图
      }
      formdata.append('address', _self.project.address) // 地址
      formdata.append('longitude', _self.project.longitude) // x轴坐标地址
      formdata.append('latitude', _self.project.latitude) // y轴坐标地址
      formdata.append('startCommission', _self.project.startCommission) // 佣金
      formdata.append('endCommission', _self.project.endCommission) // 佣金
      formdata.append('startBrokerage', _self.project.startBrokerage) // 佣金项目
      formdata.append('endBrokerage', _self.project.endBrokerage) // 佣金项目
      formdata.append('commissionJunction', _self.project.commission_junction) // 结佣标准
      formdata.append('sellingPoint', _self.project.selling_point) // 项目卖点
      formdata.append('policy', _self.project.Policy) // 政策法规
      formdata.append('huxing', _self.project.huxing) // 户型
      formdata.append('totalPrice', _self.project.totalPrice) // 总价
      formdata.append('downPayment', _self.project.downPayment) // 首付比例
      formdata.append('deliveryTime', _self.project.deliveryTime) // 交房时间
      formdata.append('renovationCode', _self.project.renovationCode) // 装修
      formdata.append('regionalIntroduction', _self.project.regional_introduction) // 区域介绍
      formdata.append('projectIntroduction', _self.project.project_introduction) // 项目介绍
      formdata.append('supportingFacilities', _self.project.supporting_facilities) // 配套设施
      formdata.append('mats', _self.project.dianyongcode) // 是否垫佣
      formdata.append('way', _self.project.way) // 报备途径
      formdata.append('nameStandard', _self.project.name_standardCode) // 姓名标准
      formdata.append('telStandard', _self.project.customertel_standardCode) // 电话标准
      formdata.append('customerprotectDate', _self.project.customerprotectDate) // 保护期
      formdata.append('protectDate', _self.project.protectDate) // 报备有效时间
      formdata.append('id', _self.projectId)
      formdata.append('huxExist', _self.project.huxingImg) // 户型图
      formdata.append('listChartExist', _self.project.homePage) // 主页图
      formdata.append('propertyAlbumExist', _self.propertyAlbum) // 楼盘图
      this._postproject(formdata)
    },
    // 上传项目
    _postproject (data) {
      // var that = this
      changeLists(data).then((res) => {
        if (res.data.code === 0) {
          var that = this
          this.dialog = true
          this.info = '项目修改成功！'
          setTimeout(function () {
            that.dialog = false
          }, 2000)
          setTimeout(function () {
            that.$router.go(0)
          }, 800)
        } else {
          this.dialog = true
          this.info = '项目修改失败！'
          setTimeout(function () {
            that.dialog = false
          }, 2000)
        }
      }).catch((res) => {
        var that = this
        console.log(res)
        this.dialog = true
        this.info = '服务出错'
        setTimeout(function () {
          that.dialog = false
        }, 2000)
      })
    },
    // 获取对接人
    _getduijiepeople () {
      getduijiepeople().then((res) => {
        if (res.data.code === 0) {
          this.fangchantypes = res.data.data.property
          this.mainjis = res.data.data.area
          this.zhuangxiutype = res.data.data.adorn
          this.danjias = res.data.data.price
          this.project.userId = res.data.data.employee.id
        }
      })
    },
    // 提交项目前判断
    judgeInfo () {
      // 判断主图是否有
      if (this.project.zhuimg.length !== 3) {
        this.dialog = true
        this.info = '主图未上传！'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断项目地址
      if (this.project.address === '') {
        this.dialog = true
        this.info = '地址不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断x轴 y轴
      if (this.project.longitude === '' || this.project.latitude === '') {
        this.dialog = true
        this.info = 'x轴y轴不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断个人佣金
      if (this.project.endCommission === '') {
        this.dialog = true
        this.info = '个人佣金不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断项目佣金
      if (this.project.endBrokerage === '') {
        this.dialog = true
        this.info = '项目佣金不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断结佣标准
      if (this.project.commission_junction === '') {
        this.dialog = true
        this.info = '结佣标准不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断总价
      if (this.project.totalPrice === '') {
        this.dialog = true
        this.info = '总价不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
    },
    // 是否垫佣
    linechange (e, value) {
      this.project.dianyongcode = e // 0不垫佣，1垫佣
      // console.log(this.project.selectfangchan)
    },
    // 获取省份
    _getprovince () {
      getprovince().then((res) => {
        this.sheng = res.data.data
      })
    },
    // 获取市
    _getcity (sheng) {
      getcity(sheng).then((res) => {
        this.shi = res.data.data
      })
    },
    // 获取区域
    _getdistrict (qu) {
      getdistrict(qu).then((res) => {
        this.qu = res.data.data
      })
    },
    // 装修情况
    zhuangxiuchange (index, value) {
      var renovation = ''
      renovation = index.key
      this.project.renovationCode = index.value
      this.project.renovation = renovation
      this.$emit('zhuangxiuchange', renovation)
    },
    // 报备途径
    addtujin () {
      this.$emit('addtujin', this.project.way)
    },
    // 客户保护期
    addbaohu () {
      this.$emit('addbaohu', this.project.customerprotectDate)
    },
    // 报备有效时间
    addprotectDate () {
      this.$emit('addprotectDate', this.project.protectDate)
    },
    // 报备姓名标准
    linechangename (e, i) {
      this.project.name_standardCode = e // 1姓2全名
      var nameStandard = ''
      nameStandard = i.label
      this.project.nameStandard = nameStandard
      this.$emit('linechangename', nameStandard)
    },
    // 报备电话标准
    linechangephone (e, i) {
      this.project.customertel_standardCode = e // 1  前三后四隐号报备（例如：135****5678）2 全号报备3 前三后六隐号报备（例如：135**345678
      var telStandard = ''
      telStandard = i.label
      this.project.telStandard = telStandard
      this.$emit('linechangephone', telStandard)
    },
    shengchange (index) {
      this.project.shengcode = index
      this._getcity(index)
    },
    shichange (index) {
      this.project.shicode = index
      this._getdistrict(index)
    },
    quchange (index) {
      this.project.qucode = index
    },
    addName () {
      this.$emit('addData', this.project)
    },
    addarea () {
      this.$emit('addData', this.project.address)
    },
    // 结佣标准
    addjybz () {
      var commissionJunction = []
      commissionJunction = this.project.commission_junction.split('\n') // 结佣标准
      this.project.commissionJunction = commissionJunction
      this.$emit('addjybz', commissionJunction)
    },
    // 项目买点
    addmaidian () {
      var sellingPoint = []
      sellingPoint = this.project.selling_point.split('\n') // 项目卖点
      this.project.sellingPoint = sellingPoint
      this.$emit('addmaidian', sellingPoint)
    },
    addnewdongtai () {
      // var sellingPoint = []
      // sellingPoint = this.project.selling_point.split('\n') // 项目卖点
      // this.project.sellingPoint = sellingPoint
      this.$emit('addData', this.project)
    },
    // 政策法规
    addzc () {
      var policy = []
      policy = this.project.Policy.split('\n') // 政策法规
      this.project.policy = policy
      this.$emit('addzc', policy)
    },
    // 户型
    addhuxing () {
      this.$emit('addhuxing', this.project.huxing)
    },
    // 总价
    addzj () {
      this.$emit('addzj', this.project.totalPrice)
    },
    // 首付比例
    payment () {
      this.$emit('payment', this.project.downPayment)
    },
    // 交房时间
    adddt () {
      this.$emit('adddt', this.project.deliveryTime)
    },
    // 区域介绍
    addqyjieshao () {
      var regionalIntroduction = []
      regionalIntroduction = this.project.regional_introduction.split('\n') // 区域介绍
      this.project.regionalIntroduction = regionalIntroduction
      this.$emit('addqyjieshao', regionalIntroduction)
    },
    // 项目介绍
    addpjieshao () {
      var projectIntroduction = []
      projectIntroduction = this.project.project_introduction.split('\n') // 项目介绍
      this.project.projectIntroduction = projectIntroduction
      this.$emit('addpjieshao', projectIntroduction)
    },
    // 配套设施
    addptss () {
      var supportingFacilities = []
      supportingFacilities = this.project.supporting_facilities.split('\n') // 配套设施
      this.project.supportingFacilities = supportingFacilities
      this.$emit('addptss', supportingFacilities)
    },
    // 添加楼盘图
    addloupanimg (e) {
      var img = {
        data: '',
        name: ''
      }
      var file = e.target
      var reader = new FileReader()
      for (let s = 0; s < this.propertyalbum.length; s++) {
        if (file.files[0].name === this.propertyalbum[s].name) {
          this.message = '图片不能重复'
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
      }
      if (file.files[0].size > 60 * 1024) {
        this.toast = true
        this.message = '不能超过60k'
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        const _self = this
        reader.readAsDataURL(file.files[0])
        // if (img.length > 9) {
        //   this.toast = true
        //   this.message = '不能超过10张'
        //   setTimeout(() => {
        //     this.toast = false
        //   }, 2000)
        //   return
        // }
        reader.onload = function () {
          img.data = this.result
          img.name = file.files[0].name
          _self.property_albums.push(file.files[0])
          _self.newloupan.push(img.name)
        }
        this.propertyalbum.push(img)
        this.$emit('addloupanimg', this.propertyAlbum, this.newloupan)
      }
    },
    // 鼠标经过楼盘图
    onmouseover (i, index) {
      this.$refs.lpimgs[index].classList = 'active'
      this.$refs.lpicon[index].style.display = 'block'
    },
    // 鼠标离开楼盘图
    mouseleave (i, index) {
      this.$refs.lpimgs[index].classList = ''
      this.$refs.lpicon[index].style.display = 'none'
    },
    // 删除楼盘图
    deletloupan (index) {
      this.propertyAlbum.splice(index, 1)
      this.property_albums.splice(index, 1)
    },
    // 鼠标经过楼盘图2
    onmouseover2 (i, index) {
      this.$refs.lpimgs2[index].classList = 'active'
      this.$refs.lpicon2[index].style.display = 'block'
    },
    // 鼠标离开楼盘图2
    mouseleave2 (i, index) {
      this.$refs.lpimgs2[index].classList = ''
      this.$refs.lpicon2[index].style.display = 'none'
    },
    // 删除楼盘图
    deletloupan2 (index) {
      this.propertyalbum.splice(index, 1)
    },
    // 添加户型图
    addhuxingimg (e) {
      var img = {
        data: '',
        name: ''
      }
      var file = e.target
      var reader = new FileReader()
      for (let s = 0; s < this.project.huxingImg2.length; s++) {
        if (file.files[0].name === this.project.huxingImg2[s].name) {
          this.message = '图片不能重复'
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
      }
      if (file.files[0].size > 60 * 1024) {
        this.toast = true
        this.message = '不能超过60k'
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        reader.readAsDataURL(file.files[0])
        const _self = this
        // if (img.length > 9) {
        //   this.toast = true
        //   this.message = '不能超过10张'
        //   setTimeout(() => {
        //     this.toast = false
        //   }, 2000)
        //   return
        // }
        reader.onload = function () {
          img.data = this.result
          img.name = file.files[0].name
          _self.huxing_imgs.push(file.files[0])
        }
        this.project.huxingImg2.push(img)
      }
    },
    // 鼠标经过户型图
    onmouseoverhuxing (i, index) {
      this.$refs.hximgs[index].classList = 'active'
      this.$refs.hxicon[index].style.display = 'block'
    },
    // 鼠标离开户型图
    mouseleavehuxing (i, index) {
      this.$refs.hximgs[index].classList = ''
      this.$refs.hxicon[index].style.display = 'none'
    },
    // 删除户型图
    delethuxing (index) {
      this.project.huxingImg.splice(index, 1)
      this.huxing_imgs.splice(index, 1)
    },
     // 鼠标经过户型图2
    onmouseoverhuxing2 (i, index) {
      this.$refs.hximgs2[index].classList = 'active'
      this.$refs.hxicon2[index].style.display = 'block'
    },
    // 鼠标离开户型图2
    mouseleavehuxing2 (i, index) {
      this.$refs.hximgs2[index].classList = ''
      this.$refs.hxicon2[index].style.display = 'none'
    },
    // 删除户型图
    delethuxing2 (index) {
      this.project.huxingImg2.splice(index, 1)
    },
    // 添加主页图
    addzhutu (e) {
      var img = {
        data: '',
        name: ''
      }
      var file = e.target
      var reader = new FileReader()
      for (let s = 0; s < this.project.homePage2.length; s++) {
        if (file.files[0].name === this.project.homePage2[s].name) {
          this.message = '图片不能重复'
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
      }
      if (file.files[0].size > 60 * 1024) {
        this.toast = true
        this.message = '不能超过60k'
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        reader.readAsDataURL(file.files[0])
        const _self = this
        // if (img.length > 9) {
        //   this.toast = true
        //   this.message = '不能超过10张'
        //   setTimeout(() => {
        //     this.toast = false
        //   }, 2000)
        //   return
        // }
        reader.onload = function () {
          img.data = this.result
          img.name = file.files[0].name
          _self.home_page.push(file.files[0])
        }
        this.project.homePage2.push(img)
      }
    },
    // 鼠标经过主页图
    onmouseoverzhutu (i, index) {
      this.$refs.zhutu[index].classList = 'active'
      this.$refs.zhuicon[index].style.display = 'block'
    },
    // 鼠标离开主页图
    mouseleavezhutu (i, index) {
      this.$refs.zhutu[index].classList = ''
      this.$refs.zhuicon[index].style.display = 'none'
    },
    // 删除主页图
    deletzhutu (index) {
      this.project.homePage.splice(index, 1)
      this.home_page.splice(index, 1)
    },
     // 鼠标经过主页图2
    onmouseoverzhutu2 (i, index) {
      this.$refs.zhutu2[index].classList = 'active'
      this.$refs.zhuicon2[index].style.display = 'block'
    },
    // 鼠标离开主页图2
    mouseleavezhutu2 (i, index) {
      this.$refs.zhutu2[index].classList = ''
      this.$refs.zhuicon2[index].style.display = 'none'
    },
    // 删除主页图
    deletzhutu2 (index) {
      this.project.homePage2.splice(index, 1)
    },
    // 主图
    selectimg (e, i) {
      var img = this.project.homePage
      var file = e.target
      var reader = new FileReader()
      for (let s = 0; s < img.length; s++) {
        // reader[s] = img[s].data
        // formData.append("homePage"+(j+1), img[i]。da)
        if (file.files[0].name === img[s].name) {
          this.message = '图片不能重复'
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
      }
      if (file.files[0].size > 60 * 1024) {
        this.message = '不能超过60k'
        this.toast = true
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        reader.readAsDataURL(file.files[0])
        var _self = this
        reader.onload = function () {
          img[i].data = this.result
          img[i].name = file.files[0].name
          _self.project.zhuimg[i] = file.files[0]
        }
      }
    },
    // 展示主图
    showzhutu () {
      for (var i in this.project.homePage) {
        if (this.project.homePage[i].data === '') return
      }
      this.addName()
    },
    // 增加佣金标准
    addyj () {
      const value = {
        value: ''
      }
      this.project.yjbiaozhun.push(value)
    },
    // 删除佣金标准
    deleyj (e, i) {
      this.project.yjbiaozhun.splice(i, 1)
    },
    // 增加项目卖点
    addxm () {
      const value = {
        value: ''
      }
      this.project.xmmaidian.push(value)
    },
    // 删除项目卖点
    delexm (e, i) {
      this.project.xmmaidian.splice(i, 1)
    },
    // 增加区域
    addqy () {
      const value = {
        value: ''
      }
      this.project.quyu.push(value)
    },
    // 删除区域
    deleqy (e, i) {
      this.project.quyu.splice(i, 1)
    },
    // 增加区域
    addxmjs () {
      const value = {value: ''}
      this.project.xmjs.push(value)
    },
    // 删除区域
    delexmjs (e, i) {
      this.project.xmjs.splice(i, 1)
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
    .labeltitle
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
