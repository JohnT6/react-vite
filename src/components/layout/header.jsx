import { Link, useNavigate } from "react-router-dom";
import { AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const { user, setUser } = useContext(AuthContext);
    let navigate = useNavigate();


    const handleLogout = async () => {
        const res = await logoutAPI();
        console.log(">> check res", res);
        if (res.data) {
            localStorage.removeItem("access_token")
            setUser({
                id: "",
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: ""
            })
            message.success("Đăng xuất thành công")
            navigate("/")
        }

    }


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
                        label: <div onClick={() => handleLogout()}>Đăng xuất</div>,
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