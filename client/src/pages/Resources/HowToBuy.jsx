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
          Follow these steps to easily purchase your desired products and enjoy our tailored services.
        </p>

        <div className="steps">
          <div className="step">
            <p className="step-text">
              **Select Your Order**: Browse through our wide range of products and choose the ones you want to buy.
            </p>
          </div>
          <div className="step">
            <p className="step-text">
              **Add to Cart**: Add the selected products to your cart for a seamless checkout experience.
            </p>
          </div>
          <div className="step">
            <p className="step-text">
              **Click on Contact Us**: This will take you directly to our WhatsApp chat.
            </p>
          </div>
          <div className="step">
            <p className="step-text">
              **Chat with Our Agents**: Discuss your order for the best price, delivery process, and any customizations.
            </p>
          </div>
          <div className="step">
            <p className="step-text">
              **Customization Based on Your Requirements**: Our experts will customize the products according to your needs, provide the best price, and inform you about the delivery time and process.
            </p>
          </div>
          <div className="step">
            <p className="step-text">
              **Confirm Your Order**: Finalize your order, and our experts will provide the delivery time and details.
            </p>
          </div>
        </div>

        <p className="contact-note">
          We value your trust and are here to make your shopping experience delightful. Feel free to reach out for any assistance!
        </p>

        <p className="love-note">
          Thank you for choosing us. We truly appreciate your support and look forward to serving you with love and care! ❤
        </p>

        <div className="button-group">
          <button className="btn" onClick={() => navigate("/")}>Go to Home</button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Back</button>
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

  .love-note {
    font-size: 1.2rem;
    color: #4caf50;
    font-weight: bold;
    margin-bottom: 30px;
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
`;
