import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
import { useState } from "react";

const CreateBookUncontrolledComponent = (props) => {
    const [form] = useForm();

    const { loadBook, isModalOpen, setIsModalOpen } = props;


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

    const onFinish = async (values) => {

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
            const resUpdateThumbnail = await createBookAPI(newThumbnail, values.mainText, values.author, values.price, values.quantity, values.category);

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
        form.resetFields();
        setIsModalOpen(false)
        setPreview(null);
        setSelectFile(null);
    }

    return (
        <Row justify={"center"} style={{ margin: "50px 20px" }}>
            <Col xs={24} md={12} lg={8}>
                <Modal title="Create Book" open={isModalOpen} onOk={() => form.submit()} onCancel={resetAndCloseModal} maskClosable={false} okText={"CREATE"}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ margin: "10px" }}
                        onKeyDown={(event) => { if (event.key === "Enter") form.submit() }}
                    // onFinishFailed={onFinishFailed}
                    >


                        <Form.Item
                            label="Tiêu đề"
                            name="mainText"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập Tiêu đề!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Tác giả"
                            name="author"
                            rules={[{ required: true, message: 'Hãy nhập Tác giả!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Giá tiền"
                            name="price"
                            rules={[{ required: true, message: 'Hãy nhập giá tiền!' }]}
                        >
                            <InputNumber
                                addonAfter="đ"
                                style={{ width: '100%' }}

                            />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}

                            />
                        </Form.Item>

                        <Form.Item
                            label="Thể loại"
                            name="category"
                            rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
                        >
                            <Select

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
                        </Form.Item>

                        <Form.Item
                            label="Ảnh Thumbnail"
                        >

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
                                style={{ display: "none" }}
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
                        </Form.Item>
                    </Form>

                </Modal>
            </Col>
        </Row>
    )
}

export default CreateBookUncontrolledComponent