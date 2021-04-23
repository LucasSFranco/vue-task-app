<template>
  <div class="configs__header">
    <div class="toggler-wrapper configs">
      <AppToggler
        secondary
        class="selected"
        @click="$router.push('/')"
      >
        <i class="fas fa-cog" />
      </AppToggler>
    </div>
    <AppTitle>
      {{ $t('configs.header.title') }}
    </AppTitle>
    <AppSubtitle>
      {{ $t('configs.header.subtitle') }}
    </AppSubtitle>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import AppSubtitle from '@/components/AppSubtitle.vue';
import AppTitle from '@/components/AppTitle.vue';
import AppToggler from '@/components/AppToggler.vue';

export default defineComponent({
  name: 'ConfigsHeader',
  components: {
    AppSubtitle,
    AppTitle,
    AppToggler,
  },
});
</script>

<style scoped lang="sass">

  .configs__header
    position: relative

    border-bottom: 1px solid var(--BACKGROUND_MODIFIER_ACCENT)
    margin: 32px 24px 24px
    padding-bottom: 24px

    .toggler-wrapper
      width: 32px
      height: 32px

      position: absolute
      bottom: -16px

      background: var(--BACKGROUND_PRIMARY)
      border-radius: 50%

      &.configs
        left: 0

</style>
