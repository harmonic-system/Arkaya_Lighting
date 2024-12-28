import { useState, useEffect } from "react";
import styled from "styled-components";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Display for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <PreloaderWrapper>
          <div id="preloader">
            <h1 className="animated-text">Arkaya Lighting</h1>
            {/* <h1 className="animated-text">आर्कय Lighting</h1> */}
          </div>
        </PreloaderWrapper>
      )}
    </>
  );
};

export default Preloader;

const PreloaderWrapper = styled.section`
  /* Preloader container styles */
  #preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffd600; /* Yellow background */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10; /* Ensure it appears above all content */
  }

  /* Animated Text Styling */
  .animated-text {
    font-size: 5rem; /* Large font size for desktop */
    color: #002147; /* Navy blue for bold contrast */
    font-weight: bold;
    text-transform: uppercase;
    animation: creative-animation 2s infinite; /* Custom animation */
    text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9); /* White glow */
    position: relative;
    text-align: center;
    margin: 0 20px;
  }

  /* Creative Animation Keyframes */
  @keyframes creative-animation {
    0% {
      transform: scale(1) rotate(0deg);
      color: #002147; /* Navy blue */
      text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
    }
    25% {
      transform: scale(1.2) rotate(5deg);
      color: #FF8C00; /* Orange */
      text-shadow: 0px 0px 30px rgba(255, 140, 0, 1);
    }
    50% {
      transform: scale(1.1) rotate(-5deg);
      color: #FFD700; /* Gold */
      text-shadow: 0px 0px 40px rgba(255, 215, 0, 1);
    }
    75% {
      transform: scale(1.3) rotate(10deg);
      color: #FFF200; /* Bright yellow */
      text-shadow: 0px 0px 50px rgba(255, 242, 0, 1);
    }
    100% {
      transform: scale(1) rotate(0deg);
      color: #002147; /* Navy blue */
      text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
    }
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .animated-text {
      font-size: 4rem; /* Adjust font size for smaller screens */
    }
  }

  @media (max-width: 768px) {
    .animated-text {
      font-size: 3rem; /* Adjust font size for tablets */
    }
  }

  @media (max-width: 480px) {
    .animated-text {
      font-size: 2rem; /* Adjust font size for small phones */
    }
  }

  /* Wave-Like Effect */
  .animated-text::before,
  .animated-text::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #fff, transparent);
    animation: wave 2s infinite;
  }

  .animated-text::before {
    top: -10px;
    animation-delay: 0.5s;
  }

  .animated-text::after {
    bottom: -10px;
  }

  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
