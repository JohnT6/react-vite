import { use, useEffect, useState } from "react";
import BookForm from "../components/book/book.form";
import TableBook from "../components/book/book.table";
import { fetchAllBookApi } from "../services/api.service";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadBook();
    }, [current, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookApi(current, pageSize);
        console.log(res);

        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <BookForm loadBook={loadBook} />
            <TableBook
                loadBook={loadBook}
                dataBooks={dataBooks}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </div>
    )
}

export default BookPage;