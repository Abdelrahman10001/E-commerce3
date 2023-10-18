import React, { useContext, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { UserContext } from "../UserContext/UserContext";


export default function Layout() {

  let { setuserToken } = useContext(UserContext)


  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setuserToken(localStorage.getItem('userToken'))
    }
  }, [])



  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
