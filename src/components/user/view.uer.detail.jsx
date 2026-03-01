import { Drawer } from 'antd';

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
    return (
        <>
            <Drawer
                title="Thông tin người dùng"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataDetail ? <>
                    <p>Id: {dataDetail._id}</p>
                    <p>FullName: {dataDetail.fullName}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Phone: {dataDetail.phone}</p>
                </> : <>
                    <p>Không có dữ liệu</p>
                </>}
            </Drawer>
        </>
    )
}

export default ViewUserDetail