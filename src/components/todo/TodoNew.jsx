import { useState } from "react";

const TodoNew = (props) => {

    const { addNewFunction } = props

    // useState Hook (getter, setter)
    // Tạo giá trị mặc định của valueInput là "Thêm task" trong useState
    const [valueInput, setValueInput] = useState("Thêm task")

    // Gọi hàm và đưa giá trị mới vào và nó thực hiện logic ở component cha
    const handleClick = () => {
        addNewFunction(valueInput)

    }

    //sửa cái giá trị của valueInput bằng dữ liệu đã nhập trong input bằng set
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