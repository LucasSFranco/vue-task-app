<template>
	<main>
		<div class="todo-list">
			<div class="header">
				<h1>Tasks</h1>
				<h6>Get things done, one thing at a time.</h6>
				<button
					:class="{ selected: showAddTodo }"
					@click="toggleAddTodoVisibility"
				>
					<i class="fas fa-plus" />
				</button>
			</div>

			<div v-show="showAddTodo" class="add-todo">
				<div
					tabindex="0"
					ref="textarea"
					class="textarea"
					placeholder="Write a new task..."
					contenteditable
					@input="handleChange"
					@keydown.exact.esc="hideAddTodo"
					@keydown.exact.enter="addTodo"
				/>
				<small>
					escape to <button @click="hideAddTodo">cancel</button>
					<i class="fas fa-circle"></i>
					enter to <button @click="addTodo">save</button>
				</small>
			</div>

			<div class="todos">
				<ul v-if="loading">
					<div
						v-for="index in 20"
						:key="index"
						:style="{ opacity: 1 - index * 0.05 }"
						class="skeleton"
					>
						<div class="square" />
						<div class="rectangle" />
						<div class="square" />
					</div>
				</ul>

				<div class="fragment" v-else>
					<ul v-if="todos.length">
						<li
							v-for="todo in todos"
							:key="todo.id"
							:class="{ completed: todo.completed }"
						>
							<button
								class="check"
								:class="{ selected: todo.completed }"
								@click="toggleTodoCompletion(todo)"
							>
								<i class="fas fa-check" />
							</button>
							<p>{{ todo.description }}</p>
							<button class="delete" @click="deleteTodo(todo)">
								<i class="fas fa-times" />
							</button>
							<time>{{ todo.date }}</time>
						</li>
					</ul>

					<div v-else class="empty">
						<div class="image">
							<img src="./assets/empty.svg" alt="" />
						</div>
						<p>Hmm! Seems you have nothing to do for now.</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import moment from "moment";
import db from "./db";

export default {
	name: "App",
	data() {
		return {
			loading: true,
			todo: {
				description: "",
				completed: false,
				date: null
			},
			showAddTodo: false,
			todos: []
		};
	},
	created() {
		setTimeout(() => {
			this.getTodos();
		}, 1000);
	},
	methods: {
		async getTodos() {
			const todos = await db.todos
				.orderBy("date")
				.reverse()
				.toArray();

			this.todos = todos.map(todo => ({
				...todo,
				date: moment(todo.date).calendar()
			}));
			this.loading = false;
		},
		async addTodo() {
			if (!this.todo.description) {
				this.hideAddTodo();
				this.$refs.textarea.innerHTML = "";
				return;
			}

			await db.todos.add({
				...this.todo,
				date: new Date()
			});

			this.todo = {
				description: "",
				completed: false,
				date: null
			};

			await this.getTodos();

			this.hideAddTodo();
			this.$refs.textarea.innerHTML = "";
		},
		async deleteTodo(todo) {
			await db.todos.delete(todo.id);

			await this.getTodos();
		},
		async toggleTodoCompletion(todo) {
			await db.todos.update(todo.id, { completed: !todo.completed });

			await this.getTodos();
		},
		handleChange({ target }) {
			const value = target.innerHTML
				.replace(/&nbsp;/g, "")
				.replace(/<div>/g, "\n")
				.replace(/<\/div>/g, "")
				.replace(/<br>/g, "")
				.trim();

			this.todo.description = value;
		},
		toggleAddTodoVisibility() {
			this.showAddTodo = !this.showAddTodo;

			if (this.showAddTodo) {
				setTimeout(() => {
					this.$refs.textarea.focus();
				}, 0);
			} else {
				this.$refs.textarea.innerHTML = "";
			}
		},
		hideAddTodo() {
			this.showAddTodo = false;
			this.$refs.textarea.innerHTML = "";
		}
	}
};
</script>

<style>
html,
body,
#app {
	width: 100%;
	height: 100%;
}

* {
	border: 0;
	margin: 0;
	outline: 0;
	padding: 0;

	background: none;
	box-sizing: border-box;
	list-style: none;
	resize: none;
	text-decoration: none;
	user-select: none;

	font-family: "Poppins";
	font-size: 16px;
	line-height: 1.2;
}

main {
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #202225;
	padding: 16px;
}

.todo-list {
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;

	background: #36393f;
	border-radius: 8px;
}
@media (min-width: 640px) {
	.todo-list {
		height: 80%;

		max-width: 608px;
		max-height: 608px;
	}
}

.header {
	margin: 32px 24px;
	padding-bottom: 16px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);

	position: relative;
}

.header h1 {
	color: #ffffff;
	text-transform: uppercase;

	font-size: 24px;
	font-weight: 600;
	text-align: center;
	margin-bottom: 4px;
}

.header h6 {
	color: #b9bbbe;
	font-size: 14px;
	font-weight: 300;
	text-align: center;
}

.header button {
	width: 32px;
	height: 32px;

	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 100%;
	right: 0;
	cursor: pointer;

	background: #43b581;
	border-radius: 50%;
	color: #ffffff;
	margin-top: -16px;
}
.header button.selected {
	background: #36393f;
	color: #43b581;
	border: 2px solid #43b581;
}

.header button i {
	font-size: 14px;
	z-index: 1;
}

.header button::before {
	content: "";

	width: 32px;
	height: 32px;

	position: absolute;
	top: 0;
	left: 0;

	border-radius: 50%;
}
.header button:hover::before {
	background: #3ca374;
}
.header button:active::before {
	background: #369167;
}
.header button.selected::before {
	background: rgba(67, 181, 129, 0.1);
}

.add-todo {
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	margin: 0 24px;
	padding-bottom: 16px;
}

.add-todo .textarea {
	background: #40444b;
	border-radius: 8px;
	color: #dcddde;
	font-weight: 300;
	line-height: 22px;
	min-height: 44px;
	padding: 11px;

	max-height: 132px;

	overflow: hidden scroll;
}
.add-todo .textarea[placeholder]:empty::before {
	content: attr(placeholder);
	color: #72767d;
}
.add-todo .textarea::-webkit-scrollbar {
	width: 12px;
	height: 12px;
}
.add-todo .textarea::-webkit-scrollbar-thumb {
	background-clip: padding-box;
	background-color: rgba(24, 25, 28, 0.6);
	border: 4px solid transparent;
	border-radius: 6px;
}

.add-todo small {
	display: flex;
	align-items: center;

	color: #dcddde;
	font-size: 10px;
	font-weight: 300;
	margin-top: 4px;
}

.add-todo small i {
	font-size: 4px;
	margin: 0 4px;
}

.add-todo small button {
	font-size: inherit;
	color: #7289da;
	cursor: pointer;
	margin-left: 4px;
}
.add-todo small button:hover {
	text-decoration: underline;
}

.todos {
	position: relative;

	flex-grow: 1;
	margin: 0 8px 32px;
}

ul {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	overflow: hidden scroll;

	padding: 0 8px 0 16px;
}
ul::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
ul::-webkit-scrollbar-thumb {
	background-clip: padding-box;
	background-color: #202225;
	border: 2px solid transparent;
	border-radius: 4px;

	visibility: hidden;
}
ul:hover::-webkit-scrollbar-thumb {
	visibility: visible;
}

li {
	display: flex;
	align-items: center;

	border-radius: 8px;
	padding: 8px 0;
	font-size: 14px;
	font-weight: 300;
	line-height: 22px;
	color: #dcddde;
	user-select: text;
	position: relative;
}
li + li {
	border-top: 1px solid rgba(255, 255, 255, 0.06);
}

li:hover {
	background: rgba(79, 84, 92, 0.16);
	border-color: transparent;
}

li:hover > time {
	visibility: visible;
}

li:hover + li {
	border-color: transparent;
}

li button {
	display: flex;
	align-items: center;

	cursor: pointer;
	flex-shrink: 0;
	margin: 0 8px;
}
li button:active {
	transform: translateY(1px);
}
li .check i {
	font-size: 14px;
}
li .check {
	color: #747f8d;
}
li .check:hover {
	color: #68727f;
}
li .check:active {
	color: #5d6671;
}
li .check.selected {
	color: #43b581;
}
li .check.selected:hover {
	color: #3ca374;
}
li .check.selected:active {
	color: #369167;
}

li .delete i {
	font-size: 14px;
}
li .delete {
	color: #f04747;
}
li .delete:hover {
	color: #d84040;
}
li .delete:active {
	color: #c03939;
}

li > p {
	flex-grow: 1;
	user-select: text;
}
li.completed > p {
	color: #b9bbbe;
	text-decoration: line-through;
}

li > time {
	display: inline-block;
	position: absolute;
	top: 100%;
	right: 26px;
	font-size: 10px;
	transform: translateY(-50%);
	background: #2f3136;
	padding: 2px 4px;
	z-index: 1;
	border-radius: 3px;
	visibility: hidden;
	color: #b9bbbe;
	font-weight: 300;
}

.skeleton {
	display: flex;
	align-items: center;
	padding: 0 8px;
}

.skeleton + .skeleton {
	margin-top: 8px;
}

.skeleton > * {
	background: #2f3136;

	border-radius: 3px;
}

.skeleton > * + * {
	margin-left: 8px;
}

.skeleton .square {
	width: 14px;
	height: 14px;

	flex-shrink: 0;
}

.skeleton .rectangle {
	height: 22px;

	flex-grow: 1;
}

.empty {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.empty .image {
	height: 140px;
	margin-bottom: 16px;
}
.empty .image img {
	height: 100%;

	filter: grayscale(1);
}

.empty p {
	color: #72767d;
	font-size: 14px;
	font-weight: 300;
	text-align: center;
}

.fragment {
	width: 100%;
	height: 100%;
}
</style>
