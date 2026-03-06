import { Button, Input, Modal } from "antd"
import { useState } from "react"

const BookForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = () => {
        alert("me");
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type="primary" onClick={() => { setIsModalOpen(true) }}>Create Book</Button>
            </div>

            <Modal title="Create Book" open={isModalOpen} onOk={handleSubmitBtn} onCancel={resetAndCloseModal} maskClosable={false} okText={"CREATE"}>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <span>Full name</span>
                        <Input
                        // value={fullName}
                        // onChange={(event) => { setFullName(event.target.value) }} 
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                        // value={email}
                        // onChange={(event) => { setEmail(event.target.value) }} 
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                        // value={password}
                        // onChange={(event) => { setPassword(event.target.value) }} 
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                        // value={phone}
                        // onChange={(event) => { setPhone(event.target.value) }} 
                        />
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default BookForm