import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const testimonials = [
  {
    name: "Bayview",
    date: "12/05/2024",
    quote: "The DMX controllers offered unparalleled versatility and control over our stage lighting.",
    image: "./images/clients/bayview.png",
  },
  {
    name: "FTV Club",
    date: "06/03/2024",
    quote: "Impressed by the sleek design and incredible brightness of the LED panels.",
    image: "./images/clients/ftv.png",
  },
  {
    name: "Kode",
    date: "27/04/2024",
    quote: "The Mini LED Moving Lights transformed our event with their stunning effects and compact size.",
    image: "./images/clients/kode.png",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Function to go to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <TestimonialWrapper>
      <div className="container">
        <div className="title">
          <h1>What Our <strong className="black">Clients Say</strong></h1>
          <span>Transforming spaces with exceptional lighting solutions</span>
        </div>
        <div className="carousel-container">
          <button className="carousel-button left" onClick={goToPrevSlide}>
            &#10094;
          </button>

          <div className="carousel-slide">
            <div className="testimonial-card">
              <img className="testimonial-image" src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
              <p className="testimonial-quote">{`"${testimonials[currentIndex].quote}"`}</p>
              <h5 className="testimonial-name">{testimonials[currentIndex].name}</h5>
              <p className="testimonial-designation">{testimonials[currentIndex].date}</p>
            </div>
          </div>

          <button className="carousel-button right" onClick={goToNextSlide}>
            &#10095;
          </button>

          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}>

              </span>
            ))}
          </div>
        </div>
      </div>
    </TestimonialWrapper>
  );
};

export default TestimonialCarousel;


const TestimonialWrapper = styled.section`
background-color: #f9f9f9;
padding: 50px 0;
.carousel-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  width: 100%;
  display: flex;
  justify-content: center;
  transition: transform 0.5s ease-in-out;
}

.testimonial-card {
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.testimonial-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.testimonial-quote {
  font-style: italic;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 15px;
}

.testimonial-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #333;
}

.testimonial-designation {
  font-size: 1rem;
  color: #777;
}

/* Carousel Buttons */
.carousel-button {
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  transform: translateY(-50%);
  font-size: 24px;
}

.carousel-button.left {
  left: 10px;
}

.carousel-button.right {
  right: 10px;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Carousel Indicators */
.carousel-indicators {
position: absolute;
bottom:0;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.carousel-indicator {
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.carousel-indicator.active {
  background-color: #717171;
}

`
