<template>
  <div class="stacked-list">
    <ul
      ref="scrollbox"
      @wheel="verifyPosition"
    >
      <slot />
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppStackedList',
  emits: ['load-more'],
  methods: {
    verifyPosition() {
      const { scrollbox } = this.$refs;
      const { scrollTop, clientHeight, scrollHeight } = scrollbox;

      const onEnd = (scrollTop + clientHeight === scrollHeight);

      if (onEnd) this.$emit('load-more');
    },
  },
});
</script>

<style scoped lang="sass">

  .stacked-list
    flex-grow: 1
    margin: 0 8px 8px
    position: relative

    ul
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0

      overflow: hidden scroll
      overflow-anchor: none
      padding: 8px 8px 8px 16px

      &::-webkit-scrollbar
        width: 8px

      &::-webkit-scrollbar-thumb
        background-clip: padding-box
        background-color: var(--SCROLLBAR_THUMB)
        border: 2px solid transparent
        border-radius: 4px

        visibility: hidden

      &:hover::-webkit-scrollbar-thumb
        visibility: visible

</style>
