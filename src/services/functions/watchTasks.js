import db from '@/services/dexie';
import store from '@/store';

export default (handleGetTasks) => {
  db.on('changes', (changes) => {
    changes.map(async (change) => {
      if (change.table !== 'tasks') return;

      await handleGetTasks();
      if (change.type === 1) store.commit('hideAddTaskForm');
    });
  });

  setTimeout(handleGetTasks, 1000);
};
