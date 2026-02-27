const TodoData = (props) => {
    // Props là 1 object chứa những dữ liệu của cha truyền cho con. Vì là obj có thể dùng destructuring
    //{
    //  name: "John",
    //  age: 22,
    //  data: { name: "john", age: 22}
    //}
    console.log(">>>>>>Check props", props);
    const { name, age, data } = props
    return (
        <div className="todo-data">
            <p>My name is {name}</p>
            <p>learning react</p>
            <p>learning react</p>
            <p>{JSON.stringify(props.todoList)}</p>
        </div>
    )
}

export default TodoData;