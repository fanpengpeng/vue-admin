import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index")
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/Main/index")
  }
];

const router = new VueRouter({
  routes
});

export default router;
