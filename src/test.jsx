/* eslint-disable no-unused-vars */
import { useState } from "react";
import counterStore from "./stores/counterStore"
import { observer } from "mobx-react-lite";
import todoStore from "./stores/todoStore";
const Test=observer(()=>{ 
    // const [count,setCount] = useState(0);
    return (
        <>
        {/* <button onClick={()=>counterStore.increment()}>+</button>
        <span>{counterStore.count}</span>
        <button onClick={()=>counterStore.decrement()}>-</button> */}
        {todoStore.todos.map(todo => {
        return (
            <div key={todo.id}>
                <input type="checkbox" checked={todo.checked} onChange={()=>todoStore.completeTodo(todo.id)}/>
                <span>{todo.title}{todo.id}</span>
                <button onClick={()=>todoStore.removeTodo(todo.id)}>remove</button>
        </div>
        )})}
        
        <button key onClick={()=>todoStore.addTodo({title:'my title',id:todoStore.todos.length+1})}>add</button>
        </>
    )
});
export default Test;