<template>
  <div id="menus">
  	  <mu-paper class="demo-menu">
  	  	<mu-appbar class="title" title="房先生项目上新平台">
		</mu-appbar>
	      <mu-menu>
	        <mu-menu-item title="项目列表" />
	        <mu-menu-item title="新增页面"/>
	        <mu-menu-item title="修改页面"/>
	        <mu-menu-item title="新增员工"/>
	      </mu-menu>
	    </mu-paper>
 </div>	
</template>

<script>
export default {
  name: 'menus',
  data () {
    return {
      leftshow: true
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#menus
  display: flex
  .mu-paper
  	background: #50504E
  .right
  	width: 100%
</style>
