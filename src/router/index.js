import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "login",
		component: resolve => require(["../views/login/index.vue"], resolve)
	},
	//	路由重定向
	{
		path: "*",
		redirect: "login"
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
