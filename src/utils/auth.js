// 导入存入本地的方法
// import { setItem, getItem, removeItem } from '@/utils/stroage'
import stroage from '@/utils/stroage';
// 定义一个常量表示本地存储的key(user的token)
const TOKEN_KEY = 'TOKEN_USER';
// 定义一个常量表示本地存储的key(城市名)
const CITY_NAME = 'CITY_NAME';
// 存token到本地的方法
export const setToken = (token) => stroage.set(TOKEN_KEY, token);
// 取token的方法
export const getToken = () => stroage.get(TOKEN_KEY);
// 移除token方法
export const removeToken = () => stroage.remove(TOKEN_KEY);

// 存城市名到本地的方法
export const setCityName = (name) => stroage.set(CITY_NAME, name);
// 取城市名的方法
export const getCityName = () => stroage.get(CITY_NAME);
// 移除城市名方法
export const removeCityName = () => stroage.remove(CITY_NAME);
