import { Link } from "react-router-dom";
import { AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const { user } = useContext(AuthContext);

    console.log(">>> check user", user);


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
        ...(!user.id ?
            [{
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: 'login',
                icon: <LoginOutlined />
            }] : []),
        ...(user.id ?
            [{
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <Link to={""}>Đăng xuất</Link>,
                        key: 'logout'
                    },
                ],
            }] : [])

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