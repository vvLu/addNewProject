import $api from './index'

export function getdetail () {
  const url = `http://192.168.0.103:8080/pro/getProjectDetail?id=12`
  return $api.get(url)
}
// 登录
export function login (phone, psw) {
  const url = `/projectnewest/login`
  const formdata = new FormData()
  formdata.append('phone', phone)
  formdata.append('psw', psw)
  return $api.post(url, formdata)
}

// 修改密码
export function changelogin (phone, oldpsw, newpsw) {
  const url = `/projectnewest/changepsw`
  const formdata = new FormData()
  formdata.append('phone', phone)
  formdata.append('oldpsw', oldpsw)
  formdata.append('newpsw', newpsw)
  return $api.post(url, formdata)
}

// 添加员工（项目对接人）
export function addStaff (name, phone, img, workingLife, goodAt, motto, label, selfEvaluation) {
  const url = `/projectnewest/addemployee`
  const formdata = new FormData()
  formdata.append('name', name)
  formdata.append('phone', phone)
  formdata.append('img', img)
  formdata.append('workingLife', workingLife)
  formdata.append('goodAt', goodAt)
  formdata.append('motto', motto)
  formdata.append('label', label)
  formdata.append('selfEvaluation', selfEvaluation)
  return $api.post(url, formdata)
}

// 获取项目列表
export function getlist (projectName, start, length) {
  const url = `/projectnewest/getprojectlist?projectName=${projectName}&start=${start}&length=${length}`
  return $api.get(url)
}

// 修改上下线
export function changeline (id, status) {
  const url = `/projectnewest/online`
  const data = {
    'id': id,
    'status': status
  }
  return $api.post(url, data)
}

// 获取项目对接人信息
export function getduijiepeople () {
  const url = `/projectnewest/getemployee`
  return $api.get(url)
}

// 获取省份
export function getprovince () {
  const url = `/projectnewest/getprovince`
  return $api.get(url)
}

// 获取市
export function getcity (proCode) {
  const url = `/projectnewest/getcity?proCode=${proCode}`
  return $api.get(url)
}

// 获取区
export function getdistrict (cityCode) {
  const url = `/projectnewest/getdistrict?cityCode=${cityCode}`
  return $api.get(url)
}

// 上传项目
export function postproject (data) {
  const url = `/projectnewest/addproject`
  return $api.post(url, data)
}

// 获取项目详情
export function getplist (id) {
  const url = `/projectnewest/getprojectcontainscode?id=${id}`
  return $api.get(url, id)
}

// 修改项目详情
export function changeList (data) {
  const url = `/projectnewest/updateproject`
  return $api.post(url, data)
}

// 修改基础信息
export function changeLists (data) {
  const url = `/projectnewest/updateprojectbasic`
  return $api.post(url, data)
}

// 修改动态信息
export function changedtinfo (data) {
  const url = `/projectnewest/updateprojectdynamic`
  return $api.post(url, data)
}

// 对接人列表
export function allpeople () {
  const url = `/projectnewest/getdockingpersons`
  return $api.get(url)
}

// 通过项目id获取对接人
export function duijie (id) {
  const url = `/projectnewest/getdockingerbyproid?id=${id}`
  return $api.get(url)
}

// 修改项目归属
export function changeguishu (data) {
  const url = `/projectnewest/updateprojdockingperson`
  return $api.post(url, data)
}
