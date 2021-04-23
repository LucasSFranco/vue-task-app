import { createRouter, createWebHistory } from 'vue-router';

import AppConfigs from '@/pages/AppConfigs.vue';
import AppNotFound from '@/pages/AppNotFound.vue';
import AppTasks from '@/pages/AppTasks.vue';

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: AppTasks,
  },
  {
    path: '/configs',
    name: 'Configs',
    component: AppConfigs,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: AppNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
