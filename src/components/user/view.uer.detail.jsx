import { Drawer } from 'antd';
import { useEffect, useState } from 'react';

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

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
                            {selectFile && <div style={{
                                width: "150px", height: "100px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={preview} />
                            </div>}
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