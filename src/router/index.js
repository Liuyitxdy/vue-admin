import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "首页",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

  // 数据管理
  {
    path: "/mange",
    component: Layout,
    redirect: "/mange/table",
    name: "mange",
    meta: { title: "数据管理", icon: "el-icon-document" },
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("@/views/mange/User"),
        meta: { title: "用户列表" },
      },
      {
        path: "shop",
        name: "shop",
        component: () => import("@/views/mange/Bus"),
        meta: { title: "商家列表" },
      },
      {
        path: "food",
        name: "food",
        component: () => import("@/views/mange/Food"),
        meta: { title: "食品列表" },
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/mange/Orders"),
        meta: { title: "订单列表" },
      },
      {
        path: "admin",
        name: "admin",
        component: () => import("@/views/mange/Admin"),
        meta: { title: "管理员" },
      },
    ],
  },

  // 添加数据
  {
    path: "/addData",
    component: Layout,
    redirect: "/addData/index",
    name: "addData",
    meta: { title: "添加数据", icon: "el-icon-plus" },
    children: [
      {
        path: "index",
        name: "add",
        component: () => import("@/views/addData/addShops"),
        meta: { title: "添加商铺" },
      },
      {
        path: "addshop",
        name: "addshop",
        component: () => import("@/views/addData/addShop"),
        meta: { title: "添加商品" },
      },
    ],
  },
  // 用户分布
  {
    path: "/charts",
    component: Layout,
    redirect: "/chart/index",
    name: "Chart",
    meta: {
      title: "图表",
      icon: "el-icon-pie-chart",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/chart/index"),
        name: "userFb",
        meta: { title: "用户分布" },
      },
    ],
  },
  // 用户编辑
  {
    path: "/edit",
    component: Layout,
    redirect: "/edit/index",
    name: "Edit",
    meta: {
      title: "编辑",
      icon: "el-icon-edit-outline",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/edit/index"),
        name: "onlineEdit",
        meta: { title: "用户编辑" },
      },
    ],
  },
  // 设置
  {
    path: "/setting",
    component: Layout,
    redirect: "/setting/index",
    name: "Setting",
    meta: {
      title: "设置",
      icon: "el-icon-setting",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/setting/index"),
        name: "setting",
        meta: { title: "管理员设置" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
