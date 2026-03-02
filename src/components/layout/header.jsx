import { Link } from "react-router-dom";
import { BookOutlined, HomeOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from "react";

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserAddOutlined />,

        },
        {
            label: <Link to={"/Books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,

        },
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    type: 'group',
                    children: [
                        { label: <Link to={"/login"}>Đăng nhập</Link>, key: 'login' },
                        { label: <Link to={""}>Đăng xuất</Link>, key: 'logout' },
                    ],
                },
            ],
        },

    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />

    )
}

export default Header;