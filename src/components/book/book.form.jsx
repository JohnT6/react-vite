import { Button, Input, InputNumber, Modal, notification, Select, Space } from "antd"
import { useState } from "react"
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
    const { loadBook } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState("");


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

    const handleSubmitBtn = async () => {

        if (!selectFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload hình ảnh lên"
            })
            return;
        }

        const resUpload = await handleUploadFile(selectFile, "book");
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;
            const resUpdateThumbnail = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);

            if (resUpdateThumbnail.data) {
                resetAndCloseModal();
                await loadBook();

                notification.success({
                    message: "Create book",
                    description: "Thêm book thành công"
                })

            } else {
                notification.error({
                    message: "Error create book",
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

    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        setMainText("");
        setAuthor("");
        setPrice(null);
        setQuantity(null);
        setCategory("");
        setPreview(null);
        setSelectFile(null);
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
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                        />
                    </div>

                    <div>
                        <span>Giá tiền</span>
                        <InputNumber
                            addonAfter="đ"
                            style={{ width: '100%' }}
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                        />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Select
                            value={category}
                            onChange={(value) => setCategory(value)}
                            placement={"topRight"}
                            style={{ width: '100%' }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },

                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },

                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}

                        />
                    </div>
                    <div>
                        <p>Ảnh Thumbnail</p>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            backgroundColor: "orange",
                            borderRadius: "5px",
                            cursor: "pointer",
                            userSelect: "none"
                        }}>
                            Upload Thumbnail
                        </label>
                        <input
                            type="file" name="" id="btnUpload" hidden
                            onChange={handleOnChangeFile}
                            onClick={(event) => { event.target.value = null }}
                        />
                        {preview && <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                width: "150px", height: "100px",
                            }}>
                                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={preview} />
                            </div>
                        </>}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookForm