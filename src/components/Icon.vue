<template>
  <span class="icon">
    <!-- リネームした classes を使う -->
    <i :class="classes"></i>
  </span>
</template>

<script>
  export default {
    name: "hm-icon",
    props: {
      name: String,
      // mode プロパティの追加
      mode: {
        type: String,
        validator(val) {
          //塗り潰しはfas白抜きはfar
          return ["fas", "far", "fab"].includes(val);
        },
        // デフォルト値の指定
        default: "fas"
      }
    },
    computed: {
      // class に指定する配列自体を返すようにしたため classes にリネーム
      classes() {
        return [this.mode, `fa-${this.name}`];
      }
    }
  };
</script>
