import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SolutionSupport = () => {
  const navigate = useNavigate();

  return (
    <SolutionSupportWrapper>
      <div className="container">
        <h1 className="title">Solution Support</h1>
        <p className="description">
          Welcome to the Solution Support page! Here, you'll find resources and
          guidance to optimize the performance of our products. Our dedicated
          solution support includes software recommendations, configuration
          guides, troubleshooting tips, and best practices to get the most out
          of your equipment.
        </p>
        <p className="content">
          Whether you're setting up new hardware, configuring advanced
          software, or ensuring seamless integration with other systems, our
          support materials will be your trusted companion. We'll also provide
          insights into additional resources you might need to maximize
          efficiency and reliability.
        </p>
        <p className="coming-soon">
          We are actively developing this page to bring you the best solutions
          and resources. Stay tuned for updates!
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
    </SolutionSupportWrapper>
  );
};

export default SolutionSupport;

const SolutionSupportWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background: linear-gradient(135deg, #70e1f5 0%, #ffd194 100%);
  font-family: Arial, sans-serif;
  color: #333;

  .container {
    text-align: center;
    background: #fff;
    padding: 40px 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 650px;
    width: 90%;
  }

  .title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .description {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .content {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .coming-soon {
    font-size: 1.2rem;
    color: #e74c3c;
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
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .btn:hover {
    background-color: #2980b9;
  }

  .btn-back {
    background-color: #27ae60;
  }

  .btn-back:hover {
    background-color: #2ecc71;
  }
`;
