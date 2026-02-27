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
                    // Sử dụng key để react biết khi thêm sửa xóa thì nó sẽ tác động lên thằng nào để nó ko render lại hết nguyên 1 mảng (Lưu ý ko sử dụng index để làm giá trị của key vì khi sửa 1 phần tử bất kỳ thì các phần tử ở dưới nó sẽ bị thay đổi index và render lại làm ảnh hưởng hiệu năng)
                    <li key={item.id} className="todo-item">
                        <p>{item.name}</p>
                        <button className="todo-btn-delete">Delete</button>
                    </li>)}
            </ul>
        </div>
    )
}

export default TodoData;