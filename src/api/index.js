import axios from "axios";
import { baseUrl } from "../static"
// 登录判断
export const login = async (path, data) => {
    const res = await axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 获取商户列表
export const getMerchantList = async path => {
    const res = await axios.get(`${baseUrl}${path}`);
    return res;
}

// 获取顾客列表
export const getCustomerList = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 获取菜品列表
export const getDishList = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 更新菜品信息
export const updateDish = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 获取商铺列表
export const getStoreList = async path => {
    const res = axios.get(`${baseUrl}${path}`);
    return res;
}

// 新增商铺
export const addNewStore = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 新增食品
export const addNewDish = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 菜品状态
export const changeDishStatus = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 获取食品分类列表
export const getDishTypeList = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 更新菜品序号
export const updateDishSerial = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 获取租房信息表
export const getHouse = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}

// 请求模板
export const postApi = async (path, data) => {
    const res = axios.post(`${baseUrl}${path}`, data);
    return res;
}
