<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppCard',
});
</script>

<style scoped lang="sass">

  .card
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

    display: flex
    flex-direction: column

    background: var(--BACKGROUND_PRIMARY)
    border-radius: 8px
    margin: 16px

    @media only screen and (min-width: 640px)
      &
        top: initial
        left: initial
        right: initial
        bottom: initial

        height: 80%
        width: 100%

        max-width: 608px
        max-height: 608px

</style>
