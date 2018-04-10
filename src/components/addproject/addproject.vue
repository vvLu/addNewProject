<template>
  <div id="add" :data="projects" :ids="ids" :projectid="projectid">
    <div class="zut item" v-if="ids !== 1"> 
    	<label class="labeltitle">主页图<i class="icon-star"></i></label>
    	<div class="left">
    		<ul class="zhutu">
	    		<li v-for="(i, index) in project.homePage" :key="index">
	    			<img :src="i.data" width="100%" height="100%"/>
	    			<input type="file" accept="image/jpg"  @change="selectimg($event, index)"/>
	    		</li>
	    	</ul>
	    	<div class="btns">
	    		<mu-raised-button label="上传" class="demo-raised-button" primary @click="showzhutu"/>
	    		<span>（每张限于60k以下）</span>
	    	</div>
        <div v-if="error.zhutuerror"><span class="errortext">主页图必须上传3张！</span></div>
    	</div>
    </div>
    <div class="item" v-if="ids !== 1">
    	<label class="labeltitle">项目名称<i class="icon-star"></i></label>
    	<mu-text-field v-model="project.projectName" :errorText="error.name" hintText="项目名称" @change="addName"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">首字母<i class="icon-star"></i></label>
      <mu-text-field v-model="project.titleszm" :errorText="error.titleszm" hintText="请输入项目名称首字母(小写)" @change="initialInput" />
    </div>
    <div class="item projectArea" v-if="ids !== 1">
    	<label class="labeltitle">项目地址<i class="icon-star"></i></label>
    	<mu-text-field v-model="project.address" @change="addarea" hintText="项目地址"/>
      <a target="_Blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">拾取坐标</a>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">地址坐标<i class="icon-star"></i></label>
      经度:<mu-text-field type="number" v-model="project.longitude" hintText="0" />
      纬度:<mu-text-field type="number" v-model="project.latitude" hintText="0"/>
    </div>
    <div class="item yongjin" >
    	<label class="labeltitle">项目佣金<i class="icon-star"></i></label>
    	<div class="input">
    		<mu-text-field type="number" v-model="project.startBrokerage" hintText="0" @change="addName"/>万——<mu-text-field type="number" v-model="project.endBrokerage" hintText="0" @change="addName"/>万
    		<span>(一个值时仅填第二格)</span> 
    	</div>
    </div>
    <div class="item yongjin" >
    	<label class="labeltitle">个人佣金<i class="icon-star"></i></label>
    	<div class="input">
    		<!-- <mu-text-field v-model="project.commission" hintText="0"/> -->
    		<mu-text-field type="number" v-model="project.startCommission" hintText="0" @change="addName"/>万——<mu-text-field v-model="project.endCommission" type="number" hintText="0" @change="addName"/>万
    		<span>(一个值时仅填第二格)</span> 
    	</div>
    </div>
    <div class="item" >
    	<label class="labeltitle">结佣标准<i class="icon-star"></i></label>
    	<mu-text-field hintText="结佣标准" v-model="project.commission_junction" multiLine @change="addjybz"/>	
    </div>
    <div class="item" v-if="ids !== 1">
    	<label class="labeltitle">房产类型<i class="icon-star"></i></label>
      <!-- @change="linechangeFangchan($event, i.key)" -->
    	<mu-radio v-for="(i,index) in project.fangchantypes"  :key="index" :label="i.value"  :nativeValue="i.key" v-model="project.selectfangchan"  />
    </div>
    <div class="item" v-if="ids !== 1">
    	<label class="labeltitle">所属区域<i class="icon-star"></i></label>
    	<div class="diqu">
    		省<mu-select-field :maxHeight="300"  :labelFocusClass="['label-foucs']" @change="shengchange">
			       <mu-menu-item v-for="(text,index) in project.sheng" :key="text.key" :value="text.key" :title="text.value" />
			   </mu-select-field>
			市<mu-select-field  :maxHeight="300"  :labelFocusClass="['label-foucs']"  @change="shichange">
			    <mu-menu-item v-for="(text,index) in project.shi" :key="text.key" :value="text.key" :title="text.value" />
			</mu-select-field>
			区<mu-select-field :maxHeight="300" :labelFocusClass="['label-foucs']" @change="quchange">
			    <mu-menu-item v-for="(text,index) in project.qu" :key="text.key" :value="text.key" :title="text.value" />
			</mu-select-field>
    	</div>
    </div>
    <div class="item" v-if="ids !== 1">
    	<label class="labeltitle">项目卖点<i></i></label>
    	<mu-text-field hintText="请输入项目卖点" v-model="project.selling_point" multiLine @change="addmaidian"/>	
    </div>
    <div class="item" >
    	<label class="labeltitle">最新动态<i></i></label>
    	<mu-text-field v-model="project.dynamic" multiLine hintText="请输入动态" @change="addnewdongtai"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">政策法规<i></i></label>
      <mu-text-field v-model="project.Policy" multiLine hintText="请输入政策法规" @change="addzc"/>
    </div>
    <div class="item loupan" v-if="ids !== 1">
    	<label class="labeltitle">楼盘信息<i></i></label>
    	<div class="right">
    		<div class="item danjia">
    			<label class="labeltitle">单价<i class="icon-star"></i></label>
          <div class="danjiaright">
            <ul>
              <li v-for="(i, index) in project.fangchantypes" :key="index" :id="i.key" ><span >{{i.value}}</span> <mu-text-field ref="danjia"  @change="danPrice(i.key, i.value, index)"/></li>
            </ul>
            <div class="rights">
              <label>请选择单价区间<i class="icon-star"></i></label>
              <mu-checkbox v-for="(i,index) in project.danjias" :key="index" :label="i.value"  :nativeValue="i.key" v-model="project.selectdanjia"   />
              <!-- @change="linechangedanjia($event, i.key)" -->
            </div>
          </div>
    		</div>
        <div class="item">
          <label class="labeltitle">户型<i></i></label>
          <mu-text-field v-model="project.huxing" @change="addName"/>
        </div>
    		<div class="item">
    			<label class="labeltitle">总价<i class="icon-star"></i></label>
    			<mu-text-field type="number" v-model="project.totalPrice" @change="addName"/>万元起
    		</div>
        <div class="item">
          <label class="labeltitle">首付比例<i></i></label>
          <mu-text-field type="number"  v-model="project.downPayment" @change="addName"/>%
        </div>
    		<div class="item">
    			<label class="labeltitle">建筑面积<i></i></label>
          <div class="danjiaright">
            <ul>
              <li v-for="(i, index) in project.fangchantypes" :key="index" :id="i.key"><span>{{i.value}}</span>   <mu-text-field  ref="manji"  @change="areaseclet(i.key, i.value, index)"/></li>
            </ul>
            <div class="rights">
               <label>请选择面积区间</label>
               <!-- @change="linechangearea($event, i.key)" -->
               <mu-checkbox v-for="(i,index) in project.mainjis" :key="index" :label="i.value"  v-model="project.seletarea" :nativeValue="i.key"   />
            </div>
          </div>
    		</div>
    		<div class="item">
    			<label class="labeltitle">交房时间<i></i></label>
    			<mu-text-field v-model="project.deliveryTime" @change="addName"/>
    		</div>
    		<div class="item">
    			<label class="labeltitle">装修情况<i></i></label>
    			<mu-select-field v-model="project.zhuangxiu" :labelFocusClass="['label-foucs']" @change="zhuangxiuchange">
				    <mu-menu-item v-for="(text,index) in project.zhuangxiutype" :key="text.value" :value="text" :title="text.key" />
				</mu-select-field>
    		</div>
    	</div>
    </div>
    <div class="item" v-if="ids !== 1">
    	<label class="labeltitle">区域介绍<i></i></label>
      <mu-text-field v-model="project.regional_introduction" multiLine hintText="请输入区域介绍" @change="addqyjieshao"/>
    </div>
    <div class="item" v-if="ids !== 1">
    	<label class="labeltitle">项目介绍<i></i></label>
      <mu-text-field v-model="project.project_introduction" multiLine hintText="请输入项目介绍" @change="addpjieshao"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">配套设施<i></i></label>
      <mu-text-field v-model="project.supporting_facilities" multiLine hintText="请输入配套设施" @change="addptss"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">业务介绍<i></i></label>
      <mu-text-field v-model="project.formatIntroduction" multiLine hintText="请输入业务介绍" @change="addptss"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">回报介绍<i></i></label>
      <mu-text-field v-model="project.returnPresentation" multiLine hintText="请输入回报介绍" @change="addptss"/>
    </div>
    <div class="loupanimg item" v-if="ids !== 1">
      <label class="labeltitle">楼盘图<i clas="icon-star"></i></label>
      <div>
        <div class="btns">
          <mu-raised-button label="添加楼盘图" class="demo-raised-button" primary />
          <input type="file" accept="image/jpg"  @change="addloupanimg($event)"/>(60以内,10张以内)
        </div>
        <ul class="loupanzhanshi">
          <li  ref="lpimgs" @mouseenter="onmouseover(i, index)" @mouseleave="mouseleave(i, index)" v-for="(i,index) in project.propertyAlbum" :key="index"><img :src="i.data"><i ref="lpicon" @click="deletloupan(index)">X</i></li>
        </ul>
      </div>
    </div>
    <div class="loupanimg item" v-if="ids !== 1">
      <label class="labeltitle">户型图<i clas="icon-star"></i></label>
      <div>
        <div class="btns">
          <mu-raised-button label="添加户型图" class="demo-raised-button" primary />
          <input type="file" accept="image/jpg"  @change="addhuxingimg($event)"/>(60以内,10张以内)
        </div>
        <ul class="loupanzhanshi">
          <li  ref="hximgs" @mouseenter="onmouseoverhuxing(i, index)" @mouseleave="mouseleavehuxing(i, index)" v-for="(i,index) in project.huxingImg"  :key="index"><img :src="i.data"><i ref="hxicon" @click="delethuxing(index)">X</i></li>
        </ul>
      </div>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">是否垫佣<i class="icon-star"></i></label>
      <!-- @change="linechange($event, i.value)" -->
      <mu-radio v-for="(i,indexra) in project.radios" :key="indexra" :label="i.label" name="dainyong"  :nativeValue="i.value" v-model="project.dianyongcode"  class="demo-radio" />  
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">报备途径<i class="icon-star"></i></label>
      <div class="duanline">
        <div>提前</div><mu-text-field v-model="project.way"  hintText="1" @change="addName"/><div>小时</div>
      </div>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">报备姓名标准<i class="icon-star"></i></label>
      <mu-radio v-for="(i,indexr) in project.radios2" v-model="project.name_standardCode" :key="indexr" :label="i.label" name="namebiaohzhun"  :nativeValue="i.value"   class="demo-radio" @change="linechangename($event, i)"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">报备电话标准<i class="icon-star"></i></label>
      <mu-radio v-for="(i,indexr3) in project.radios3"  v-model="project.customertel_standardCode"  :key="indexr3" :label="i.label" name="phonebiaozhun"  :nativeValue="i.value"   class="demo-radio" @change="linechangephone($event, i)"/>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">客户保护期<i class="icon-star"></i></label>
      <div class="duanline">
        <mu-text-field v-model="project.customerprotectDate"  hintText="30" @change="addName"/><div>天</div>
      </div>
    </div>
    <div class="item" v-if="ids !== 1">
      <label class="labeltitle">报备有效时间<i class="icon-star"></i></label>
      <div class="duanline">
        <mu-text-field v-model="project.protectDate"  hintText="24" @change="addName"/><div>天</div>
      </div>
    </div>
    <div class="footBtn">
        <mu-raised-button  v-if="ids !== 1" label="提交" class="demo-raised-button" primary @click="subInfo"/>
        <mu-raised-button  v-if="ids === 1" label="修改" class="demo-raised-button" primary @click="changeInfo"/>
        
      </div>
    <mu-toast v-if="toast" :message="message" />
    <mu-dialog :open="dialog" title="提示">
      <span>{{info}}</span>
    </mu-dialog>
  </div>
</template>

<script>
import {getduijiepeople, getprovince, getcity, getdistrict, postproject, changeList} from 'api/getdetail'
export default {
  name: 'add',
  props: ['projects', 'projectid', 'ids'],
  data () {
    return {
      project: {
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
        zhuimg: [],
        name_standardCode: '1',
        dianyongcode: '0',
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
        regional_introduction: '',
        project_introduction: '',
        supporting_facilities: '',
        areas: [],
        seletarea: [],
        sheng: [],
        shi: [],
        qu: [],
        danjias: [],
        selectSheng: '',
        yjbiaozhun: [{
          value: ''
        }],
        way: '1',
        xmmaidian: [{
          value: ''
        }],
        fangchantypes: [],
        selectfangchan: '',
        selectdanjia: [],
        renovationCode: '',
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
          label: '仅姓氏（*先生/女士）',
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
        customertel_standardCode: '1',
        fuzer: [],
        fuzeren: '',
        fctypes: [],
        fangchan: '',
        dongtai: '',
        danjia: '',
        unit_price: [],
        mainjis: [],
        mainji: '',
        jiaofang: '',
        zhuangxiutype: [],
        zhuangxiu: '',
        quyu: [{
          value: ''
        }],
        xmjs: [{
          value: ''
        }],
        propertyAlbum: [],
        property_albums: [],
        huxingImg: [],
        huxing_imgs: [],
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
      loupanimgs: [],
      toast: false,
      message: '不能超过60k',
      dialog: false,
      info: '',
      error: {
        zhutuerror: false,
        name: '',
        titleszm: '',
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
    this._getprovince()
    this._getduijiepeople()
    var _self = this
    setTimeout(function () {
      if (_self.projectid !== undefined) {
        _self.project = _self.projects
        _self.project.commission_junction = _self.project.commissionJunction.join('\n')
      }
    }, 400)
  },
  methods: {
    // 修改项目
    changeInfo () {
      const formdata = new FormData()
      const _self = this
      formdata.append('startCommission', _self.project.startCommission) // 佣金
      formdata.append('endCommission', _self.project.endCommission) // 佣金
      formdata.append('commissionJunction', _self.project.commission_junction) // 结佣标准
      formdata.append('dynamic', _self.project.dynamic) // 最新动态
      formdata.append('id', _self.projectid)
      this._changeList(formdata)
    },
    _changeList (data) {
      changeList(data).then((res) => {
        if (res.data.code === 0) {
          this.dialog = true
          this.info = '修改成功！'
          var _self = this
          setTimeout(function () {
            _self.dialog = false
          }, 2000)
        }
      })
    },
    // 提交项目
    subInfo () {
      if (!this.judgeInfo()) {
        return
      }
      const formdata = new FormData()
      const _self = this
      for (var i = 0; i < this.project.zhuimg.length; i++) {
        formdata.append('homePage', this.project.zhuimg[i]) // 主页图
      }
      for (var s = 0; s < this.project.property_albums.length; s++) {
        formdata.append('propertyAlbum', this.project.property_albums[s]) // 楼盘图
      }
      for (var m = 0; m < this.project.huxing_imgs.length; m++) {
        formdata.append('huxingImg', this.project.huxing_imgs[m]) // 户型图
      }
      formdata.append('projectName', this.project.projectName) // 项目
      formdata.append('initials', _self.project.titleszm) // 首字母
      formdata.append('address', _self.project.address) // 地址
      formdata.append('longitude', _self.project.longitude) // x轴坐标地址
      formdata.append('latitude', _self.project.latitude) // y轴坐标地址
      formdata.append('startCommission', _self.project.startCommission) // 佣金
      formdata.append('endCommission', _self.project.endCommission) // 佣金
      formdata.append('startBrokerage', _self.project.startBrokerage) // 佣金项目
      formdata.append('endBrokerage', _self.project.endBrokerage) // 佣金项目
      formdata.append('commissionJunction', _self.project.commission_junction) // 结佣标准
      formdata.append('type', _self.project.selectfangchan) // 物业类型
      formdata.append('province', _self.project.shengcode) // 省
      formdata.append('city', _self.project.shicode) // 市
      formdata.append('district', _self.project.qucode) // 区
      formdata.append('sellingPoint', _self.project.selling_point) // 项目卖点
      formdata.append('dynamic', _self.project.dynamic) // 最新动态
      formdata.append('policy', _self.project.Policy) // 政策法规
      formdata.append('priceCode', _self.project.selectdanjia.join(',')) // 单价范围
      formdata.append('unitPrice', _self.project.unit_price.join(',')) // 单价
      formdata.append('huxing', _self.project.huxing) // 户型
      formdata.append('totalPrice', _self.project.totalPrice) // 总价
      formdata.append('downPayment', _self.project.downPayment) // 首付比例
      formdata.append('area', _self.project.areas.join(',')) // 面积
      formdata.append('areaCode', _self.project.seletarea.join(',')) // 面积范围
      formdata.append('deliveryTime', _self.project.deliveryTime) // 交房时间
      formdata.append('renovationCode', _self.project.renovationCode) // 装修
      formdata.append('regionalIntroduction', _self.project.regional_introduction) // 区域介绍
      formdata.append('projectIntroduction', _self.project.project_introduction) // 项目介绍
      formdata.append('supportingFacilities', _self.project.supporting_facilities) // 配套设施
      formdata.append('formatIntroduction', _self.project.formatIntroduction) // 业务介绍
      formdata.append('returnPresentation', _self.project.returnPresentation) // 回报介绍
      formdata.append('mats', _self.project.dianyongcode) // 是否垫佣
      formdata.append('way', _self.project.way) // 报备途径
      formdata.append('nameStandard', _self.project.name_standardCode) // 姓名标准
      formdata.append('telStandard', _self.project.customertel_standardCode) // 电话标准
      formdata.append('customerprotectDate', _self.project.customerprotectDate) // 保护期
      formdata.append('protectDate', _self.project.protectDate) // 报备有效时间
      formdata.append('id', _self.project.userId)
      this._postproject(formdata)
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
      // 判断项目名称
      if (this.project.projectName === '') {
        this.dialog = true
        this.info = '项目名称不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断项目首字母
      if (this.project.titleszm === '') {
        this.dialog = true
        this.info = '首字母不能为空!'
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
      // 判断房产类型
      if (this.project.selectfangchan === '') {
        this.dialog = true
        this.info = '房产类型不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断所属区域
      if (this.project.shengcode === '' || this.project.shicode === '' || this.project.qucode === '') {
        this.dialog = true
        this.info = '所属区域不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断单价
      if (this.project.unit_price.length === 0) {
        this.dialog = true
        this.info = '单价不能为空!'
        setTimeout(() => {
          this.dialog = false
        }, 1500)
        return false
      }
      // 判断单价区间
      if (this.project.selectdanjia.length === 0) {
        this.dialog = true
        this.info = '请选择单价区间!'
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
      return true
    },
    // 上传项目
    _postproject (data) {
      var that = this
      postproject(data).then((res) => {
        if (res.data.code === 0) {
          this.dialog = true
          this.info = '新项目上传成功！'
          setTimeout(function () {
            that.dialog = false
          }, 2000)
          setTimeout(function () {
            that.$router.go(0)
          }, 800)
        } else {
          this.dialog = true
          this.info = '新项目上传失败！'
          setTimeout(function () {
            that.dialog = false
          }, 2000)
        }
      }).catch((res) => {
        console.log(res)
        this.dialog = true
        this.info = '服务出错'
        setTimeout(function () {
          that.dialog = false
        }, 2000)
      })
    },
    // 首字母输入
    initialInput () {
      if (!/^[a-zA-Z]*$/.test(this.project.titleszm)) {
        this.error.titleszm = '必须输入小写字母'
        this.project.titleszm = ''
      } else {
        this.error.titleszm = ''
      }
    },
    // 获取对接人
    _getduijiepeople () {
      getduijiepeople().then((res) => {
        if (res.data.code === 0) {
          this.project.fangchantypes = res.data.data.property
          this.project.mainjis = res.data.data.area
          this.project.zhuangxiutype = res.data.data.adorn
          this.project.danjias = res.data.data.price
          this.project.userId = res.data.data.employee.id
        }
      })
    },
    // 是否垫佣
    linechange (e, value) {
      console.log(e)
      this.project.dianyongcode = e // 0不垫佣，1垫佣
      // console.log(this.project.selectfangchan)
    },
    // 获取省份
    _getprovince () {
      getprovince().then((res) => {
        this.project.sheng = res.data.data
      })
    },
    // 获取市
    _getcity (sheng) {
      getcity(sheng).then((res) => {
        this.project.shi = res.data.data
      })
    },
    // 获取区域
    _getdistrict (qu) {
      getdistrict(qu).then((res) => {
        this.project.qu = res.data.data
      })
    },
    // 单价
    danPrice (key, value, i) {
      // console.log(key, value, i)
      // console.log(this.$refs.danjia[i].inputValue)
      var data = ''
      data = value + ':' + this.$refs.danjia[i].inputValue
      if (this.$refs.danjia[i].inputValue !== '') {
        if (this.project.unit_price.length === 0) {
          this.project.unit_price.push(data)
        } else {
          console.log(this.project.unit_price)
          for (var f = 0; f < this.project.unit_price.length; f++) {
            console.log(this.project.unit_price[f].split(':')[0])
            if (this.project.unit_price[f].split(':')[0] === value) {
              this.project.unit_price.splice(this.project.unit_price.indexOf(this.project.unit_price[f]), 1)
            } else {
            }
          }
          this.project.unit_price.push(data)
        }
      }
      if (this.$refs.danjia[i].inputValue === '') {
        for (var s = 0; s < this.project.unit_price.length; s++) {
          console.log(this.project.unit_price[s].split(':')[0])
          if (this.project.unit_price[s].split(':')[0] === value) {
            this.project.unit_price.splice(this.project.unit_price.indexOf(this.project.unit_price[s]), 1)
          };
        }
      }
      console.log(this.project.unit_price.join(','))
      var unitPrice = ''
      unitPrice = this.project.unit_price.join(',')
      this.project.unitPrice = unitPrice
      this.$emit('addData', this.project)
    },
    // 单价选择
    linechangedanjia (e, value) {
      console.log(e)
    },
    // 面积
    areaseclet (key, value, i) {
      // console.log(key, value, i)
      // console.log(this.$refs.danjia[i].inputValue)
      var data = ''
      data = value + ':' + this.$refs.manji[i].inputValue
      if (this.$refs.manji[i].inputValue !== '') {
        // this.project.areas.push(data)
        if (this.project.areas.length === 0) {
          this.project.areas.push(data)
        } else {
          console.log(this.project.areas)
          for (var f = 0; f < this.project.areas.length; f++) {
            console.log(this.project.areas[f].split(':')[0])
            if (this.project.areas[f].split(':')[0] === value) {
              this.project.areas.splice(this.project.areas.indexOf(this.project.areas[f]), 1)
            } else {
            }
          }
          this.project.areas.push(data)
        }
      }
      if (this.$refs.manji[i].inputValue === '') {
        for (var s = 0; s < this.project.areas.length; s++) {
          console.log(this.project.areas[s].split(':')[0])
          if (this.project.areas[s].split(':')[0] === value) {
            this.project.areas.splice(this.project.areas.indexOf(this.project.areas[s]), 1)
          };
        }
      }
      console.log(this.project.areas.join(','))
      var area = ''
      area = this.project.areas.join(',')
      this.project.area = area
      this.$emit('addData', this.project)
    },
    // 面积选择
    linechangearea (e, value) {
      console.log(e)
      // console.log(this.project.selectfangchan)
    },
    // 装修情况
    zhuangxiuchange (index, value) {
      console.log(index, value)
      var renovation = ''
      renovation = index.key
      this.project.renovationCode = index.value
      this.project.renovation = renovation
      this.$emit('addData', this.project)
    },
    // 报备姓名标准
    linechangename (e, i) {
      console.log(e, i)
      this.project.name_standardCode = e // 1姓2全名
      var nameStandard = ''
      nameStandard = i.label
      this.project.nameStandard = nameStandard
      this.$emit('addData', this.project)
    },
    // 报备电话标准
    linechangephone (e, i) {
      console.log(e, i)
      this.project.customertel_standardCode = e // 1  前三后四隐号报备（例如：135****5678）2 全号报备3 前三后六隐号报备（例如：135**345678
      var telStandard = ''
      telStandard = i.label
      this.project.telStandard = telStandard
      this.$emit('addData', this.project)
    },
    shengchange (index) {
      console.log(index)
      this.project.shengcode = index
      this._getcity(index)
    },
    shichange (index) {
      console.log(index)
      this.project.shicode = index
      this._getdistrict(index)
    },
    quchange (index) {
      console.log(index)
      this.project.qucode = index
    },
    addName () {
      this.$emit('addData', this.project)
    },
    addarea () {
      this.$emit('addData', this.project)
    },
    addjybz () {
      var commissionJunction = []
      commissionJunction = this.project.commission_junction.split('\n') // 结佣标准
      this.project.commissionJunction = commissionJunction
      this.$emit('addData', this.project)
    },
    addmaidian () {
      var sellingPoint = []
      sellingPoint = this.project.selling_point.split('\n') // 项目卖点
      this.project.sellingPoint = sellingPoint
      this.$emit('addData', this.project)
    },
    addnewdongtai () {
      // var sellingPoint = []
      // sellingPoint = this.project.selling_point.split('\n') // 项目卖点
      // this.project.sellingPoint = sellingPoint
      this.$emit('addData', this.project)
    },
    addzc () {
      var policy = []
      policy = this.project.Policy.split('\n') // 政策法规
      this.project.policy = policy
      this.$emit('addData', this.project)
    },
    addqyjieshao () {
      var regionalIntroduction = []
      regionalIntroduction = this.project.regional_introduction.split('\n') // 区域介绍
      this.project.regionalIntroduction = regionalIntroduction
      this.$emit('addData', this.project)
    },
    addpjieshao () {
      var projectIntroduction = []
      projectIntroduction = this.project.project_introduction.split('\n') // 项目介绍
      this.project.projectIntroduction = projectIntroduction
      this.$emit('addData', this.project)
    },
    addptss () {
      var supportingFacilities = []
      supportingFacilities = this.project.supporting_facilities.split('\n') // 配套设施
      this.project.supportingFacilities = supportingFacilities
      this.$emit('addData', this.project)
    },
    // 添加楼盘图
    addloupanimg (e) {
      var img = {
        data: '',
        name: ''
      }
      var file = e.target
      var reader = new FileReader()
      for (let s = 0; s < this.project.propertyAlbum.length; s++) {
        if (file.files[0].name === this.project.propertyAlbum[s].name) {
          this.message = '图片不能重复'
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
      }
      if (file.files[0].size > 60 * 1024) {
        console.log('超过60k')
        this.toast = true
        this.message = '不能超过60k'
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        const _self = this
        reader.readAsDataURL(file.files[0])
        console.log(img.length)
        if (img.length > 9) {
          this.toast = true
          this.message = '不能超过10张'
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
        reader.onload = function () {
          img.data = this.result
          img.name = file.files[0].name
          _self.project.property_albums.push(file.files[0])
        }
        this.project.propertyAlbum.push(img)
        console.log(_self.project.property_albums)
        this.addName()
      }
    },
    // 鼠标经过楼盘图
    onmouseover (i, index) {
      console.log(this.$refs)
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
      console.log(index)
      this.project.propertyAlbum.splice(index, 1)
      this.project.property_albums.splice(index, 1)
      console.log(this.project.property_albums)
      this.addName()
    },
    // 添加户型图
    addhuxingimg (e) {
      var img = {
        data: '',
        name: ''
      }
      var file = e.target
      var reader = new FileReader()
      for (let s = 0; s < this.project.huxingImg.length; s++) {
        if (file.files[0].name === this.project.huxingImg[s].name) {
          this.message = '图片不能重复'
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
      }
      if (file.files[0].size > 60 * 1024) {
        console.log('超过60k')
        this.toast = true
        this.message = '不能超过60k'
        setTimeout(() => {
          this.toast = false
        }, 2000)
      } else {
        reader.readAsDataURL(file.files[0])
        const _self = this
        if (img.length > 9) {
          this.toast = true
          this.message = '不能超过10张'
          setTimeout(() => {
            this.toast = false
          }, 2000)
          return
        }
        reader.onload = function () {
          img.data = this.result
          img.name = file.files[0].name
          _self.project.huxing_imgs.push(file.files[0])
        }
        this.project.huxingImg.push(img)
        console.log(this.project.huxing_imgs)
        this.addName()
      }
    },
    // 鼠标经过户型图
    onmouseoverhuxing (i, index) {
      console.log(this.$refs)
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
      console.log(index)
      this.project.huxingImg.splice(index, 1)
      this.project.huxing_imgs.splice(index, 1)
      this.addName()
    },
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
        console.log('超过60k')
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
      console.log(this.project.zhuimg)
    },
    // 展示主图
    showzhutu () {
      console.log(this.project.homePage.length)
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
      width: 130px
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
  .projectArea
    a
      color: #ff5f03
      text-decoration: underline
      line-height: 48px
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
