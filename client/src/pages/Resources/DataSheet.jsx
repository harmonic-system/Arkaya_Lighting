import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DataSheet = () => {
  const navigate = useNavigate();

  return (
    <DataSheetWrapper>
      <div className="container">
        <h1 className="title">Product Data Sheets</h1>
        <p className="description">
          Data sheets are comprehensive documents providing detailed
          specifications, features, and technical information about our
          products. They are essential resources for understanding product
          performance, compatibility, and usage guidelines.
        </p>
        <p className="content">
          Whether you're a professional looking for precise technical
          specifications or a customer seeking deeper insights into our
          offerings, the data sheets will serve as a valuable tool. Stay tuned
          as we work hard to bring this feature to you. 🚀
        </p>
        <p className="coming-soon">
          We are currently working on this page to ensure it meets your needs.
          The data sheet library will be available soon!
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
    </DataSheetWrapper>
  );
};

export default DataSheet;

const DataSheetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background: linear-gradient(135deg, #85ffbd 0%, #fffb7d 100%);
  font-family: Arial, sans-serif;
  color: #333;

  .container {
    text-align: center;
    background: #fff;
    padding: 40px 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 600px;
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
