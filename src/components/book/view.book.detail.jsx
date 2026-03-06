import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateBookThumbnailAPI } from "../../services/api.service";

const ViewBookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataBookDetail, setDataBookDetail, loadBook } = props

    const [preview, setPreview] = useState()
    const [selectFile, setSelectFile] = useState()

    const handleOnChangeFile = (event) => {

        if (!event.target.value && event.target.files.length === 0) {
            setSelectFile(null)
            setPreview(null)
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectFile, "book");
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;
            const resUpdateThumbnail = await updateBookThumbnailAPI(newThumbnail, dataBookDetail._id, dataBookDetail.mainText, dataBookDetail.author, dataBookDetail.price, dataBookDetail.quantity, dataBookDetail.category);
            if (resUpdateThumbnail.data) {
                setIsDetailOpen(false);
                setPreview(null);
                setSelectFile(null)
                await loadBook();

                notification.success({
                    message: "Update thumbnail book",
                    description: "Cập nhật thumbnail thành công"
                })

            } else {
                notification.error({
                    message: "Error update thumbnail",
                    description: JSON.stringify(resUpdateThumbnail.message)
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
                title="Thông tin sách"
                width={"40vw"}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setDataBookDetail(null)
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataBookDetail ? <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <p>Id: {dataBookDetail._id}</p>
                        <p>Tiêu đề: {dataBookDetail.mainText}</p>
                        <p>Tác giả: {dataBookDetail.author}</p>
                        <p>Giá tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBookDetail.price)}</p>
                        <p>Số lượng: {dataBookDetail.quantity}</p>
                        <p>Thể loại: {dataBookDetail.category}</p>
                        <p>Avatar:</p>
                        <div style={{
                            width: "150px", height: "100px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`} />
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
                                Upload Thumbnail
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

export default ViewBookDetail