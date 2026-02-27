import "./components/todo/todo.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import reactLogo from "./assets/react.svg"
import { useState } from "react";


function App() {
  const name = "John";
  const age = 22;
  const data = {
    name: "John",
    age: 22
  }

  const [todoList, setTodoList] = useState([
    { id: 1, name: "learning react" },
    { id: 2, name: "Nấu cơm" }
  ])

  // truyền Function từ cha sang con
  // function cha đc gọi nhận giá trị mới và thêm vào todoList và gửi lại cho TodoData
  const addNewFunction = (name) => {
    console.log("Check todoList hien tai:", todoList);
    const newTodo = {
      id: 3,
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  //Cách cha truyên Props => Key = {value}
  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <TodoNew
        addNewFunction={addNewFunction}
      />
      <TodoData
        name={name}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>

  )
}

export default App
