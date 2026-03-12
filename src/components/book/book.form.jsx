import { Button } from "antd"
import { useState } from "react"
import CreateBookControlComponent from "./create.book.(control-component)";

const BookForm = (props) => {
    const { loadBook } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);







    return (
        <div style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type="primary" onClick={() => { setIsModalOpen(true) }}>Create Book</Button>
            </div>

            <CreateBookControlComponent
                loadBook={loadBook}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    )
}

export default BookForm