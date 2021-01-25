<template>
  <div id="app">
    <!-- sign-out-clicked イベントに signOut メソッドを指定 -->
    <hm-nav-bar
      :user="user"
      :menu-expanded="menuExpanded"
      @sign-out-clicked="signOut"
      @menu-clicked="switchMenuState"
    >
    </hm-nav-bar>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { authService } from "@/services/AuthService";
import hmNavBar from "@/components/NavBar";
import { cacheService } from "@/services/CacheService";

export default {
  name: "app",
  components: { hmNavBar },
  data() {
    return {
      user: null,
      // メニューが開いているかどうかのパラメータ
      menuExpanded: false
    };
  },
  created() {
    cacheService.removeItem("users"); // ユーザーのキャッシュを削除
    authService.onStateChanged(user => {
      this.user = user;
    });
    // ページを遷移する前に実行することを登録する
    this.$router.beforeEach((to, from, next) => {
      this.menuExpanded = false;
      next();
    });
  },
  methods: {
    //サインアウト関数
    async signOut() {
      await authService.signOut();
      //サインアウト後にトップページに遷移
      this.$router.push({ name: "home" });
    },
    // menu-clicked イベントに指定するメソッドを追加
    switchMenuState(currentState) {
      // メニューの表示状態を切り替える
      this.menuExpanded = !currentState;
    }
  }
};
</script>
