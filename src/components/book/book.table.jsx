import { Popconfirm, Table } from "antd"
import UpdateUserModal from "../user/user.update.modal"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";


const TableBook = (props) => {

    const { dataBooks, loadBook, current, pageSize, total, setCurrent, setPageSize } = props

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataBookDetail, setDataBookDetail] = useState(null);

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            },
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href="#!" onClick={() => {
                        setDataBookDetail(record)
                        setIsDetailOpen(true)
                    }}>{record._id}</a>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',

        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            // Thêm hàm render để format dữ liệu trước khi hiển thị
            render: (value) => {
                // value ở đây chính là record.price từ API trả về (ví dụ: 80000)
                if (value) {
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
                }
                return value; // Trả về nguyên gốc nếu không có dữ liệu
            }

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',

        },
        {
            title: 'Tác giả',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            // record ở đây là 1 row trong bảng và setDataUpdate là dữ liệu của row đó
                            // setDataUpdate(record)
                            // setIsModalUpdateOpen(true)
                        }}
                    />
                    <Popconfirm
                        title="Xóa người dùng này"
                        description="Chắc chắn xóa người dùng này?"
                        // onConfirm={async () => { await handleDeleteUSer(record._id) }}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)

            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
        console.log(">> check", { pagination, filters, sorter, extra });
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />
            {/* <UpdateBookModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            /> */}
            <ViewBookDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
                loadBook={loadBook}
            />
        </>
    )
}

export default TableBook