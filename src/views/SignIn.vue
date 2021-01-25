<template>
  <div>
    <hm-page-title title="サインイン"></hm-page-title>
    <section class="section">
      <form class="container">
        <!-- メールアドレスの入力欄としてテキストフィールドコンポーネントを使用 -->
        <hm-text-field
          type="email"
          placeholder="メールアドレス"
          icon="envelope"
          v-model="email"
        ></hm-text-field>
        <!-- パスワードの入力欄としてテキストフィールドコンポーネントを使用 -->
        <hm-text-field
          type="password"
          placeholder="パスワード"
          icon="lock"
          v-model="password"
        ></hm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="signIn">
              サインイン
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import hmPageTitle from "@/components/PageTitle";
// テキストフィールドコンポーネントをインポート
import hmTextField from "@/components/TextField";
import { authService } from "@/services/AuthService";

export default {
  name: "sign_in",
  // テキストフィールドコンポーネントの使用を宣言
  components: { hmPageTitle, hmTextField },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signIn() {
      authService
        .signIn(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
