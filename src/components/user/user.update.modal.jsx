import { useEffect, useState } from "react";
import { createUserAPI } from "../../services/api.service";
import { Input, Modal, notification } from "antd";

const UpdateUserModal = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props;

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    // Nếu giá trị của dataUpdate mới nhất khác với giá trị của dataUpdate cũ thì nó sẽ chạy dùng useEffect ( lưu ý Dependency sẽ là 1 biến)
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Update a user",
                description: "Cập nhật user thành công"
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error update a user",
                description: JSON.stringify(res.message)
            })
        }

    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setId("");
        setPhone("");
        setDataUpdate(null);
    }




    return (
        <Modal title="Update a User" open={isModalUpdateOpen} onOk={handleSubmitBtn} onCancel={resetAndCloseModal} maskClosable={false} okText={"SAVE"}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }} />
                </div>

            </div>
        </Modal>
    )
}

export default UpdateUserModal;