import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import s1 from "../../images/slide1.png";
import s2 from "../../images/slide2.png";
import s3 from "../../images/slide3.png";
import s4 from "../../images/slide4.png";
import s5 from "../../images/slide5.png";
import s6 from "../../images/slide6.png";
import s7 from "../../images/slide7.png";

export default function HomeSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
    <div className="pt-4"></div>
      <div className="px-4 mt-5">
        <Slider {...settings}>
          <div>
            <img src={s1} className="w-100" alt="" />
          </div>

          <div>
            <img src={s2} className="w-100" alt="" />
          </div>

          <div>
            <img src={s3} className="w-100" alt="" />
          </div>

          <div>
            <img src={s4} className="w-100" alt="" />
          </div>

          <div>
            <img src={s5} className="w-100" alt="" />
          </div>

          <div>
            <img src={s6} className="w-100" alt="" />
          </div>

          <div>
            <img src={s7} className="w-100" alt="" />
          </div>
        </Slider>
      </div>
    </>
  );
}
