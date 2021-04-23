<template>
  <div class="stacked-list__item">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppStackedListItem',
});
</script>

<style scoped lang="sass">

  .stacked-list__item
    div
      display: flex
      align-items: center

      padding: 8px 0

    & + &
      border-top: 1px solid rgba(255, 255, 255, 0.06)

    &:hover
      border-radius: 8px
      background: rgba(79, 84, 92, 0.16)
      border-color: transparent

    &:hover + &
      border-color: transparent

</style>
