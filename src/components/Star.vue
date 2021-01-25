<template>
  <!-- tooltip 表示のために tooltip クラスを追加 -->
  <!-- ユーザー名は動的に取得するため data-tooltip 属性にバインド -->
  <hm-icon
    name="star"
    class="is-small has-text-info tooltip"
    :data-tooltip="userName"
    @mouseover.native.once="loadUserName"
  ></hm-icon>
</template>

<script>
  import hmIcon from "./Icon";
  import { userService } from "@/services/UserService";

  export default {
    name: "hm-star",
    components: { hmIcon },
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        userName: null
      };
    },
    methods: {
      async loadUserName() {
        if (this.userName) {
          return;
        }
        const user = await userService.getUser(this.userId);
        // ユーザーが取得できなかった場合「不明なユーザー」とする（理由は後述）
        this.userName = user ? user.name : "不明なユーザー";
      }
    }
  };
</script>
