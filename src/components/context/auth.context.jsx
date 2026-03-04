// import { createContext, useState } from 'react';

/// 1. TẠO CONTEXT (Giống như tạo ra một cái "kho" lưu trữ thông tin chung)
/// Khởi tạo AuthContext với một object chứa các giá trị rỗng làm mặc định.
/// Lưu ý: Giá trị mặc định này chỉ được React dùng đến khi một component 
/// cố gắng lấy dữ liệu (useContext) mà không nằm bên trong thẻ <AuthWrapper>.

// export const AuthContext = createContext({
//     id: "",
//     email: "",
//     phone: "",
//     fullName: "",
//     role: "",
//     avatar: ""
// });

/// 2. TẠO PROVIDER COMPONENT (Thành phần quản lý và phân phát dữ liệu từ "kho")
/// AuthWrapper sẽ bọc bên ngoài các component khác (thường là bọc toàn bộ App)
/// để truyền dữ liệu xuống cho chúng thông qua props.children.

// export const AuthWrapper = (props) => {
/// Khai báo state 'user' để lưu trữ thông tin thực tế của người dùng.
/// 'setUser' là hàm dùng để cập nhật thông tin 'user' (ví dụ: khi login, logout).
//     const [user, setUser] = useState({
//         id: "",
//         email: "",
//         phone: "",
//         fullName: "",
//         role: "",
//         avatar: ""
//     });

//     return (
/// Thẻ Provider này sẽ "phát sóng" dữ liệu đi xuống mọi component con.
/// prop 'value' ở đây chứa một object gồm cả biến 'user' và hàm 'setUser'.
/// Nhờ vậy, component con không chỉ đọc được thông tin mà còn có quyền cập nhật nó.

//         <AuthContext.Provider value={{ user, setUser }}>
//             {/* props.children đại diện cho tất cả các component nằm bên trong AuthWrapper */}
//             {/* Ví dụ trong file App.js/index.js: <AuthWrapper> <App /> </AuthWrapper> */}
//             {props.children}
//         </AuthContext.Provider>
//     );
// };


import { createContext, useState } from 'react';

export const AuthContext = createContext({
    id: "",
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: ""
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

