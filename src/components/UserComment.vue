<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="avatarUrl" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong>{{ userName }}</strong>
        <div>{{ comment }}</div>
      </div>
      <!-- 追加 -->
      <!-- コメント本文がないときはスターをつける必要がないため非表示にする -->
      <nav class="level" v-if="comment">
        <div class="level-left">
          <!-- スター登録ボタン -->
          <!-- サインインしていない場合スターの登録をさせないので、表示・非表示を切り替えられるようにする -->
          <button
            class="level-item button is-outlined is-info"
            v-if="showAddButton"
            @click="addStar"
          >
            <!-- 先ほど追加した mode プロパティを使用します -->
            <hm-icon class="is-small" mode="far" name="star"></hm-icon>
          </button>
          <!-- スターの数だけ表示する -->
          <!-- stars 配列の中身は一意なユーザーIDなので key に渡すのは自分自身で問題ない -->
          <hm-star v-for="s in stars" :key="s" :userId="s"></hm-star>
        </div>
      </nav>
      <!-- 追加:ここまで -->
    </div>
  </article>
</template>

<script>
  import hmIcon from "./Icon";
  import hmStar from "./Star";

  export default {
    name: "hm-user-comment",
    components: { hmIcon,hmStar },
    props: {
      avatarUrl: String,
      userName: String,
      comment: String,
      // どのコメントに対してのスターなのか呼び出し側が判断するために $emit 時に ID を渡す必要があるので追加
      commentId: String,
      // 表示するスターの配列
      stars: Array,
      // スター登録ボタンの表示・非表示を呼び出し側から切り替えられるように
      showAddButton: Boolean
    },
    methods: {
      // スター登録ボタン呼び出し時の処理
      // どのコメントに対してのスターなのか呼び出し側が判断するために $emit 時に ID を渡す
      addStar() {
        this.$emit("add-star", this.commentId);
      }
    }
  };
</script>
