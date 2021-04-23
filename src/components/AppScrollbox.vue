<template>
  <div class="scrollbox">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppScrollbox',
});
</script>

<style scoped lang="sass">

  .scrollbox
    flex-grow: 1
    margin: 0 8px 32px
    position: relative

    div
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0

      overflow: hidden scroll
      padding: 0 8px 0 16px

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
