const TodoNew = ({ addNewFunction }) => {
    // Nhận function từ cha App.jsx và gọi ở TodoNew.jsx
    // addNewFunction("Genzo");
    const handleClick = () => {
        alert("Confirm Click");
    }

    const handleOnChange = (value) => {
        console.log(`OnChange ${value}`);

    }
    return (
        <div className="todo-form">
            {/* Hàm có tham số */}
            <input type="text" className="todo-input" placeholder="Enter your task" onChange={(event) => { handleOnChange(event.target.value) }} />
            {/* Hàm không có tham số */}
            <button className="todo-btn" onClick={handleClick}>Add</button>
        </div>
    )
}

export default TodoNew;