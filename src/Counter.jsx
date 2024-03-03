/* eslint-disable no-unused-vars */
import { useState } from "react";
import counterStore from "./stores/counterStore"
import { observer } from "mobx-react-lite";
const Counter=observer(()=>{ 
    // const [count,setCount] = useState(0);
    return (
        <>
        <button onClick={()=>counterStore.increment()}>+</button>
        <span>{counterStore.count}</span>
        <button onClick={()=>counterStore.decrement()}>-</button>
        </>
    )
});
export default Counter;