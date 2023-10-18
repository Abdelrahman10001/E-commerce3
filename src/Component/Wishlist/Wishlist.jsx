import React, { useContext } from 'react';
import { wishContext } from '../WishContext/WishContext';
import { useQuery } from 'react-query';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
    const { getWishList, removeWish } = useContext(wishContext);

    let { addToCart } = useContext(CartContext)

    async function addCart(id) {
        let respnose = await addToCart(id)
        console.log(respnose);
        if (respnose.data.status === 'success') {
            toast.success("Product added successfully", {
                duration: 1500
            })
        } else {

        }

    }

    const { data: getWish, isLoading, refetch } = useQuery('getWish', getWishList);
    
    async function wishRemoved(id) {
        await removeWish(id);
        refetch()
    }


    return <>



        {isLoading ? <div className='d-flex justify-content-center vh-100 align-items-center bg-light'>
            <i className='fas  fa-spinner fa-spin fa-4x'></i>
        </div>

            : <div className="container my-5 py-5">

                <div className="p-3 px-5 mt-5 mx-auto bg-main-light">

                    {getWish.data.data && getWish?.data.count > 0 ? <> <div className="d-flex px-3 justify-content-between align-content-center">
                        <div>
                            <h3 className='py-3 fw-bolder'>My wish List</h3>

                        </div>
                    </div>
                        {getWish?.data.data.map((brand) => (
                            <div key={brand.id} className='row my-4 align-items-center'>
                                <div className="col-md-2">
                                    <img className='w-100' src={brand.imageCover} alt='wishlist' />
                                </div>
                                <div className="col-md-10">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>

                                            <h3 className='h6 fw-bolder'>{brand.title.split(' ').slice(0, 3).join(' ')}</h3>
                                            <h6 className='fw-bold'> {brand.price}EGP</h6>
                                        </div>
                                        <div>
                                            <button onClick={() => addCart(brand._id)} className='btn btn-outline-success px-3 py-2'>Add to Cart</button>
                                        </div>
                                    </div>
                                    <button onClick={() => wishRemoved(brand.id)} className='btn p-0'>
                                        <i className='text-danger me-1 font-sm fas fa-trash-can'></i>Remove
                                    </button>
                                </div>
                            </div>
                        ))}</>

                        : <div>
                            <h3 className='py-3 fw-bolder'>Your WishList is empty</h3>
                        </div>
                    }


                </div>
            </div >}



    </>



}
