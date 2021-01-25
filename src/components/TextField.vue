<template>
  <div class="field">
    <!-- ラベルの文字列が指定されたときだけ表示 -->
    <label class="label" v-if="label">{{ label }}</label>
    <!-- icon が指定されたときだけ必要なクラスを設定 -->
    <p class="control" :class="{ 'has-icons-left': icon }">
      <!-- エラーがあれば is-danger を付与する -->
      <!-- 入力に変更があったときに onChanged メソッドを呼び出す -->
      <input
        class="input"
        :class="{ 'is-danger': error }"
        :type="type"
        :placeholder="placeholder"
        @change="onChanged"
        v-model="innerValue"
      />
      <!-- アイコンが指定されたときだけ表示します -->
      <hm-icon v-if="icon" class="is-small is-left" :name="icon"></hm-icon>
    </p>
    <!-- エラーがあるときはエラーメッセージを表示する -->
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import hmIcon from "./Icon";

export default {
  name: "hm-text-field",
  components: { hmIcon },
  props: {
    type: {
      type: String,
      label: String,
      default: "text",
      validator(val) {
        return ["text", "email", "password", "search", "url"].includes(val);
      }
    },
    placeholder: String,
    value: String,
    icon: String,
    error: String
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.value !== val) {
          this.$emit("input", val);
        }
      }
    }
  },
  methods: {
    onChanged(e) {
      // change イベントを発火し、パラメータとして入力値を送信する
      this.$emit("change", e.target.value);
    }
  }
};
</script>
