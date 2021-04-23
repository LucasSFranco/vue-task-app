import Dexie from 'dexie';
import 'dexie-observable';

const db = new Dexie('vue-task-app-2.0');

db.version(1).stores({
  tasks: '++id, completed, description, timestamp',
});

db.open();

export default db;
