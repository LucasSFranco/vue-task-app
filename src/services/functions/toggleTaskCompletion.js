import db from '@/services/dexie';
import Task from '@/models/Task';

export default async (task) => {
  task = new Task(task);

  await db.tasks.update(task.id, task.toggleCompletion());
};
