
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getUserAccountAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";


function App() {

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async () => {
    const res = await getUserAccountAPI();
    if (res.data) {
      setUser(res.data.user)
      console.log("check user", res.data);

    }
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
