import "./components/todo/todo.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import reactLogo from "./assets/react.svg"


function App() {
  const name = "John";
  const age = 22;
  const data = {
    name: "John",
    age: 22
  }
  // truyền Function từ cha sang con
  const addNewFunction = (name) => {
    alert(`Call me ${name}`);
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
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>

  )
}

export default App
