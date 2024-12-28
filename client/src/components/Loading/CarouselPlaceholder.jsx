import React from "react";
import styled from "styled-components";

const CarouselPlaceholder = () => {
  return (
    <PlaceholderWrapper>
      <PlaceholderSlide />
      <PlaceholderSlide />
      <PlaceholderSlide />
    </PlaceholderWrapper>
  );
};

export default CarouselPlaceholder;

// Styled Components
const PlaceholderWrapper = styled.div`
  display: flex;
  overflow: hidden;
  gap: 1rem;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

const PlaceholderSlide = styled.div`
  width: 30%;
  height: 100%;
  background-color: #e9ecef;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  /* Glow animation */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(300%);
    }
  }
`;


// import React, { useState, useEffect } from "react";
// import CarouselPlaceholder from "./CarouselPlaceholder"; // Import the placeholder component
// import Carousel from "./Carousel"; // Assume this is your real carousel component

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a delay for loading
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000); // Adjust delay as needed

//     return () => clearTimeout(timer); // Cleanup
//   }, []);

//   return (
//     <div>
//       {isLoading ? <CarouselPlaceholder /> : <Carousel />}
//     </div>
//   );
// };

// export default App;
