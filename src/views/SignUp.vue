<template>
  <div>
    <hm-page-title title="サインアップ"></hm-page-title>
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
            <button class="button is-primary" @click.prevent="signUp">
              サインアップ
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import hmPageTitle from "@/components/PageTitle";
import hmTextField from "@/components/TextField";
import { authService } from "@/services/AuthService";
// サービスクラスをインポート
import { userService } from "@/services/UserService";

export default {
  name: "sign_up",
  components: { hmPageTitle, hmTextField },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signUp() {
      authService
        .signUp(this.email, this.password)
        // ページ遷移前にユーザー登録処理を実行する
        .then(credential => {
          return userService.createUser(credential.user);
        })
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
