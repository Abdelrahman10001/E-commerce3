import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function CategorySlider() {

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
    };

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let { data } = useQuery('categorySlider', getCategories)

    return <>


        <div className="my-4">
            {data?.data.data ? <Slider {...settings}>
                {data?.data.data.map((categorie) => <img height={250} key={categorie._id} src={categorie.image} alt='nameofcat' />

                )}
            </Slider> : ''}

        </div>
    </>
}
