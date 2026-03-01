import { Drawer } from 'antd';

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
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
                        <div >
                            <img width={300} height={250} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
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
                            <input type="file" name="" id="btnUpload" hidden />
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