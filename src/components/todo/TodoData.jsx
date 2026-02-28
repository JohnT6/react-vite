const TodoData = (props) => {

    const { todoList, deleteTodo } = props

    const handleClick = (id) => {
        deleteTodo(id);
    }

    return (
        <div className="todo-data">
            <ul className="todo-list">
                {todoList.map(item =>
                    // Sử dụng key để react biết khi thêm sửa xóa thì nó sẽ tác động lên thằng nào để nó ko render lại hết nguyên 1 mảng (Lưu ý ko sử dụng index để làm giá trị của key vì khi sửa 1 phần tử bất kỳ thì các phần tử ở dưới nó sẽ bị thay đổi index và render lại làm ảnh hưởng hiệu năng)
                    <li key={item.id} className="todo-item">
                        <p>{item.name}</p>
                        <button className="todo-btn-delete" onClick={() => handleClick(item.id)}>Delete</button>
                    </li>)}
            </ul>
        </div>
    )
}

export default TodoData;