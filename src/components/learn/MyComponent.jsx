// JSX: 1 parent
// Fragment
// CSS external
// CSS Inline
import "./styles.css"

const MyComponent = () => {
  return (
    <>
      <h2>Hello React</h2>
      <div className="child">
        <h5 style={{fontSize: "25px"}}>Child</h5>
      </div>
    </>
  )
}

export default MyComponent;