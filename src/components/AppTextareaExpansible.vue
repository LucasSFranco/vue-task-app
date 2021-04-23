<template>
  <div
    class="textarea-expansible"
    contenteditable="plaintext-only"
    tabindex="0"
    @input="handleInput"
    @keydown.exact.enter.prevent
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTextareaExpansible',
  emits: ['input'],
  watch: {
    value(newValue) {
      this.$el.textContent = newValue;
    },
  },
  methods: {
    handleInput({ target }) {
      const { textContent } = target;

      this.$emit('input', textContent.trim());
    },
    clear() {
      this.$el.innerHTML = '';
    },
    focus() {
      this.$el.focus();
    },
  },
});
</script>

<style scoped lang="sass">

  .textarea-expansible
    min-height: 44px
    max-height: 132px

    background: var(--TEXTAREA_BACKGROUND)
    border-radius: 8px
    color: var(--TEXT_PRIMARY)
    font-weight: 300
    line-height: 22px
    overflow: hidden scroll
    padding: 11px

    &::-webkit-scrollbar
      width: 12px
      height: 12px

    &::-webkit-scrollbar-thumb
      background-clip: padding-box
      background-color: rgba(24, 25, 28, 0.6)
      border: 4px solid transparent
      border-radius: 6px

    &:empty::before
      content: attr(placeholder)
      color: var(--TEXT_TERTIARY)
      pointer-events: none

</style>
