import { createI18n } from 'vue-i18n';

import EN_US from '@/i18n/en-us.json';
import PT_BR from '@/i18n/pt-br.json';

const i18n = createI18n({
  fallbackLocale: 'en-us',
  messages: {
    ...EN_US,
    ...PT_BR,
  },
});

export default i18n;
