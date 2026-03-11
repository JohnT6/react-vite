import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user"
        const data = {
            fullName,
            email,
            password,
            phone
        }
    return  axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id,fullName,phone) => {
    const URL_BACKEND = "/api/v1/user"
        const data = {
            _id,
            fullName,
            phone
        }
    return  axios.put(URL_BACKEND, data);
}

const deleteUserByIdApi = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`
    return  axios.delete(URL_BACKEND);
}

const fetchAllUserApi = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`
    return  axios.get(URL_BACKEND);
}

const handleUploadFile = (file ,folder) => {
    // Khai báo đường dẫn API (endpoint) của backend chuyên xử lý việc nhận file
    const URL_BACKEND = `/api/v1/file/upload`;
    
    // Thiết lập cấu hình (config) cho HTTP request
    let config = {
        headers: {
         // Header tùy chỉnh, báo cho backend biết file này nên được lưu vào thư mục nào
         "upload-type": folder, 
         // Header bắt buộc phải có khi upload file qua HTTP, báo cho server biết gói tin là dạng dữ liệu form chứa file
         "Content-Type": "multipart/form-data" 
        }
    }
    
    // Khởi tạo một đối tượng FormData mới dùng để đóng gói dữ liệu gửi đi
    const bodyFormData = new FormData();
    
    // Đính kèm file truyền vào hàm vào trong FormData với tên key là "fileImg". 
    // Backend sẽ dựa vào key "fileImg" này để trích xuất file ra và xử lý.
    bodyFormData.append("fileImg",file)
    
    // Dùng thư viện axios để gọi API với phương thức POST, gửi lên địa chỉ URL_BACKEND, 
    // kèm theo dữ liệu file (bodyFormData) và cấu hình (config).
    // Hàm return lại một Promise của axios để bạn có thể dùng .then().catch() hoặc async/await ở nơi gọi hàm này.
    return axios.post(URL_BACKEND, bodyFormData , config)
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
        const data = {
            _id,
            avatar,
            fullName,
            phone
        }
    return  axios.put(URL_BACKEND, data);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register"
        const data = {
            fullName,
            email,
            password,
            phone
        }
    return  axios.post(URL_BACKEND, data);
}

const loginUserAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login"
        const data = { 
            username:email,
            password,
        }
    return  axios.post(URL_BACKEND, data);
}

const getUserAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account"
    
    return  axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout"
    
    return  axios.post(URL_BACKEND);
}

// BOOK API
const fetchAllBookApi = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`
    return  axios.get(URL_BACKEND);

}

const updateBookThumbnailAPI = (thumbnail, _id, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
        const data = {
            _id,
            thumbnail,
            mainText,
            author,
            price, 
            quantity, 
            category
        }
    return  axios.put(URL_BACKEND, data);
}

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
        const data = {
            thumbnail, 
            mainText, 
            author, 
            price, 
            quantity, 
            category
        }
    return  axios.post(URL_BACKEND, data);
}

export { createUserAPI, updateUserAPI, fetchAllUserApi, deleteUserByIdApi,handleUploadFile,
    updateUserAvatarAPI,registerUserAPI, loginUserAPI, getUserAccountAPI, logoutAPI,
    fetchAllBookApi, updateBookThumbnailAPI, createBookAPI
}