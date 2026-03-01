import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserApi } from '../services/api.service';


const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    // empty array => run once
    // not empty => next value !== prev value ( nếu mới khác cũ chạy lại)
    useEffect(() => {
        loadUser();
    }, [current, pageSize]) // [] + condition ( nó vẫn chạy lần đầu tiên mà nó có thêm điều kiện là giá trị trong [] thay đổi thì chạy lại )

    const loadUser = async () => {
        const res = await fetchAllUserApi(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }


    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}
export default UserPage;