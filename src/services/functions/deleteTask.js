import db from '@/services/dexie';

export default async (task) => {
  await db.tasks.delete(task.id);
};
