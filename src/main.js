import { createApp } from 'vue';
import { InlineSvgPlugin } from 'vue-inline-svg';

import App from '@/pages/App.vue';
import router from '@/pages/router';
import store from '@/store';
import i18n from '@/i18n';

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(InlineSvgPlugin)
  .mount('#app');
