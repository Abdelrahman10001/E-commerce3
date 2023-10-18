import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { wishContext } from '../WishContext/WishContext';

export default function FeaturedProducts() {
  let { addToCart } = useContext(CartContext);
  let { setcartItems } = useContext(CartContext);
  let { addToWish } = useContext(wishContext);

  const [heartColors, setHeartColors] = useState({});

  function toggleColor(productId) {
    setHeartColors((prevColors) => ({
      ...prevColors,
      [productId]: prevColors[productId] === 'black' ? 'red' : 'black',
    }));
  }

  async function addWish(productId) {
    let respnose = await addToWish(productId);
    if (respnose?.data.status === 'success') {
      toast.success('Product Added to Wishlist', {
        duration: 1000,
      });
    }
  }

  async function addProduct(productId) {
    let respnose = await addToCart(productId);
    if (respnose?.data.status === 'success') {
      setcartItems(respnose?.data.numOfCartItems);
      toast.success('Product added successfully', {
        duration: 1000,
      });
    }
  }

  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data } = useQuery('featuredProducts', getFeaturedProducts);

  useEffect(() => {
    // Check if data is available before initializing heartColors
    if (data?.data.data) {
      const initialColors = {};
      data.data.data.forEach((product) => {
        initialColors[product.id] = 'black';
      });
      setHeartColors(initialColors);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className='w-100 d-flex justify-content-center align-items-center mt-5 py-5 '>
          <FallingLines
            color='#4fa94d'
            width='100'
            visible={true}
            ariaLabel='falling-lines-loading'
          />
        </div>
      ) : (
        <div className='container my-5'>
          <div className='row mt-5'>
            {data?.data.data.map((product) => (
              <div key={product.id} className='col-lg-3 col-md-4 col-sm-6'>
                <div className='product mt-3 p-3 mx-auto cursor-pointer'>
                  <Link to={`/ProductsDetails/${product.id}`}>
                    <img className='w-100' src={product.imageCover} alt='' />
                    <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                    <h3 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                    <div className='d-flex justify-content-between mt-3'>
                      <span>{product.price} EGP</span>
                      <span>
                        <i className='fas fa-star rating-color'></i> {product.ratingsAverage}
                      </span>
                    </div>
                    <div className='my-2 '>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          addWish(product.id);
                        }}
                        className=''
                      >
                        {/* Use heartColors state to set the color */}
                        <i
                          onClick={() => {
                            toggleColor(product.id);
                          }}
                          className='fa-solid fa-2x fa-heart'
                          style={{ color: heartColors[product.id] || 'black' }}
                        ></i>
                      </div>
                    </div>
                  </Link>
                  <button onClick={() => addProduct(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
