import axios from 'axios'
import React, { createContext } from 'react'

export let wishContext = createContext()

export default function WishContextProvid(Props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }

    function addToWish(productId) {

        return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,
            {
                productId
            },
            {
                headers
            }
        ).then((resp) => resp)
            .catch((err) => err)
    }

    function getWishList() {
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,
            {
                headers
            }).then((res) => res)
            .catch((error) => error)
    }

    function removeWish(id) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`, { headers })
            .then((res) => res)
            .catch((error) => error)
    }

    return <>
        <wishContext.Provider value={{ addToWish, getWishList, removeWish }}>
            {Props.children}
        </wishContext.Provider>

    </>

}
