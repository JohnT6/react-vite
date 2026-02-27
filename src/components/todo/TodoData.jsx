const TodoData = (props) => {
    // Props là 1 object chứa những dữ liệu của cha truyền cho con. Vì là obj có thể dùng destructuring
    //{
    //  name: "John",
    //  age: 22,
    //  data: { name: "john", age: 22}
    //}
    console.log(">>>>>>Check props", props);
    const { todoList } = props
    return (
        <div className="todo-data">
            <ul>
                {todoList.map(item =>
                    <li key={item.id} className="todo-item">
                        <p>{item.name}</p>
                        <button className="todo-btn-delete">Delete</button>
                    </li>)}
            </ul>
        </div>
    )
}

export default TodoData;