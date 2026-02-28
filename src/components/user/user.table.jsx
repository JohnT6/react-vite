import { Flex, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { fetchAllUserApi } from '../../services/api.service';

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([])

    useEffect(() => {
        console.log(">>> check render 111");
        loadUser();

    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
    ];

    const loadUser = async () => {
        const res = await fetchAllUserApi();
        setDataUsers(res.data)
    }

    console.log(">>> check render 000");


    return (

        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    )
}

export default UserTable;