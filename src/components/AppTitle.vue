<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTitle',
});
</script>

<style scoped lang="sass">

  .title
    color: var(--HEADER_PRIMARY)
    font-size: 24px
    font-weight: 600
    text-align: center
    text-transform: uppercase
    margin-bottom: 4px

</style>
