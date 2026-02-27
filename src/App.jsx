import "./components/todo/todo.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import reactLogo from "./assets/react.svg"
import { useState } from "react";


function App() {
  // const name = "John";
  // const age = 22;
  // const data = {
  //   name: "John",
  //   age: 22
  // }

  // Hàm lấy số ngẫu nhiên
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [todoList, setTodoList] = useState([
    // { id: 1, name: "learning react" },
    // { id: 2, name: "Nấu cơm" }
  ])

  // truyền Function từ cha sang con
  // function cha đc gọi nhận giá trị mới và thêm vào todoList và gửi lại cho TodoData
  // Đặt id là số ngẫu nhiên từ 1 tơi 1tr
  const addNewFunction = (name) => {
    console.log("Check todoList hien tai:", todoList);
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
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
      {/* Nếu todo ko có dữ liệu thì hiển thị logo còn có thì hiểu thị task*/}
      {!todoList.length ? <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div> : <TodoData
        todoList={todoList}
      />}
    </div>

  )
}

export default App
