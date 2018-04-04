export function getCookie (callback) {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; ')
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=') // 再次切割
      callback(arr2)
      // 判断查找相对应的值
      if (arr2[0] === 'userName') {
      } else if (arr2[0] === 'userPwd') {
      }
    }
  } else {
    callback()
  }
}
