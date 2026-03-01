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


export { createUserAPI, updateUserAPI, fetchAllUserApi, deleteUserByIdApi,handleUploadFile,updateUserAvatarAPI }