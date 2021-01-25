import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import BookmarkNew from "../views/BookmarkNew";
import BookmarkDetail from "../views/BookmarkDetail";
import Error404 from "../views/Error404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign_up",
    name: "sign_up",
    component: SignUp,
  },
  {
    path: "/sign_in",
    name: "sign_in",
    component: SignIn,
  },
  {
    path: "/bookmarks/new",
    name: "bookmark_new",
    component: BookmarkNew,
  },
  // :id とすることで id という名前のパラメータを定義しています
  {
    path: "/bookmarks/:id",
    name: "bookmark_detail",
    component: BookmarkDetail,
  },

  // プログラムで直接エラーページを表示させたい場合のエラーページ定義
  {
    path: "/not_found",
    name: "error_not_found",
    component: Error404,
  },
  // Routerに登録されていない URL にアクセスされたときのエラーページ定義
  {
    path: "*",
    name: "error_unknown_path",
    component: Error404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
