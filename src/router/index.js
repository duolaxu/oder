import { createRouter, createWebHistory } from "vue-router";
import { getCookie } from "../utils/cookie"

import Login from "@/page/login/index";
import Manage from "@/page/manage/index";
import Home from "@/page/home/index";
import ShopList from "@/page/shopList";
import CustomerList from "@/page/customerList/index";
import FoodList from "@/page/foodList/index";
import MerchantList from "@/page/merchantList/index";
import IncomeChart from "@/page/incomeChart/index"

const routes = [
	{
		path: '/login',
		name: "Login",
		component: Login
	},
	{
		path: '/home',
		component: Manage,
		name: 'Manage',
		children: [{
			path: '/home',
			component: Home,
			name: "Home",
			meta: ["首页"],
		}, {
			path: '/merchantList',
			component: MerchantList,
			name: "MerchantList",
			meta: ['商户列表'],
		}, {
			path: '/shopList',
			component: ShopList,
			name: "ShopList",
			meta: ['商铺列表'],
		}, {
			path: '/customerList',
			component: CustomerList,
			name: "CustomerList",
			meta: ['顾客列表'],
		}, {
			path: '/foodList',
			component: FoodList,
			name: "FoodList",
			meta: ['食品列表'],
		}, {
			path: '/incomeChart',
			component: IncomeChart,
			name: "IncomeChart",
			meta: ['收入流水'],
		}]
	},
	{
		path: "/:pathMatch(.*)*", // 路由重定向
		redirect: "/home",
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes: routes
});

router.beforeEach(async (to, from) => {
	const isLogin = getCookie("username") ? true : false;
	console.log(from.path);
	if (isLogin) { // 登录后不允许再次进入登录界面
		if (to.name == 'Login') {
			return { name: "Home" };
		}
	} else {
		if (to.name != "Login")
			return { name: "Login" };
	}
})

export default router;