import { createStore } from 'vuex';

import configs from '@/store/modules/configs';
import tasks from '@/store/modules/tasks';

export default createStore({
  modules: {
    configs,
    tasks,
  },
});
