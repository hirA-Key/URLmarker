<template>
  <div v-if="bookmark">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <a :href="bookmark.url">{{ bookmark.title }}</a>
          </h1>
          <h2 class="subtitle">{{ bookmark.userCount }} USERS</h2>
        </div>
      </div>
    </section>
    <section class="section content comments">
      <h2>コメント</h2>
      <hm-user-comment
        v-for="c in comments"
        :key="c.id"
        :avatar-url="c.user.avatarUrl || c.user.gravatarUrl"
        :user-name="c.user.name"
        :comment="c.comment"
        :commentId="c.id"
        :stars="c.stars"
        :show-add-button="isSignedIn"
        @add-star="addStar"
      ></hm-user-comment>
    </section>
  </div>
</template>

<script>
  import hmUserComment from "@/components/UserComment";
  // サインインしているかどうかを判別するため authService をインポート
  import { authService } from "@/services/AuthService";
  import { bookmarkService } from "@/services/BookmarkService";
  // 現在サインインしているユーザーのIDを使用するため userService をインポート
  import { userService } from "@/services/UserService";

  export default {
    name: "bookmark_detail",
    components: { hmUserComment },
    data() {
      return {
        bookmark: null,
        comments: null,
        // サインインしているかどうかをプロパティに追加
        isSignedIn: false
      };
    },
    async created() {
      // サインインしているかどうかを作成時に判別
      authService.onStateChanged(u => {
        this.isSignedIn = u != null;
      });
      // ルーティングで定義するパラメータは this.$route.params から取得
      const bookmarkId = this.$route.params.id;
      this.bookmark = await bookmarkService.getBookmark(bookmarkId);
      if (this.bookmark == null) {
        // ブックマークデータが取得できない場合は 404 に遷移
        this.$router.push({ name: "error_not_found" });
      }
      this.comments = await bookmarkService.getBookmarkComments(bookmarkId);
    },
    methods: {
      // スター登録処理
      async addStar(commentId) {
        // サインインしていないときはスター登録させない
        if (this.isSignedIn) {
          // 登録処理に必要なデータの取得
          const user = await userService.getCurrentUser();
          const bookmarkId = this.$route.params.id;
          // 登録処理の呼び出し
          await bookmarkService.addStar(bookmarkId, commentId, user.id);
          // 登録後の更新されたデータを取得
          this.comments = await bookmarkService.getBookmarkComments(bookmarkId);
        }
      }
    }
  };
</script>
