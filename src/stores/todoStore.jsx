import { makeAutoObservable } from 'mobx';
class TodoStore {
    todos = [
        { title: "ask", id: 1, checked: true },
        { title: "ask", id: 2, checked: true },
        { title: "ask", id: 3, checked: false }
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    completeTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
    }
}

export default new TodoStore();
