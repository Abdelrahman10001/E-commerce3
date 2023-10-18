import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


export let CartContext = createContext()

// This function acts exactly as a Component
export default function CartContextProvid(Props) {


    let userToken = localStorage.getItem('userToken')
    let [cartItems, setcartItems] = useState(0)
    let headers = {
        token: userToken
    }

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await getCartItems();
                setcartItems((prevCartItems) => data?.numOfCartItems ?? prevCartItems);
                localStorage.setItem('cartId', data?.data._id)
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, []);




    async function getCartItems() {

        return await axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
            {
                headers
            }
        ).then((response) => response)
            .catch((err) => err)
    }

    function addToCart(productIdxx) {

        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, {
            productId: productIdxx
        },
            {
                headers
            }
        ).then((resp) => resp)
            .catch((err) => err)
    }


    function removeItem(productIdxx) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productIdxx}`, { headers })
            .then((resp) => resp)
            .catch((err) => err)
    }
    function updateQuantity(productId, count) {
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
            { count },
            { headers }
        ).then((resp) => resp)
            .catch((err) => err)
    }
    function deleteCart() {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/`,
            { headers }
        ).then((resp) => resp)
            .catch((err) => err)
    }


    return <>
        <CartContext.Provider value={{ cartItems, setcartItems, addToCart, getCartItems, removeItem, updateQuantity, deleteCart }}>
            {Props.children}
        </CartContext.Provider>

    </>



}
