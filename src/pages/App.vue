<template>
  <main
    :class="selectedTheme"
    @click="closePopups"
  >
    <AppHotkeys />

    <router-view v-slot="{ Component }">
      <TransitionCard>
        <component :is="Component" />
      </TransitionCard>
    </router-view>

    <AppPopupLayer />
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import AppHotkeys from '@/pages/AppHotkeys.vue';
import AppPopupLayer from '@/pages/AppPopupLayer.vue';

import TransitionCard from '@/components/animations/TransitionCard.vue';

export default defineComponent({
  name: 'App',
  components: {
    TransitionCard,
    AppHotkeys,
    AppPopupLayer,
  },
  computed: {
    ...mapState('configs', [
      'selectedTheme',
      'selectedLanguage',
    ]),
  },
  beforeMount() {
    this.defineLocale();
  },
  methods: {
    ...mapActions('configs', [
      'defineLocale',
    ]),
    closePopups() {
      const popups = this.$el.querySelectorAll('#popup-layer > *');

      popups.forEach((popup) => popup.classList.remove('show'));
    },
  },
});
</script>

<style lang="sass">

  #app > main
    width: 100%
    height: 100%

    display: flex
    align-items: center
    justify-content: center

    background: var(--BACKGROUND_TERTIARY)
    overflow: hidden

  @import '@/styles/GlobalStyle.sass'

</style>
