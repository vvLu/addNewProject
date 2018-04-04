import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Addnewpj = (resolve) => {
  import('components/addnewpj/addnewpj').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}
const ProjectList = (resolve) => {
  import('components/projectList/projectList').then((module) => {
    resolve(module)
  })
}
const AddStaff = (resolve) => {
  import('components/addstaff/addstaff').then((module) => {
    resolve(module)
  })
}
const Usercenter = (resolve) => {
  import('components/usercenter/usercenter').then((module) => {
    resolve(module)
  })
}
const ChangeProject = (resolve) => {
  import('components/changeproject/changeproject').then((module) => {
    resolve(module)
  })
}

const Changedongtai = (resolve) => {
  import('components/changedongtai/changedongtai').then((module) => {
    resolve(module)
  })
}

const Changeguishu = (resolve) => {
  import('components/changeguishu/changeguishu').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Addnewpj
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/ProjectList',
      component: ProjectList
    }, {
      path: '/addstaff',
      component: AddStaff
    }, {
      path: '/usercenter',
      component: Usercenter
    }, {
      path: '/changeproject',
      component: ChangeProject
    }, {
      path: '/changedongtai',
      component: Changedongtai
    }, {
      path: '/changeguishu',
      component: Changeguishu
    }
  ]
})
