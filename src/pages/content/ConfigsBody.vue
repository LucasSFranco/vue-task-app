<template>
  <AppScrollbox class="configs__body">
    <section>
      <AppLabel primary>
        {{ $t('configs.body.appearanceTitle') }}
      </AppLabel>
      <AppLabel secondary>
        {{ $t('configs.body.themeLabel') }}
      </AppLabel>
      <AppRadioGroup>
        <AppRadioGroupBar
          v-for="theme in themes"
          :id="theme.key"
          :key="theme.key"
          :checked="theme.key === selectedTheme"
          name="theme"
          @click="changeSelectedTheme(theme.key)"
        >
          {{ $t(`configs.body.themes.${theme.key}`) }}
        </AppRadioGroupBar>
      </AppRadioGroup>
    </section>
    <section>
      <AppLabel primary>
        {{ $t('configs.body.accessibilityTitle') }}
      </AppLabel>
      <AppLabel secondary>
        {{ $t('configs.body.languageLabel') }}
      </AppLabel>
      <AppRadioGroup>
        <AppRadioGroupBar
          v-for="language in languages"
          :id="language.key"
          :key="language.key"
          :checked="language.key === selectedLanguage"
          name="language"
          @click="changeSelectedLanguage(language.key)"
        >
          {{ language.label }}
          <template #extra>
            <small>{{ $t(`configs.body.languages.${language.key}`) }}</small>
            <img :src="require(`@/assets/country-flags/${language.key}.png`)">
          </template>
        </AppRadioGroupBar>
      </AppRadioGroup>
    </section>
  </AppScrollbox>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import AppLabel from '@/components/AppLabel.vue';
import AppScrollbox from '@/components/AppScrollbox.vue';
import AppRadioGroup from '@/components/AppRadioGroup.vue';
import AppRadioGroupBar from '@/components/AppRadioGroupBar.vue';

export default defineComponent({
  name: 'ConfigsBody',
  components: {
    AppLabel,
    AppScrollbox,
    AppRadioGroup,
    AppRadioGroupBar,
  },
  computed: {
    ...mapState('configs', [
      'selectedLanguage',
      'languages',
      'selectedTheme',
      'themes',
    ]),
  },
  methods: {
    ...mapActions('configs', [
      'changeSelectedTheme',
      'changeSelectedLanguage',
    ]),
  },
});
</script>

<style scoped lang="sass">

  .configs__body
    section + section
      margin-top: 24px

</style>
