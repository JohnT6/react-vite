// JSX: 1 parent
// Fragment
// CSS external
// CSS Inline
import "./styles.css"

const MyComponent = () => {
    const string = "Hello" // String
    const number = 36 // Number
    const bool = true // Boolean
    const unde = undefined // undefined
    const ull = null // Null
    const arr = [1 , 2, 3] // Array
    const obj = {
        name: "John",
        age: 22
    } // Object
  return (
    <>
      <h2>{JSON.stringify(obj)} React</h2>
      <div>{console.log("Hello Console")}</div>
      <div className="child">
        <h5 style={{fontSize: "25px"}}>Child</h5> {/*Cái style ở đây có 2 ngoặc nhọn là vì cái bên ngoài dùng ngoặc nhọn để dùng JS cái thứ 2 là Object*/}
      </div>
    </>
  )
}

export default MyComponent;