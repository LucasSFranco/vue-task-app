<template>
  <AppCard>
    <ConfigsHeader />

    <ConfigsBody />
  </AppCard>
</template>

<script>
import { defineComponent } from 'vue';

import AppCard from '@/components/AppCard.vue';
import ConfigsBody from '@/pages/content/ConfigsBody.vue';
import ConfigsHeader from '@/pages/content/ConfigsHeader.vue';

export default defineComponent({
  name: 'AppConfig',
  components: {
    AppCard,
    ConfigsBody,
    ConfigsHeader,
  },
});
</script>

<style lang="sass"></style>
