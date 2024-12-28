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
          {/* Left button */}
          <button className="carousel-button left" onClick={goToPrevSlide}>
            &#10094;
          </button>

          <div className="carousel-slide">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <img className="testimonial-image" src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                <div className="testimonial-text">
                  <p className="testimonial-quote">{`"${testimonials[currentIndex].quote}"`}</p>
                  <h5 className="testimonial-name">{testimonials[currentIndex].name}</h5>
                  <p className="testimonial-designation">{testimonials[currentIndex].date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right button */}
          <button className="carousel-button right" onClick={goToNextSlide}>
            &#10095;
          </button>

          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </TestimonialWrapper>
  );
};

export default TestimonialCarousel;

const TestimonialWrapper = styled.section`
  background-color: #f3f4f6;
  padding: 80px 0;
  .container {
    width: 100%;
    margin: 0 auto;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    // padding: 40px 0;
    max-width: 1200px;
  }

  .carousel-slide {
    width: 100%;
    display: flex;
    justify-content: center;
    transition: transform 0.5s ease-in-out;
  }

  /* Ensure the testimonial card is always the same size */
  .testimonial-card {
    width: 100%;
    height: 300px; /* Fixed height for consistent sizing */
    max-width: 800px; /* Set a max width */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: linear-gradient(145deg, #ffffff, #f4f6f9);
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }

  .testimonial-card:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .testimonial-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .testimonial-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 30px;
    border: 4px solid #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .testimonial-text {
    flex: 1;
    max-width: 500px;
  }

  .testimonial-quote {
    font-style: italic;
    font-size: 1.3rem;
    color: #444;
    margin-bottom: 25px;
    line-height: 1.6;
    font-family: 'Georgia', serif;
  }

  .testimonial-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
    font-family: 'Roboto', sans-serif;
  }

  .testimonial-designation {
    font-size: 1.1rem;
    color: #777;
    font-family: 'Roboto', sans-serif;
  }

  /* Carousel Buttons (positioned outside the card) */
  .carousel-button {
    position: absolute;
    top: 50%;
    background: rgba(0, 0, 0, 0.1);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    transform: translateY(-50%);
    font-size: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;
  }

  .carousel-button.left {
    left: 10px;
  }

  .carousel-button.right {
    right: 10px;
  }

  .carousel-button:hover {
    background-color: rgba(0, 0, 0, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  /* Carousel Indicators */
  .carousel-indicators {
    position: absolute;
    bottom: 15px;
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }

  .carousel-indicator {
    height: 10px;
    width: 10px;
    margin: 0 7px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .carousel-indicator.active {
    background-color: #717171;
  }

  /* Media Queries */
  @media (max-width: 1024px) {
    .testimonial-card {
      height:200px;
      padding: 20px;
    }

    .testimonial-quote {
      font-size: 1.2rem;
    }

    .testimonial-name {
      font-size: 1.3rem;
    }

    .testimonial-designation {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .testimonial-card {
      padding: 15px;
    }

    .testimonial-image {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }

    .testimonial-quote {
      font-size: 1rem;
    }

    .testimonial-name {
      font-size: 1.2rem;
    }

    .testimonial-designation {
      font-size: 0.9rem;
    }

    .carousel-button {
      font-size: 15px;
    }

    .carousel-indicator {
      height: 6px;
      width: 6px;
    }
  }

  @media (max-width: 480px) {
    .testimonial-card {
      flex-direction: column;
      text-align: center;
    }

    .testimonial-image {
      margin-right: 0;
      margin-bottom: 20px;
      width: 80px;
      height: 80px;
    }

    .testimonial-text {
      text-align: center;
    }

    .carousel-button {
      font-size: 10px;
    }
  }
`;




