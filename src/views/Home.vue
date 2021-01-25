<template>
  <div class="container">
    <div class="columns is-multiline bookmarks">
      <div class="column is-4" v-for="b in bookmarks" :key="b.id">
        <hm-bookmark-card
          :id="b.id"
          :url="b.url"
          :title="b.title"
          :userCount="b.userCount"
          :createdAt="b.createdAt"
        ></hm-bookmark-card>
      </div>
    </div>
    <!-- もっと見るボタン -->
    <div class="columns">
      <div class="column is-12">
        <button
          class="button is-rounded is-fullwidth"
          v-if="hasNext"
          @click="loadNextBookmarks"
        >
          もっと見る
        </button>
      </div>
    </div>
    <!-- もっと見るボタン:ここまで -->
  </div>
</template>

<script>
  // 作成したブックマークカードをインポート
  import hmBookmarkCard from "@/components/BookmarkCard";
  import { authService } from "@/services/AuthService";
  // 作成したブックマークサービスをインポート
  import { bookmarkService } from "@/services/BookmarkService";

  export default {
    name: "home",
    // ブックマークカードの使用を宣言
    components: { hmBookmarkCard },
    data() {
      return {
        // ブックマークデータの受け皿を用意
        bookmarks: [],
        user: null
      };
    },
    async created() {
      authService.onStateChanged(user => {
        this.user = user;
      });
      // ブックマークを取得し設定
      const bookmarks = await bookmarkService.getBookmarks(30);
      this.bookmarks = bookmarks;
      // 初期データを30件取得できない場合、次のページはないと判断
      this.hasNext = this.bookmarks.length === 30;
    },
    methods: {
      // データ追加処理
      async loadNextBookmarks() {
        // 最後のブックマークの作成日以降のデータを取得
        const nextBookmarks = await bookmarkService.getBookmarks(
          30,
          this.bookmarks[this.bookmarks.length - 1].createdAt
        );
        // 30件取得できない場合、次のページはないと判断
        this.hasNext = nextBookmarks.length === 30;
        // データに追加
        this.bookmarks.push(...nextBookmarks);
      }
    }
  };
</script>

<style scoped>
  /* navbar にくっつかないようにスペースをあける */
  .bookmarks {
    margin-top: 1rem;
  }
</style>
