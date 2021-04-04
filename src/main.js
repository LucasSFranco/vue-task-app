import { createApp } from 'vue';

import App from '@/pages/App.vue';
import store from '@/store';

createApp(App)
  .use(store)
  .mount('#app');
