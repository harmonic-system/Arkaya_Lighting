import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCategoryContext } from '../context/category-context';
import { useProductContext } from '../context/product-context';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setThemeCategoryProduct } = useCategoryContext();
  const { themeCategory } = useProductContext()

  // Navigate to Home Page
  const goToHome = () => {
    navigate('/home');
  };

  const handleChange = (event) => {
    setThemeCategoryProduct(event);
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
          {themeCategory.map((themeCategory, index) => (
            <div key={index} className="card">
              <div className="image-container">
                <img src={themeCategory?.themeCategoryFile?.url} alt={themeCategory.title} />
              </div>
              <h3>{themeCategory.title}</h3>
              <p>{themeCategory.des}</p>
              <button className="card-button" onClick={() => handleChange(themeCategory.title)}>
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
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh; 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(135deg, #ffc221 0%, #ff9a3c 100%);
  z-index: 20;
  overflow-y: auto; 
  overflow-x: hidden;

  /* Animation for the whole page */
  animation: fadeInFromCenter 0.6s ease-out;

  @keyframes fadeInFromCenter {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

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
    font-size: 3.5rem;
    color: #fff;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  .heading p {
    font-size: 1.5rem;
    color: #fefefe;
    margin-top: 10px;
    margin-bottom: 50px;
    font-weight: 500;
  }

  /* Home Button */
  .home-button {
    position: absolute;
    top: 60px;
    right: 60px;
    padding: 12px 25px;
    background: linear-gradient(135deg, #007BFF 0%, #00c6ff 100%);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .home-button:hover {
    background: linear-gradient(135deg, #0056b3 0%, #007BFF 100%);
    transform: scale(1.1);
  }

  /* Grid Layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  /* Card Styles */
  .card {
    padding: 20px;
    background: #ffffff;
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
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    transition: transform 0.3s ease;
  }

  .image-container img:hover {
    transform: scale(1.1);
  }

  /* Card Text */
  .card h3 {
    font-size: 1.6rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .card p {
    font-size: 1.3rem;
    color: #555;
    margin-bottom: 15px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  /* Card Button */
  .card-button {
    padding: 10px 20px;
    border: none;
    background: linear-gradient(135deg, #ffc221 0%, #ff9a3c 100%);
    color: #333;
    font-size: 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card-button:hover {
    background: linear-gradient(135deg, #ff9a3c 0%, #ff6f61 100%);
    color: white;
    transform: scale(1.05);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .heading h1 {
      font-size: 2.5rem;
    }

    .heading p {
      font-size: 1.3rem;
    }

    .home-button {
      font-size: 0.9rem;
      padding: 10px 20px;
      top:40px;
      right: 40px;
    }

    .card {
      padding: 15px;
    }

    .image-container {
      height: 150px;
    }

    .card h3 {
      font-size: 1.4rem;
    }

    .card p {
      font-size: 1.2rem;
    }

    .card-button {
      font-size: 0.9rem;
    }
  }
`;


