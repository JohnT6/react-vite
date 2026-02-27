import { useState } from "react";

const TodoNew = ({ addNewFunction }) => {

    // useState Hook (getter, setter)
    const [valueInput, setValueInput] = useState("Thêm task")

    const handleClick = () => {
        console.log(`>>> Check value ${valueInput}`);

    }

    const handleOnChange = (value) => {
        setValueInput(value)

    }
    return (
        <div className="todo-container">
            <div className="todo-form">
                <input type="text" className="todo-input" placeholder="Enter your task" onChange={(event) => { handleOnChange(event.target.value) }} />
                <button className="todo-btn" onClick={handleClick}>Add</button>
            </div>
            <p>My input: {valueInput} </p>
        </div>
    )
}

export default TodoNew;