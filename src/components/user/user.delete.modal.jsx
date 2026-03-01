// import { Modal, notification } from "antd";
// import { deleteUserByIdApi } from "../../services/api.service";

// const DeleteUserModal = (props) => {

//     const { isModalDeleteOpen, setIsModalDeleteOpen, dataDelete, setDataDelete, loadUser } = props

//     const handleDeleteBtn = async () => {
//         const res = await deleteUserByIdApi(dataDelete._id);
//         if (res.data) {
//             notification.success({
//                 message: "Delete a user",
//                 description: "Xóa user thành công"
//             })
//             resetAndCloseModal();
//             await loadUser();
//         } else {
//             notification.error({
//                 message: "Error delete a user",
//                 description: JSON.stringify(res.message)
//             })
//         }

//     }

//     const resetAndCloseModal = () => {
//         setIsModalDeleteOpen(false);
//         setDataDelete(null);
//     }

//     return (
//         <Modal title="Delete a User" open={isModalDeleteOpen} onOk={handleDeleteBtn} onCancel={resetAndCloseModal} okText={"DELETE"} okType={"primary"} okButtonProps={{ danger: true }}>
//             <div >
//                 {dataDelete ? <p>Bạn có chắc muốn xóa user {dataDelete._id} </p> : <p>Không có dữ liệu</p>}

//             </div>
//         </Modal>
//     )
// }

// export default DeleteUserModal