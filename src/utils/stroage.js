// 定义三个方法分别是
/*
1：设置存值到本地存储
2：取本地值
3：移除值
*/
// 1:封装将值存入本地存储的方法
export const setItem = (key, value) => {
  if (typeof value == 'object') {
    // 将数组/对象 ==>  进行JSON.Stringfy 转成JSON字符串再进行存储到本地
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value) // 存入本地
}
// 2：本地取值的方法
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 3:移除本地存储值的方法
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
