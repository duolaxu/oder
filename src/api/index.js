import axios from "axios";
import { baseUrl } from "../static"
// 登录判断
export const login = async (path, data) => {
    const res = await axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取商户列表
export const getMerchantList = async path => {
    const res = await axios.get(`${baseUrl}/order${path}`);
    return res;
}

// 获取顾客列表
export const getCustomerList = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取物品列表
export const getDishList = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 更新物品信息
export const updateDish = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取商铺列表
export const getStoreList = async path => {
    const res = axios.get(`${baseUrl}/order${path}`);
    return res;
}

// 新增商铺
export const addNewStore = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 新增物品
export const addNewDish = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 物品状态
export const changeDishStatus = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取物品分类列表
export const getDishTypeList = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 更新物品序号
export const updateDishSerial = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取条形码信息
export const getShapeCodeInfos = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

//条形码查询接口
export const getShapeCodeApi = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

//更新商品图片
export const updateDishImg = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取全部跑腿列表
export const getErrandList = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}

// 获取全部订单列表
export const getOrderList = async (path, data) => {
    const res = axios.post(`${baseUrl}/order${path}`, data);
    return res;
}
