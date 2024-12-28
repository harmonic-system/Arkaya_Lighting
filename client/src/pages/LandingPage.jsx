import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCategoryContext } from '../context/category-context';

const LandingPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useCategoryContext();

  // Navigate to Home Page
  const goToHome = () => {
    navigate('/home');
  };

  const landingmenu = [
    {
      image: "./images/landing/architecture.jpg",
      title: "Architecture",
      description: "Explore our lighting solutions for spaces."
    },
    {
      image: "./images/landing/entertainment.jpg",
      title: "Entertainment",
      description: "Explore our lighting solutions for spaces."
    },
    {
      image: "./images/landing/themenvironment.jpg",
      title: "Theme Environment",
      description: "Explore our lighting solutions for spaces."
    },
    {
      image: "./images/landing/videodisplays.jpg",
      title: "Video Displays",
      description: "Explore our lighting solutions for spaces."
    },
  ];

  const handleChange = (event) => {
    localStorage.setItem('landingmenu', event);
    navigate("/themeproducts");
  };

  return (
    <LandingPageWrapper>
      <div className="container">
        {/* Go to Home Button */}
        <button className="home-button" onClick={goToHome}>
          Go to Home
        </button>

        <div className="heading">
          <h1>Welcome to Arkaya Lighting</h1>
          <p>Innovative & Custom Lighting Solutions for Any Space</p>
        </div>

        {/* Card Container */}
        <div className="grid grid-two-column">
          {landingmenu.map((menu, index) => (
            <div key={index} className="card">
              <div className="image-container">
                <img src={menu.image} alt={menu.title} />
              </div>
              <h3>{menu.title}</h3>
              <p>{menu.description}</p>
              <button className="card-button" onClick={() => handleChange(menu.title)}>
                Check Products
              </button>
            </div>
          ))}
        </div>
      </div>
    </LandingPageWrapper>
  );
};

export default LandingPage;

const LandingPageWrapper = styled.section`
  /* Full-screen gradient background */
  position: fixed; /* Make it overlay everything */
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(135deg, #ffc221 0%, #ff9a3c 100%);
  z-index: 9999; /* Ensure it's on top of everything */
  overflow-y: auto; /* Enable scrolling if content overflows */
  overflow-x: hidden;

  /* Container */
  .container {
    width: 90%;
    max-width: 1200px;
    text-align: center;
    padding: 20px;
    margin-top: 100px;
  }

  /* Heading Styles */
  .heading h1 {
    font-size: 3rem;
    color: #fff;
    font-weight: 700;
  }

  .heading p {
    font-size: 1.2rem;
    color: #fdfdfd;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  /* Home Button */
  .home-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 12px 25px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .home-button:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }

  /* Grid Layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two-column layout for larger screens */
    gap: 20px;
  }

  /* Card Styles */
  .card {
    padding: 20px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }

  /* Image Container */
  .image-container {
    width: 100%;
    height: 200px; /* Fixed height for consistent sizing */
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the card */
    border-radius: 15px;
  }

  /* Card Text */
  .card h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  .card p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
  }

  /* Card Button */
  .card-button {
    padding: 10px 20px;
    border: none;
    background: #ffc221;
    color: #333;
    font-size: 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card-button:hover {
    background: #ff9a3c;
    color: white;
    transform: scale(1.05);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr; /* Single-column layout for small screens */
    }

    .heading h1 {
      font-size: 2.5rem;
    }

    .heading p {
      font-size: 1rem;
    }

    .home-button {
      font-size: 0.9rem;
      padding: 10px 20px;
    }

    .card {
      padding: 15px;
    }

    .image-container {
      height: 150px; /* Smaller height for mobile */
    }
  }
`;



