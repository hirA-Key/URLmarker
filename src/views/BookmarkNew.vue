<template>
  <div>
    <hm-page-title title="ブックマークの登録"></hm-page-title>
    <section class="section">
      <form class="container">
        <hm-text-field
          placeholder="タイトル"
          :error="titleError"
          @change="validateTitle"
          v-model="title"
        ></hm-text-field>
        <hm-text-field
          type="url"
          placeholder="URL"
          :error="urlError"
          @change="validateUrl"
          v-model="url"
        ></hm-text-field>
        <hm-text-field
          placeholder="コメント"
          :error="commentError"
          @change="validateComment"
          v-model="comment"
        ></hm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="addBookmark">
              登録する
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
// 使用するユーザーサービスとブックマークサービスをインポート
import { userService } from "@/services/UserService";
import { userBookmarkService } from "@/services/UserBookmarkService";

export default {
  name: "bookmark_new",
  components: { hmPageTitle, hmTextField },
  data() {
    return {
      title: null,
      url: null,
      comment: null,
      titleError: null,
      urlError: null,
      commentError: null
    };
  },
  methods: {
    // await を使用するので async をつける
    async addBookmark() {
      // 登録前にエラーがないか検証する
      this.validate();
      const error = this.titleError || this.urlError || this.commentError;
      // エラーがあるときはアラートを出して終了する
      if (error) {
        alert("入力値が不正です。");
        return;
      }
      // 現在のユーザーを取得する
      const user = await userService.getCurrentUser();
      // 既に同じ URL でブックマークしているかを取得する
      const userBookmark = await userBookmarkService.getBookmark(
        user,
        this.url
      );
      if (userBookmark != null) {
        // 登録されているのでエラー
        alert("すでに登録されているURLです。");
        return;
      }
      // 入力内容からオブジェクトを作成
      const form = {
        title: this.title,
        url: this.url,
        comment: this.comment
      };
      try {
        // 登録してトップページに遷移する
        await userBookmarkService.addBookmark(user, form);
        this.$router.push({ name: "home" });
      } catch (e) {
        alert(e.message);
      }
    },
    // すべての入力値を検証する
    validate() {
      this.validateTitle(this.title);
      this.validateUrl(this.url);
      this.validateComment(this.comment);
    },
    validateTitle(title) {
      this.titleError = null;
      if (!this.title) {
        this.titleError = "タイトルは必須です";
      } else if (title.length > 50) {
        this.titleError = "タイトルは50文字までです";
      }
    },
    validateUrl(url) {
      this.urlError = null;
      if (!url) {
        this.urlError = "URLは必須です";
      }
    },
    validateComment(comment) {
      this.commentError =
        comment && comment.length > 150 ? "コメントは150文字までです" : null;
    }
  }
};
</script>
