import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HowToBuy = () => {
  const navigate = useNavigate();

  return (
    <HowToBuyWrapper>
      <div className="container">
        <h1 className="title">How to Buy</h1>
        <p className="subtitle">
          Follow these simple steps to get the best deals and customized products tailored just for you!
        </p>

        <div className="steps">
          <div className="step">
            {/* <span className="step-number">1</span> */}
            <p className="step-text">
              **Browse** our wide range of products and find what suits your needs.
            </p>
          </div>
          <div className="step">
            {/* <span className="step-number">2</span> */}
            <p className="step-text">
              **Add to Cart** the items you love and want to purchase.
            </p>
          </div>
          <div className="step">
            {/* <span className="step-number">3</span> */}
            <p className="step-text">
              **Contact Us** directly on WhatsApp for the best price and tailored customization options.
            </p>
          </div>
          <div className="step">
            {/* <span className="step-number">4</span> */}
            <p className="step-text">
              **Finalize Your Order** with our team for a seamless purchase experience.
            </p>
          </div>
        </div>

        <p className="contact-note">
          Reach out to us via WhatsApp for any queries or personalized solutions. We're here to help!
        </p>

        <div className="button-group">
          <button className="btn" onClick={() => navigate("/")}>
            Go to Home
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </HowToBuyWrapper>
  );
};

export default HowToBuy;

const HowToBuyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background: linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%);
  font-family: Arial, sans-serif;
  color: #333;

  .container {
    text-align: center;
    background: #fff;
    padding: 40px 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 90%;
  }

  .title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #555;
    margin-bottom: 30px;
  }

  .steps {
    margin-bottom: 30px;
  }

  .step {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin: 10px 0;
  }

  .step-number {
    background: #ff9800;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .step-text {
    font-size: 1.2rem;
    color: #444;
    text-align: left;
  }

  .contact-note {
    font-size: 1.2rem;
    color: #f44336;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #ff9800;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .btn:hover {
    background-color: #e67e22;
  }

  .btn-back {
    background-color: #4caf50;
  }

  .btn-back:hover {
    background-color: #388e3c;
  }
`