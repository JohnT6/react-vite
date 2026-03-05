
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getUserAccountAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";


function App() {

  const { setUser, isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async () => {
    const res = await getUserAccountAPI();
    if (res.data) {
      setUser(res.data.user)

    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading === true ?
        <div style={{
          position: 'fixed',
          top: "50%",
          left: "50%",
          translate: "-50% -50%"
        }}>
          <Spin />
        </div> :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>

  )
}

export default App
