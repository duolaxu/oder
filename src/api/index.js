import axios from "axios";
import { baseUrl } from "../static"
// 登录判断
export const login = async (path, data) => {
    const res = await axios.post(`${baseUrl}${path}`, data);
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
