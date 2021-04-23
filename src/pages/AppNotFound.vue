<template>
  <div class="not-found">
    <img :src="require('@/assets/not-found.svg')">
    <AppTitle>404</AppTitle>
    <AppText>Ops! Page not found, it looks you're lost.</AppText>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import AppTitle from '@/components/AppTitle.vue';
import AppText from '@/components/AppText.vue';

export default defineComponent({
  name: 'AppNotFound',
  components: {
    AppTitle,
    AppText,
  },
});
</script>

<style lang="sass">

  .not-found
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    text-align: center

    padding: 16px

    .title
      font-size: 40px
      margin-top: 16px

    img
      min-width: 200px
      width: 50%
      max-width: 600px

      filter: grayscale(1)

</style>
