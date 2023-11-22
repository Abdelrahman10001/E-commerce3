import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Notfound from './Component/Notfound/Notfound';
import Register from './Component/Register/Register';
import Products from './Component/Products/Products';
import Brands from './Component/Brands/Brands';
import Cart from './Component/Cart/Cart';
import Categories from './Component/Categories/Categories';
import Login from './Component/Login/Login';
import UserContextProvider from './Component/UserContext/UserContext';
import ProtectedRoute from './Component/ProtecedRoute/ProtectedRoute';
import ProductsDetails from './Component/ProductsDetails/ProductsDetails';
import Profile from './Component/Profile/Profile';
import Wishlist from './Component/Wishlist/Wishlist';
import CartContextProvid from './Component/CartContext/CartContext';
import WishContextProvid from './Component/WishContext/WishContext';
import { Offline } from "react-detect-offline";
import OrderDetails from './Component/OrderDetails/OrderDetails';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import Allorders from './Component/allorders/allorders';
import Forgetpassword from './Component/ForgetPassword/Forgetpassword';
import ResetPass from './Component/ResetPass/ResetPass';




let routers = createBrowserRouter([
  {

    element: <Layout />, children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'E-commerce', element: <Home /> },
      { path: 'E-commerce/', element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'OrderDetails', element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'Forgetpassword', element: <Forgetpassword /> },
      { path: 'ResetPass', element: <ResetPass /> },
      { path: 'ProductsDetails/:id', element: <ProtectedRoute><ProductsDetails /></ProtectedRoute> },
      { path: '*', element: <Notfound /> },
    ]
  }
])

export default function App() {
  return <>
    <Offline>
      <div className="network">
        <i className="fas fa-wifi"></i> Your are offline
      </div>
    </Offline>
    <Provider store={store}>
      <WishContextProvid>
        <CartContextProvid>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
          <Toaster />
        </CartContextProvid>
      </WishContextProvid>
    </Provider>

  </>
}
