import { Button, Drawer, notification } from 'antd';
import { useEffect, useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;

    const [selectFile, setSelectFile] = useState();
    const [preview, setPreview] = useState();

    // useEffect(() => {
    //     if (!selectFile) {
    //         setPreview(undefined)
    //         return
    //     }
    //     const objectUrl = URL.createObjectURL(selectFile);
    //     setPreview(objectUrl)

    //     return () => URL.revokeObjectURL(selectFile)
    // }, [selectFile])

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectFile(null)
            setPreview(null)
            return
        }

        const file = e.target.files[0];
        if (file) {
            setSelectFile(file)
            setPreview(URL.createObjectURL(file))
        }

    }

    const handleUpdateUserAvatar = async () => {
        // step 1: upload file
        // upload file lên backend lưu trữ
        const resUpload = await handleUploadFile(selectFile, "avatar");
        if (resUpload.data) {

            // step 2: update user
            // lưu dữ liệu của file mới upload
            const newAvatar = resUpload.data.fileUploaded;
            // gọi api và cập nhật lại file avatar mới upload cùng với id của user cần update avatar do dùng put nên vẫn phải gửi thêm các dữ liệu khác trong db
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            if (resUpdateAvatar.data) {
                // Đóng modal set lại các dữ liệu đã lưu trong selecfile và preview và load lại user
                setIsDetailOpen(false)
                setSelectFile(null)
                setPreview(null)
                await loadUser();

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })

            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }

    }
    return (
        <>
            <Drawer
                title="Thông tin người dùng"
                width={"40vw"}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataDetail ? <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <p>Id: {dataDetail._id}</p>
                        <p>FullName: {dataDetail.fullName}</p>
                        <p>Email: {dataDetail.email}</p>
                        <p>Phone: {dataDetail.phone}</p>
                        <p>Avatar:</p>
                        <div style={{
                            width: "150px", height: "100px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                        </div>
                        <div>
                            <label htmlFor="btnUpload" style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                backgroundColor: "lightblue",
                                borderRadius: "5px",
                                cursor: "pointer",
                                userSelect: "none"
                            }}>
                                Upload Avatar
                            </label>
                            <input
                                type="file" name="" id="btnUpload" hidden
                                onChange={handleOnChangeFile}
                            />
                            {preview && <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    width: "150px", height: "100px",
                                }}>
                                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={preview} />
                                </div>
                                <Button type='primary'
                                    onClick={() => handleUpdateUserAvatar()}
                                >Save</Button>
                            </>}
                        </div>
                    </div>
                </> : <>
                    <p>Không có dữ liệu</p>
                </>}
            </Drawer>
        </>
    )
}

export default ViewUserDetail