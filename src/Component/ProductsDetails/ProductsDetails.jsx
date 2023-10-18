import axios from 'axios'
import { useContext } from 'react';
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';

export default function ProductsDetails() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 650,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
    };

    let { addToCart } = useContext(CartContext)

    async function addCart(id) {
        let respnose = await addToCart(id)
        if (respnose.data.status === 'success') {
            toast.success("Product added successfully", {
                duration: 1500
            })
        } else {

        }

    }

    let params = useParams()

    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data } = useQuery('productDeat', () => getProductDetails(params.id))

    return <>
        {data?.data.data ?
            <div className="row py-5 align-items-center">
                <Helmet>
                    <title>{data?.data.data.title}</title>
                </Helmet>
                <div className="col-md-4 py-5">
                    <Slider {...settings}>
                        <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
                        <img className='w-100' src={data?.data.data.images[0]} alt={data?.data.data.title} />
                        <img className='w-100' src={data?.data.data.images[2]} alt={data?.data.data.title} />
                        {data?.data.data.images[3] ? <img className='w-100' src={data?.data.data.images[3]} alt={data?.data.data.title} /> : ''}
                        {data?.data.data.images[4] ? <img className='w-100' src={data?.data.data.images[4]} alt={data?.data.data.title} /> : ''}
                        {data?.data.data.images[5] ? <img className='w-100' src={data?.data.data.images[5]} alt={data?.data.data.title} /> : ''}
                    </Slider>
                    {/* <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} /> */}
                </div>
                <div className="col-md-8">

                    <h2 className='h5'>{data?.data.data.title}</h2>
                    <p>{data?.data.data.description}</p>
                    <h6 className='text-main'>{data?.data.data.category.name}</h6>
                    <h6 className='text-main'>Price : {data?.data.data.price} EGP</h6>

                    <div className='d-flex justify-content-between'>
                        <span>RatingQuantity : {data?.data.data.ratingsQuantity}</span>
                        <span><i className='fas fa-star solid rating-color'></i>{data?.data.data.ratingsAverage}</span>
                    </div>
                    <button onClick={() => addCart(data?.data.data.id)} className='btn bg-main text-white w-100 mt-3'>Add ddTo Cart</button>
                </div>
            </div> : ''}


    </>
}