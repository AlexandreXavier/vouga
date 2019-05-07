<template>
  <span @click="onEmojiClick">{{emoji.value}}</span>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onEmojiClick() {
      this.$emit("click", this.emoji);
    }
  }
};
</script>
