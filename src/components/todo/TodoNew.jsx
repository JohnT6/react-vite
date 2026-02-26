const TodoNew = ({ addNewFunction }) => {
    // Nhận function từ cha App.jsx và gọi ở TodoNew.jsx
    // addNewFunction("Genzo");
    return (
        <div className="todo-form">
            <input type="text" className="todo-input" placeholder="Enter your task" />
            <button className="todo-btn">Add</button>
        </div>
    )
}

export default TodoNew;