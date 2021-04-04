import db from '@/services/dexie';
import Task from '@/models/Task';

export default async function getTasks() {
  const tasks = await db.tasks
    .orderBy('timestamp')
    .reverse()
    .toArray();

  return tasks.map((task) => new Task(task).format());
}
