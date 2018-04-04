<template>
  <div id="projectList">
  	<div class="panal">
    	<p class="title"><span class="title2">项目列表</span></p>
      <div class="content">
      	<div class="action">
      		<div>
      			<mu-raised-button v-if="$store.state.userTag === '2'" label="增加新员工" class="demo-raised-button" primary @click="addpeople"/>
      			<mu-raised-button label="增加新项目" class="demo-raised-button" primary @click="addnew"/>
      		</div>
      		<div>
      			<mu-auto-complete hintText="请输入项目名称" v-model="projectName" />
            <mu-icon-button  @click="search" icon="search"/>
      		</div>
      	</div>
      	<div class="tablecontent">
      		<mu-table  :fixedHeader="fixedHeader" :showCheckbox="false" :height="height">
			    <mu-thead slot="header">
			      <mu-tr>
			      	<mu-th tooltip="序号" class="idwidth">id</mu-th>
			        <mu-th tooltip="项目名称" class="prwidth">项目名称</mu-th>
			        <mu-th tooltip="操作" class="cwidth">操作</mu-th>
			        <mu-th tooltip="上下线情况" class="czwidth">上下线状态与操作(!慎点!)</mu-th>
			      </mu-tr>
			    </mu-thead>
			    <mu-tbody>
			      <mu-tr v-for="(item,index) in tableData"  :key="item.id" :status="item.status" >
			        <mu-td class="idwidth">{{item.id}}</mu-td>
			        <mu-td class="prwidth">{{item.projectName}}</mu-td>
			        <mu-td class="cwidth">
                <div>
                  <mu-flat-button label="修改基础信息" class="demo-flat-button"  :disabled="item.status === '0'"  primary @click="change(item.id)"/>
                  <mu-flat-button label="修改项目动态" class="demo-flat-button"  :disabled="item.status === '0'"  primary @click="changedontai(item.id)"/>
                  <mu-flat-button label="修改项目归属" class="demo-flat-button" v-if="$store.state.userTag === '2'"   :disabled="item.status === '0'"  primary @click="changeguishu(item.id, item.projectName)"/>
                </div>
              </mu-td>
              <mu-td class="czwidth">
                <div>
                  <mu-radio v-for="(i,indexr) in radios" :label="i.label" :key="indexr" :name="item.name" :nativeValue="i.value" v-model="item.status"  class="demo-radio" @change="linechange($event, item.id, i.value, index, item.projectName)"/>
                </div>
	  				  </mu-td>
			      </mu-tr>
			    </mu-tbody>
			</mu-table>
		  <div class="footpage">
		  	<div class="pagenum">共 {{totals}}个</div>
		  	<mu-pagination :total="total" :current="current" @pageChange="handleClick"></mu-pagination><!-- 默认每页10条 -->
		  </div>
      	</div>
      </div>
    </div>
    <mu-toast v-if="toast" :message="message"/>
    <mu-dialog :open="dialog" title="提示">
      <span>{{info}}</span>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="surebtn" label="确定"/>
    </mu-dialog>
  </div>	
</template>

<script>
import { getlist, changeline } from 'api/getdetail'
export default {
  name: 'menus',
  data () {
    return {
      dataSource: [],
      tableData: [],
      fixedHeader: true,
      height: '500',
      total: 50,
      current: 0,
      radios: [{
        label: '上线',
        value: '1'
      }, {
        label: '下线',
        value: '0'
      }],
      totals: 0,
      projectName: '',
      toast: false,
      message: '',
      prjectId: '',
      dialog: false,
      info: '',
      prohectId: '',
      projectStatus: '',
      num: 0
    }
  },
  created () {
    this._getlist('', this.current, 10)
  },
  methods: {
    // 修改项目
    change (id) {
      console.log(id)
      this.$router.push({path: '/changeproject', query: {id: id}})
    },
    // 修改动态
    changedontai (id) {
      this.$router.push({path: '/changedongtai', query: {id: id}})
    },
    // 修改项目归属
    changeguishu (id, item) {
      this.$router.push({path: '/changeguishu', query: {id: id, item: item}})
    },
    search () {
      this._getlist(this.projectName, 0, 10)
    },
    _getlist (projectName, start, length) {
      getlist(projectName, start, length).then((res) => {
        this.tableData = res.data.data
        this.totals = res.data.recordsTotal
        this.total = res.data.recordsTotal
      })
    },
    handleClick (newIndex) {
      this._getlist(this.projectName, newIndex - 1, 10)
    },
    linechange (e, i, value, index, name) {
      this.dialog = true
      this.num = index
      if (value === '0') {
        this.info = '确定要将 ' + name + ' 下线吗？'
      } else {
        this.info = '确定要将 ' + name + ' 上线吗？'
      }
      console.log(i, value, name)
      this.prohectId = i
      this.projectStatus = value
    },
    surebtn () {
      changeline(this.prohectId, this.projectStatus).then((res) => {
        if (res.data.code === 0) {
          this.dialog = false
          if (this.projectStatus === '0') {
            this.message = '下线成功'
          } else if (this.projectStatus === '1') {
            this.message = '上线成功'
          }
          this.toast = true
          setTimeout(() => {
            this.toast = false
          }, 2000)
        }
      })
    },
    close () {
      // 0 下线 1上线
      this.dialog = false
      if (this.tableData[this.num].status === '0') {
        this.tableData[this.num].status = '1'
      } else if (this.tableData[this.num].status === '1') {
        this.tableData[this.num].status = '0'
      }
      console.log(this.tableData[this.num].status)
    },
    // 添加新项目
    addnew () {
      this.$router.push('/')
    },
    // 添加新员工
    addpeople () {
      this.$router.push('/addstaff')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#projectList
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
      .action
      	display: flex
      	justify-content: space-between
      	button
      	  margin-right:20px
    .tablecontent
      .mu-td, .mu-th
        padding: 0
        margin: 0
        line-height: 48px
      .idwidth
        width: 100px
      .czwidth
        text-align: center
      .cwidth
        text-align: center
      .footpage
      	display: flex
      	text-align: center
      	justify-content: center
       .pagenum
         line-height: 32px 
</style>
