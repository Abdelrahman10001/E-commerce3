import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext/CartContext'
import { BallTriangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'


export default function Cart() {

  let navigate = useNavigate()

  function payInperson() {
    navigate('/OrderDetails')
  }

  let { getCartItems, removeItem, updateQuantity, deleteCart } = useContext(CartContext)
  let { setcartItems } = useContext(CartContext)
  const [CardDetails, setCardDetails] = useState(null)

  async function deletAllCart() {
    let { data } = await deleteCart()
    setCardDetails(data)
    setcartItems(0)
  }
  async function updateQ(id, count) {
    let { data } = await updateQuantity(id, count)
    setCardDetails(data)
  }

  async function ItemRemoved(id) {
    let { data } = await removeItem(id)
    setcartItems(data.numOfCartItems)
    setCardDetails(data)
  }

  async function getCart() {
    let { data } = await getCartItems()
    setCardDetails(data)
  }
  useEffect(() => {
    getCart()

  }, [])


  return <>
    {/* {console.log(CardDetails?.data._id)} */}
    {CardDetails === null ? (
      <section id='loading' className='d-flex vh-100 justify-content-center align-items-center'>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </section>
    ) : (<div className="container my-5 py-5 ">
      {CardDetails && CardDetails?.data && CardDetails.data?.totalCartPrice > 0 && CardDetails?.numOfCartItems !== 0 ?
        <>

          <div className="p-3 px-5 mt-5 mx-auto bg-main-light ">
            <div className="d-flex px-3 justify-content-between align-content-center">
              <div>
                <h3 className='py-3 fw-bolder'>Cart Shop</h3>
                <h4 className=' py-2 text-main fw-bolder'>Total Price : <span className='text-main'>{CardDetails.data.totalCartPrice}</span>  </h4>
              </div>
              <div className=''>
                <div className="">
                  <button onClick={() => payInperson(CardDetails?.data._id)} className='btn btn-success    my-3  text-white'>Check out</button>
                </div>

                <h5 className=' py-2 text-main fw-bolder'>Total number of items : <span className='text-main'>{CardDetails.numOfCartItems}</span>  </h5>
              </div>
            </div>

            {CardDetails.data.products.map((product) => <div key={product.product.id} className='row  my-4 align-items-center'>

              <div className="col-md-2">
                <img className='w-100' src={product.product.imageCover} alt='product_cover' />
              </div>
              <div className="col-md-10">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <h3 className='h6 fw-bolder'>{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                    <h6 className='fw-bold'> {product.price}EGP</h6>
                  </div>

                  <div>
                    <button onClick={() => updateQ(product.product.id, product.count + 1)} className='btn btn-success '>+</button>
                    <span className='mx-3'>{product.count}</span>
                    <button onClick={() => updateQ(product.product.id, product.count - 1)} className='btn btn-success '>-</button>
                  </div>

                </div>
                <button onClick={() => ItemRemoved(product.product.id)} className='btn  p-0 '><i className='text-danger me-1 font-sm fas fa-trash-can'></i>Remove</button>
              </div>

            </div>

            )
            }
            <div className=' text-center'>
              <button onClick={() => deletAllCart()} className='btn btn-outline-success p-2 px-4'>Clear The Cart</button>
            </div>
          </div>
        </> : <>

          <div className='p-3 px-5 mt-5 mx-auto bg-main-light'>
            <h3 className='py-3 fw-bolder'>Cart Shop</h3>
            <h3 className='py-3 '>Your cart is Empty</h3>
          </div>

        </>}

    </div>
    )
    }
  </>
}




