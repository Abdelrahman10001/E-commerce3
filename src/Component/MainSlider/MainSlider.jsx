import React from 'react'
import Slider from "react-slick";
import slide1 from '../../Assets/imgs/44.jpg'
import slide22 from '../../Assets/imgs/55.jpg'

import slide2 from '../../Assets/imgs/11.jpg'
import slide3 from '../../Assets/imgs/22.jpg'
import slide4 from '../../Assets/imgs/33.jpg'


export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        
    };

    return <>
        <div className="row justify-content-center mt-5 gx-0">
            <div className="col-md-3">
                <Slider {...settings}>
                    
                    <img className='w-100' src={slide2} alt="" />
                    <img className='w-100' src={slide3} alt="" />
                    <img className='w-100' src={slide4} alt="" />

                </Slider>
            </div>
            <div className="col-md-3">
                <div className="row">
                    <div className="col-md-6"></div>
                </div>
                <img  className='w-100' src={slide1} alt="" />
                <img  className='w-100' src={slide22} alt="" />
            </div>
        </div>
    </>
}
