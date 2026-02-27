import { useState } from "react";

const TodoNew = (props) => {

    const { addNewTodo } = props

    // useState Hook (getter, setter)
    // Tạo giá trị mặc định của valueInput là "Thêm task" trong useState
    const [valueInput, setValueInput] = useState("Thêm task")

    // Gọi hàm và đưa giá trị mới vào và nó thực hiện logic ở component cha
    const handleClick = () => {
        addNewTodo(valueInput)
        // Khi đã truyền giá trị mới vào hàm xử lý thì gán lại thành rỗng vì input đang dùng value của valueInput
        setValueInput("")
    }

    //sửa cái giá trị của valueInput bằng dữ liệu đã nhập trong input bằng set
    const handleOnChange = (value) => {
        setValueInput(value)

    }
    return (
        <div className="todo-form-inner">
            <div className="todo-form">
                <input type="text" className="todo-input" placeholder="Enter your task" value={valueInput} onChange={(event) => {
                    handleOnChange(event.target.value)
                }} />
                <button className="todo-btn" onClick={handleClick}>Add</button>
            </div>
            <p>My input: {valueInput} </p>
        </div>
    )
}

export default TodoNew;