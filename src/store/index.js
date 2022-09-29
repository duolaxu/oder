import { createStore } from 'vuex';
import { getCookie } from "../utils/cookie"

export default createStore({
    state: {
        dishImg: "",
        storeHeadImg: "",
        storeBusinessImg: "",
        cateringLicense: "",
        storeId: getCookie("storeId"),
        rolePermission: getCookie("permission"),
        headImg:getCookie("headImg"),
    },
    mutations: {
        // 定义mutations，用于修改状态(同步)
        updateDishImg(state, imgUrl) {
            state.dishImg = imgUrl;
        },
        updateStoreHeadImg(state, imgUrl) {
            state.storeHeadImg = imgUrl;
        },
        updateStoreBusinessImg(state, imgUrl) {
            state.storeBusinessImg = imgUrl;
        },
        updateCateringLicense(state, imgUrl) {
            state.cateringLicense = imgUrl;
        },
        updateStoreId(state, storeId) {
            state.storeId = storeId;
        },
        updateRolePermission(state, rolePermission) {
            state.rolePermission = rolePermission;
        },
        updateHeadImg(state,headImg){
            state.headImg = headImg;
        },
    },
    actions: {
        // 定义actions，用于修改状态(异步)
        // 2秒后更新状态
        updateInfo(context, payload) {
            setTimeout(() => {
                context.commit('updateInfo', payload)
            }, 2000)
        }
    },
    getters: {
        // 定义一个getters
        formatInfo(state) {
            return state.info + ' Tom'
        }
    },
    modules: {
    }
})


