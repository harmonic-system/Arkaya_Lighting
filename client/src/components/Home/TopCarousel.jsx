import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import { useProductContext } from '../../context/product-context';

const TopCarousel = () => {
  const { caraousel } = useProductContext()

  return (
    <>
      <Wrapper>
        <div style={{ position: 'relative' }}>
          <Carousel
            showArrows={true}
            showStatus={true}
            showIndicators={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}>
            {
              caraousel.map((item) => {
                return <div style={{ position: 'relative' }} key={item._id}>
                  <img src={item.file.url} alt="Slide 1" />
                  <div style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', color: 'black', textAlign: "left", width: "60%" }}>
                    <h5 className="carousel-title">{item.heading}</h5>
                    <p className="carousel-description">{item.description}</p>
                  </div>
                </div>
              })
            }
          </Carousel>
        </div>
      </Wrapper>
    </>
  );
};

export default TopCarousel;

const Wrapper = styled.div`
  .thumbs.animated {
   display: none !important;
  }

  .carousel-title {
  font-size: 50px;
  font-family: Poppins, sans-serif;
}

.carousel-description {
  font-size: 18px;
  font-family: Poppins, sans-serif;
}

/* Responsive styles */
@media (max-width: 768px) {
  .carousel-title {
    font-size: 40px; 
  }

  .carousel-description {
    font-size: 16px; 
  }
}

@media (max-width: 480px) {
  .carousel-title {
    font-size: 25px; 
  }

  .carousel-description {
    font-size: 14px; 
  }
}

@media (max-width: 575px) {
p {
    font-size: 17px;
    padding: 7px 0px 20px 0px;
    display: none;
    }
}
`
