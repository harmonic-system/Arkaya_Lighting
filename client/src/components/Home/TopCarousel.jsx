import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useProductContext } from '../../context/product-context';

const TopCarousel = () => {

  const { caraousel } = useProductContext()

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow className="next" />,
    prevArrow: <CustomArrow className="prev" />
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {caraousel.map((item, index) => (
          <Slide key={index}>
            <img src={item?.file?.url} alt={`Slide ${index + 1}`} />
            <Overlay>
              <SlideContent>
                <h5 className="carousel-title">{item?.heading}</h5>
                <p className="carousel-description">{item?.description}</p>
              </SlideContent>
            </Overlay>
          </Slide>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

const CustomArrow = (props) => {
  const { className, onClick } = props;
  return (
    <Arrow className={className} onClick={onClick}>
      {className.includes("next") ? <IoIosArrowForward /> : <IoIosArrowBack />}
    </Arrow>
  );
};

export default TopCarousel;

const CarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  .slick-dots li button:before {
    color: #fff;
    font-size: 8px;
  }

  .slick-dots li.slick-active button:before {
    color: #ff8c00;
    font-size: 8px;
  }

  .slick-dots {
    bottom: 15px;
  }

  .slick-next:before {
    content: '';
  }

  .slick-prev:before {
    content: '';
  }

  .slick-next {
    right: 10px;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next svg, .slick-prev svg {
    opacity: 0.3;
  }
`;

const Slide = styled.div`
  position: relative;
  border-radius: 10px;

  img {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px;
  border-radius: 10px;
`;

const SlideContent = styled.div`
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  width: 60%;

  .carousel-title {
    font-size: 24px;
    margin: 0;
  }

  .carousel-description {
    font-size: 18px;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    .carousel-title {
      font-size: 15px;
    }

    .carousel-description {
      font-size: 16px;
      color: #fff;
    }
  }

  @media (max-width: 525px) {
   .carousel-description {
      display:none;
    }
  }

  @media (max-width: 480px) {
    .carousel-title {
      font-size: 12px;
    }
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background 0.3s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    width: 30px;
    height: 30px;
  }
`;
