import "./components/todo/todo.css"
import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import reactLogo from "./assets/react.svg"


function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <TodoNew />
      <TodoData />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>

  )
}

export default App
