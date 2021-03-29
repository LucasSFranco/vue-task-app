import Dexie from 'dexie'

const db = new Dexie("vue-todo-app")

db.version(1).stores({
	todos: '++id, description, checked, date',
})

export default db
