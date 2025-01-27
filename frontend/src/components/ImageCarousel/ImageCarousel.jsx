import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src="frontend\src\assets\room-no-1.png"
          alt="Slide 1"
          className="w-full h-auto"
        />
      </div>
      <div>
        <img
          src=""
          alt="Slide 2"
          className="w-full h-auto"
        />
      </div>
      <div>
        <img
          src=""
          alt="Slide 3"
          className="w-full h-auto"
        />
      </div>
    </Slider>
  );
};

export default ImageCarousel;
