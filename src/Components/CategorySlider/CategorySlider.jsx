import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Bars } from 'react-loader-spinner';

export default function CategorySlider() {

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    let { data ,  isLoading } = useQuery("Categories", getAllCategories, {
        cacheTime: 2000
    });

    const [sliderSettings, setSliderSettings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000
    });

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;

            if (windowWidth <= 480) {
                setSliderSettings({
                    ...sliderSettings,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            } else if (windowWidth <= 768) {
                setSliderSettings({
                    ...sliderSettings,
                    slidesToShow: 2,
                    slidesToScroll: 2
                });
            } else {
                setSliderSettings({
                    ...sliderSettings,
                    slidesToShow: 4,
                    slidesToScroll: 1
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="mt-5 d-flex align-items-center justify-content-center">
                    <Bars
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : (
                <div className="px-4 mt-5">
                    <h2 className="text-center text-main my-3 mb-5">Importan  Categories </h2>


                    <Slider {...sliderSettings}>
                        {data?.data.data.map((category, index) => (
                            <div key={index} className='px-3'>
                                <img src={category.image} className="w-100" height="370" alt="" />
                                <h3 className='text-center my-3 text-main'> {category.name}</h3>
                            </div>
                        ))}
                    </Slider>


                    
                </div>
            )}
        </>
    );
}