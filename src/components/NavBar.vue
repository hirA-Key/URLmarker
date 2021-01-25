<template>
  <nav
    id="nav"
    class="navbar has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">hiramark</router-link>
        <!-- menuExpanded が true なら is-active クラスをつける -->
        <a
          role="button"
          id="navbar-burger"
          class="navbar-burger burger"
          :class="{ 'is-active': menuExpanded }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-links"
          @click="onMenuClicked"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <!-- menuExpanded が true なら is-active クラスをつける -->
      <div
        id="navbar-links"
        class="navbar-menu"
        :class="{ 'is-active': menuExpanded }"
      >
        <div class="navbar-end" v-if="user">
          <!-- bookmark メニューの追加 -->
          <router-link :to="{ name: 'bookmark_new' }" class="navbar-item">
            <hm-icon name="bookmark"></hm-icon>
            <span>ブックマークする</span>
          </router-link>
          <!-- bookmark メニューの追加:ここまで -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <hm-icon name="user"></hm-icon>
            </a>
            <div class="navbar-dropdown is-right">
              <a class="navbar-item" @click="signOut">
                <hm-icon name="sign-out-alt"></hm-icon>
                <span>サインアウト</span>
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-end" v-else>
          <div class="navbar-item">
            <router-link :to="{ name: 'sign_in' }" class="button is-text">
              <hm-icon name="sign-in-alt"></hm-icon>
              <span>サインイン</span>
            </router-link>
          </div>
          <div class="navbar-item">
            <router-link :to="{ name: 'sign_up' }" class="button is-text">
              <span class="icon">
                <hm-icon name="user-plus"></hm-icon>
              </span>
              <span>サインアップ</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import hmIcon from "./Icon";

export default {
  name: "hm-nav-bar",
  components: { hmIcon },
  props: {
    user: Object,
    // メニューが開いているかどうかのパラメータを親からもらう
    menuExpanded: Boolean
  },
  methods: {
    signOut() {
      //$emit これは子コンポーネントから親コンポーネントにイベントを送出するための機能です。
      //親 → 子へは props を使い、子 → 親へは $emit でイベントを送信し親側で値を変えてもらう。そして変更された値が子に反映されるという流れを作るのが基本
      this.$emit("sign-out-clicked");
    },
    // メニュークリック時の処理を追加する
    onMenuClicked() {
      // 現在の状態をパラメータとして送る
      this.$emit("menu-clicked", this.menuExpanded);
    }
  }
};
</script>
