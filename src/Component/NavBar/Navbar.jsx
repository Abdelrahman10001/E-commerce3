import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/imgs/freshcart-logo.svg";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";




export default function Navbar() {

  let { userToken, setuserToken } = useContext(UserContext)
  let { cartItems } = useContext(CartContext)
  let navigate = useNavigate()



  function LogOut(params) {
    localStorage.removeItem('userToken')
    setuserToken(null)
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-light" >
        <div className="container">
          <Link className="navbar-brand  " to="">
            <img src={logo} width={185} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              {userToken !== null ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link  " to="home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  " to="cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  " to="wishlist">
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  " to="Products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  " to="Categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  " to="Brands">
                      Brands
                    </Link>
                  </li>
                </>
                : ''}

            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userToken ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link position-relative " to="Cart">
                      <i className="fa-solid  fa-cart-shopping fa-xl" style={{ color: '#323232' }}></i>
                      <span className="position-absolute bg-main p-2 top-25 start-80 translate-middle badge ">
                        {cartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span onClick={() => { LogOut() }} className="nav-link  cursor-pointer" > Logout </span>
                  </li>
                </>
                : <>
                  <li className="nav-item">
                    <Link className="nav-link " to="register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="login">
                      Login
                    </Link>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav >
    </>
  );
}
