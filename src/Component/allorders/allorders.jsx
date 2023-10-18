import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function Allorders() {


    async function getAllOrders() {
        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/`)
        console.log(data.data[0].cartItems[0].product);
        return data
    }

    let { data, isError, isLoading } = useQuery('getOrders', getAllOrders)

    return <>
        <div className="container mt-5 p-5">
            <div className="row g-4">
                <div className="col-md-3">
                    <img src="" alt="" />
                    <h2>All Products</h2>
                </div>
            </div>
        </div>


    </>


}
