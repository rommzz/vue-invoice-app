import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/invoice/:id",
    name: "InvoiceDetail",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "invoiceDetail" */ "../views/InvoiceDetail.vue"
      ),
  },
  {
    path: "/user",
    name: "UserList",
    props: true,
    component: () => import("../views/User.vue"),
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
