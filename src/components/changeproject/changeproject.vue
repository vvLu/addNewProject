<template>
  <div id="changeproject">
    <div class="panal">
    	<p class="title"><span class="title2">修改基础信息</span></p>
      <div class="content">
        <div class="left">
          <Leftadd 
          @addData="addData" 
          :ids="isId" 
          :projectid="projectId" 
          :projects="projects"
          @startxmyj="startxm"
          @endxmyj="endxm"
          @startyj="startyj"
          @endyj="endyj"
          @addjybz="addjybz"
          @addmaidian="addmaidian"
          @addzc="addzc"
          @addhuxing="addhuxing"
          @addzj="addzj"
          @payment="payment"
          @adddt="adddt"
          @zhuangxiuchange="zhuangxiuchange"
          @addqyjieshao='addqyjieshao'
          @addpjieshao="addpjieshao"
          @addptss="addptss"
          @addtujin="addtujin"
          @addbaohu="addbaohu"
          @addprotectDate="addprotectDate"
          @linechangename="linechangename"
          @linechangephone="linechangephone"
          @addloupanimg="addloupanimg"
          />
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
import Leftadd from 'components/changeproject/details.vue'
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
    if (this.$route.query.id) {
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
          this.projects = Object.assign({}, {}, res.data.data)
        }
      })
    },
    // 楼盘修改上传
    addloupanimg (val) {
      this.detailList.propertyAlbum2 = val
    },
    // 地址
    addData (val) {
      this.detailList.address = val
    },
    // 佣金
    startyj (val) {
      this.detailList.startCommission = val
    },
    // 佣金
    endyj (val) {
      this.detailList.endCommission = val
    },
    // 佣金项目
    startxm (val) {
      this.detailList.startBrokerage = val
    },
    // 佣金项目
    endxm (val) {
      this.detailList.endBrokerage = val
    },
    // 结佣标准
    addjybz (val) {
      this.detailList.commissionJunction = val
    },
    // 项目买点
    addmaidian (val) {
      this.detailList.sellingPoint = val
    },
    // 政策法规
    addzc (val) {
      this.detailList.policy = val
    },
    // 户型
    addhuxing (val) {
      this.detailList.huxing = val
    },
    // 总价
    addzj (val) {
      this.detailList.totalPrice = val
    },
    // 首付比例
    payment (val) {
      this.detailList.downPayment = val
    },
    // 交房时间
    adddt (val) {
      this.detailList.deliveryTime = val
    },
    // 交房时间
    zhuangxiuchange (val) {
      this.detailList.renovation = val
    },
    // 区域介绍
    addqyjieshao (val) {
      this.detailList.regionalIntroduction = val
    },
    // 配套设施
    addptss (val) {
      this.detailList.supportingFacilities = val
    },
    // 项目介绍
    addpjieshao (val) {
      this.detailList.projectIntroduction = val
    },
    // 报备途径
    addtujin (val) {
      this.detailList.way = val
    },
    // 客户保护期
    addbaohu (val) {
      this.detailList.customerprotectDate = val
    },
    // 报备有效时间
    addprotectDate (val) {
      this.detailList.protectDate = val
    },
    // 报备姓名标准
    linechangename (val) {
      this.detailList.nameStandard = val
    },
    // 报备姓名标准
    linechangephone (val) {
      this.detailList.telStandard = val
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
        margin-left: 30px
        width: 380px
</style>
