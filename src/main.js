// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 使用museui组件
import MuseUI from 'muse-ui'
import VueLazyload from 'vue-lazyload'
import store from './store/store'
import 'muse-ui/dist/muse-ui.css'
import 'common/less/base.less'
import 'common/stylus/index.styl'
Vue.use(MuseUI)

Vue.config.productionTip = false

// 替换图
Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg')
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.document.cookie.indexOf('userName=') !== -1) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
