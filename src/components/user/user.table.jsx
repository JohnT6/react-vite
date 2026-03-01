import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './user.update.modal';
import { useState } from 'react';
import ViewUserDetail from './view.uer.detail';
// cách 2 sử dụng modal delete
// import DeleteUserModal from './user.delete.modal';
import { deleteUserByIdApi } from '../../services/api.service';

const UserTable = (props) => {

    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // cách 2 sử dụng modal delete
    // const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    // const [dataDelete, setDataDelete] = useState(null);

    const handleDeleteUSer = async (id) => {
        const res = await deleteUserByIdApi(id);
        if (res.data) {
            notification.success({
                message: "Delete a user",
                description: "Xóa user thành công"
            })
            await loadUser();
        } else {
            notification.error({
                message: "Error delete a user",
                description: JSON.stringify(res.message)
            })
        }

    }

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
                        setDataDetail(record)
                        setIsDetailOpen(true)
                    }}>{record._id}</a>
                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            // record ở đây là 1 row trong bảng và setDataUpdate là dữ liệu của row đó
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                    />
                    <Popconfirm
                        title="Xóa người dùng này"
                        description="Chắc chắn xóa người dùng này?"
                        onConfirm={async () => { await handleDeleteUSer(record._id) }}
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

    const onChange = async (pagination, filters, sorter, extra) => {

        // Nếu thay đổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);

            }
        }

        // Nếu thay đổi tổng số phần tử: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);

            }
        }
        // setPageSize(pagination.pageSize)
        console.log(">> check", { pagination, filters, sorter, extra });

    };

    return (

        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
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
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
            {/* Cách khác dùng component modal */}
            {/* <DeleteUserModal
                isModalDeleteOpen={isModalDeleteOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                loadUser={loadUser}
            /> */}
        </>
    )
}

export default UserTable;